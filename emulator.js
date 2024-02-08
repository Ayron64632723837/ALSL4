
ram = []
pregs = Array(32).fill(0)
stack = []
flags = Array(32).fill(0)
funcstack = []
sp = -1
fsp = -1

pc = 0

DL = 0xff
AL = 0xff

DS = 8

shifts = [0, 0, 0]

isRunning = false
interval = null

color = {
    r: {
        shift: 6,
        bits: 2,
        limit: 3
    },
    g: {
        shift: 4,
        bits: 2,
        limit: 3
    },
    b: {
        shift: 2,
        bits: 2,
        limit: 3
    },
    a: {
        shift: 0,
        bits: 2,
        limit: 3
    }
}

function getHexRGBA(c, raw=false){
    let r = color.r.shift < 0 ? 255 : ((c >> color.r.shift) & color.r.limit) * Math.round(255 / color.r.limit)
    let g = color.g.shift < 0 ? 255 : ((c >> color.g.shift) & color.g.limit) * Math.round(255 / color.g.limit)
    let b = color.b.shift < 0 ? 255 : ((c >> color.b.shift) & color.b.limit) * Math.round(255 / color.b.limit)
    let a = color.a.shift < 0 ? 255 : ((c >> color.a.shift) & color.a.limit) * Math.round(255 / color.a.limit)

    if(raw){
        return ((r << 24) + (g << 16) + (b << 8) + a ) >>> 0
    }
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`
}

function getRGBAHex(r, g, b, a){
    let rb = (Math.round(r / Math.round(255 / color.r.limit)) & color.r.limit) << color.r.shift
    let gb = (Math.round(g / Math.round(255 / color.g.limit)) & color.g.limit) << color.g.shift
    let bb = (Math.round(b / Math.round(255 / color.b.limit)) & color.b.limit) << color.b.shift
    let ab = (Math.round(a / Math.round(255 / color.a.limit)) & color.a.limit) << color.a.shift
    return rb | gb | bb | ab
}

class Screen{
    constructor(width, height, wchars, hchars, node){

        this.width = width
        this.height = height
        this.wchars = wchars
        this.hchars = hchars
        let nodeid = document.getElementById(node)
        this.canvas = nodeid.getContext('2d')

        nodeid.width = width
        nodeid.height = height
        nodeid.imageSmoothingEnabled = false

        this.canvas.imageSmoothingEnabled = false
    }
    
    load_image(path = "./assets/default_font.png"){
        this.img = new Image()
        //this.img.setAttribute('crossOrigin', '')
        /*this.img.onload = () => {
            this.fontcanvas = document.createElement('canvas')
            this.fontcanvas.getContext('2d').drawImage(this.img, 0, 0)
        }*/

        this.img.setAttribute('crossOrigin', 'Anonymous')
        this.img.onload = () => {
            let fontcanvas = document.createElement('canvas')

            fontcanvas.width = this.img.width
            fontcanvas.height = this.img.height
            let fontctx = fontcanvas.getContext('2d')
            fontctx.drawImage(this.img, 0, 0)
    
            this.imgdata = fontctx.getImageData(0, 0, this.img.width, this.img.height).data            
            
            let tcanvas = document.createElement('canvas')
            tcanvas.width = this.img.width / 16
            tcanvas.height = this.img.height / 16
            this.tctx = tcanvas.getContext('2d')
        }
        this.img.src = path
    }

    async character(x, y, char, color=0xffffffff, bgcolor=0x000000ff){

        let charwidth = this.width / this.wchars
        let charheight = this.height / this.hchars

        let clr = [(color & 0xff000000) >>> 24, (color & 0xff0000) >>> 16, (color & 0xff00) >>> 8, color & 0xff >>> 0]
        //let bgc = [(bgcolor & 0xff000000) >> 24, (bgcolor & 0xff00) >> 16, (bgcolor & 0xff0000) >> 8, bgcolor & 0xff]

        let charnum
        if(typeof(char) == String){
            charnum = char.charCodeAt(0) % 256
        }else {
            charnum = char
        }

        let imgX = (charnum % 16) * 8
        let imgY = ((charnum - (charnum % 16)) / 16) * 8        
        
        this.canvas.fillStyle = bgcolor
        this.canvas.fillRect(x * charwidth, y * charheight, charwidth, charheight)
        if(color == 0xffffffff | color == "#ffffffff"){
            this.canvas.fillStyle=color
            this.canvas.drawImage(this.img, imgX, imgY, this.img.width / 16, this.img.height / 16, x*charwidth, y*charheight, charwidth, charheight)
        }else{
            let rawdata = new Array()
            let c = 4*(imgX + imgY*this.img.width)
            for(let i = 0; i < this.img.width / 16; i++){
                for(let j = 0; j < this.img.height / 16; j++){
                    let cp = c + (j + i*this.img.width)*4
                    if(this.imgdata[cp + 3] == 0){
                        rawdata.push(0,0,0,0)
                        continue
                    }
                    
                    rawdata.push(this.imgdata[cp] & clr[0])
                    rawdata.push(this.imgdata[cp + 1] & clr[1])
                    rawdata.push(this.imgdata[cp + 2] & clr[2])
                    rawdata.push(this.imgdata[cp + 3] & clr[3])
                }
            }
            let imgdatanew = new ImageData(new Uint8ClampedArray(rawdata), this.img.width / 16, this.img.height / 16)
            this.tctx.putImageData(imgdatanew, 0, 0)

            this.canvas.drawImage(this.tctx.canvas, x * charwidth, y * charheight, charwidth, charheight)
        }

    }

    async dot(x, y, color='white', bgcolor='transparent'){
        this.canvas.fillStyle = color
        this.canvas.fillRect(x, y, 1, 1)
    }

    async plot(x, y, char, color="white", bgcolor="transparent"){

        let clr = [(color & 0xff000000) >>> 24, (color & 0xff0000) >>> 16, (color & 0xff00) >>> 8, color & 0xff >>> 0]

        let charnum
        if(typeof(char) == String){
            charnum = char.charCodeAt(0) % 256
        }else {
            charnum = char
        }
        let charwidth = this.width / this.wchars
        let charheight = this.height / this.hchars

        if(charnum == 0){
            this.canvas.clearRect(x, y, charwidth, charheight)
            return
        }

        let imgX = (charnum % 16) * 8
        let imgY = ((charnum - (charnum % 16)) / 16) * 8
        
        this.canvas.fillStyle = bgcolor
        this.canvas.fillRect(x, y, charwidth, charheight)
        if(color == 0xffffffff | color == "#ffffffff"){
            this.canvas.fillStyle=color
            this.canvas.drawImage(this.img, imgX, imgY, this.img.width / 16, this.img.height / 16, x*charwidth, y*charheight, charwidth, charheight)
        }else{
            let rawdata = new Array()
            let c = 4*(imgX + imgY*this.img.width)
            for(let i = 0; i < this.img.width / 16; i++){
                for(let j = 0; j < this.img.height / 16; j++){
                    let cp = c + (j + i*this.img.width)*4
                    if(this.imgdata[cp + 3] == 0){
                        rawdata.push(0,0,0,0)
                        continue
                    }
                    
                    rawdata.push(this.imgdata[cp] & clr[0])
                    rawdata.push(this.imgdata[cp + 1] & clr[1])
                    rawdata.push(this.imgdata[cp + 2] & clr[2])
                    rawdata.push(this.imgdata[cp + 3] & clr[3])
                }
            }
            let imgdatanew = new ImageData(new Uint8ClampedArray(rawdata), this.img.width / 16, this.img.height / 16)
            this.tctx.putImageData(imgdatanew, 0, 0)

            this.canvas.drawImage(this.tctx.canvas, x, y, charwidth, charheight)
        }
    }

    async clear(){
        this.canvas.clearRect(0, 0, this.width, this.height)
    }
}


function create(databus, addressbus, code, screenwidth, screenheight, screenwidthchars, screenheightchars, conmem){
    ram = Array(2**addressbus).fill(0)
    let l = Math.min(2**addressbus, conmem.length)
    for(let i = 0; i < l; i++){
        ram[i] = conmem[i]
    }
    stack = Array(2**addressbus).fill(0)
    funcstack = Array(2**addressbus).fill(0)
    pregs = Array(32).fill(0)
    flags = Array(32).fill(0)

    pregs[PREGS.$FCOLOR] = getRGBAHex(255, 255, 255, 255)
    pregs[PREGS.$BGCOLOR] = getRGBAHex(0, 0, 0, 255)

    monitor = new Screen(screenwidth, screenheight,
        screenwidthchars, screenheightchars, "screen")
    monitor.load_image()

    DL = 2**databus - 1
    AL = 2**addressbus - 1
    DS = databus

    pc = 0
    sp = -1
    fsp = -1
}

function update_flags(value){
    flags[FLAG.CARRY] = value < 0 
    flags[FLAG.HALFCARRY] = (value & (2**DS << (DS/2)) ) == 0 
    flags[FLAG.PARITY] = value & 1 
    flags[FLAG.ZERO] = value == 0 
    flags[FLAG.SIGN] = (value & (1 << (DS-1))) > 0 
    flags[FLAG.OVERFLOW] = value >= 2**DS /*
    console.log("FLAGS FOR", value, "STEP", this.pc)
    console.log(flags[0], "carry")
    console.log(flags[1], "halfcarry")
    console.log(flags[2], "parity")
    console.log(flags[3], "sign")
    console.log(flags[4], "zero")
    console.log(flags[5], "reserved")
    console.log(flags[6], "overflow")*/
}

function set(args, index, value, doUpdateFlags){
    arg = args[index]
    type = args[0]
    address = args[1] + shifts[index]
    switch(type){
        case TYPE.CONST:
            ram[ram[address & AL]] = value & DL
            break;
        case TYPE.REG:
            ram[address & AL] = value & DL
            break;
        case TYPE.LINK:
            ram[ram[address & AL]] = value & DL
            break;
        case TYPE.PREG:
            //if(address == PREGS.$KB) console.log(value)
            pregs[address] = value & DL
            
            break;
        case TYPE.FLAG:
            flags[address & 31] = value
            break;
        case TYPE.PLINK:
            ram[pregs[address]] = value & DL
            break;
    }

    if(doUpdateFlags) { update_flags(value) }

    return true;
}

function get(args, index){
    arg = args[index]
    type = arg[0]
    address = arg[1] + shifts[index]
    switch(type){
        case TYPE.REG: return ram[address & AL]
        case TYPE.CONST: return address
        case TYPE.PLINK: return ram[pregs[address] & AL]
        case TYPE.LINK: return ram[ram[address & AL]]
        case TYPE.FLAG: return flags[address]
        case TYPE.PREG: return pregs[address]
    }
}

function perform(){
    if(code.lenght < 1) return -1
    //if(pc < 0) return -1
    if(pc >= code.length) return -1

    pregs[PREGS.$RANDOM] = Math.floor(Math.random() * DL)

    if(pc < code.length){
        args = code[pc][1]
    }else{
        args = [0, [
            [TYPE.CONST, 0],
            [TYPE.CONST, 0],
            [TYPE.CONST, 0]
        ]]
    }
/*
    switch(code[pc][0]){
        case OP.ADD:
            console.log(args[2][0], args[2][1], args[0], args[1], get(...args[0]) + get(...args[1]),)
            set(args[2][0], args[2][1], get(...args[0]) + get(...args[1]), true); break;

    }
*/

    switch(code[pc][0]){
        case OP.ADD: set(args, 2, get(args, 0) + get(args, 1), true); break;
        case OP.SUB: set(args, 2, get(args, 0) - get(args, 1), true); break;
        case OP.MLL: set(args, 2, get(args, 0) * get(args, 1), true); break;
        case OP.MUL:
            set(args, 2, get(args, 0) * get(args, 1), true)
            set(args[2][0], args[2][1] + 1, get(args, 0) * get(args, 1) >>> DS, false); break;
        case OP.DVV: set(args, 2, Math.floor(get(args, 0) / get(args, 1)), true); break;
        case OP.MOD: set(args, 2, get(args, 0) % get(args, 1), true); break;

        case OP.AND: set(args, 2, get(args, 0) & get(args, 1), true); break;
        case OP.NND: set(args, 2, ~(get(args, 0) & get(args, 1)), true); break;
        case OP.BOR: set(args, 2, get(args, 0) | get(args, 1), true); break;
        case OP.NOR: set(args, 2, ~(get(args, 0) | get(args, 1)), true); break;
        case OP.XOR: set(args, 2, get(args, 0) ^ get(args, 1), true); break;
        case OP.NXR: set(args, 2, ~(get(args, 0) ^ get(args, 1)), true); break;
        case OP.INV: set(args, 1, ~get(args, 0), true); break;

        case OP.SET: set(args, 0, get(args, 1)); break;
        case OP.MOV: set(args, 0, get(args, 1)); set(args[1][0], args[1][1], 0); break;
        case OP.CPY: set(args, 0, get(args, 1)); break;

        case OP.JMP: pc = get(args, 0) - 1; break;
        case OP.JIE: if(get(args, 0) == get(args, 1)) pc = get(args, 2) - 1; break;
        case OP.JNE: if(get(args, 0) != get(args, 1)) pc = get(args, 2) - 1; break;
        case OP.JEZ: if(get(args, 0) == 0) pc = get(args, 1) - 1; break;
        case OP.JNZ: if(get(args, 0) != 0) pc = get(args, 1) - 1; break;
        case OP.JWR: fsp ++; funcstack[fsp & AL] = (pc + 1) & DL; pc = get(args, 0) - 1; break;
        case OP.RTN: pc = (funcstack[fsp & AL] - 1) & DL; fsp --; break;
        
        case OP.JIG: if(get(args, 0) > get(args, 1)) pc = get(args, 2) - 1; break;
        case OP.JIS: if(get(args, 0) < get(args, 1)) pc = get(args, 2) - 1; break;
        case OP.JNG: if(get(args, 0) <= get(args, 1)) pc = get(args, 2) - 1; break;
        case OP.JNS: if(get(args, 0) >= get(args, 1)) pc = get(args, 2) - 1; break;
        
        case OP.EXT: clearInterval(interval); pc = 0; isRunning = false; break;
        case OP.PRINT: console.log(">>>", get(args, 0), get(args, 1), get(args, 2)); break;
        
        case OP.PNT:
            monitor.character(get(args, 0), get(args, 1), get(args, 2),
            getHexRGBA(pregs[PREGS.$FCOLOR], true), getHexRGBA(pregs[PREGS.$BGCOLOR], false)); break;
        case OP.PLT:
            monitor.dot(get(args, 0), get(args, 1), getHexRGBA(get(args, 2))); break;
        case OP.PTL: monitor.plot(get(args, 0), get(args, 1), get(args, 2),
        getHexRGBA(pregs[PREGS.$FCOLOR], true), getHexRGBA(pregs[PREGS.$BGCOLOR], false)); break;
        
        case OP.RSH: set(args, 2, get(args, 0) >> get(args, 1), true); break;
        case OP.LSH: set(args, 2, get(args, 0) << get(args, 1), true); break;
        
        case OP.LNP: break;
        case OP.MNP: update_flags(0); break;

        case OP.OSH: shifts = [0,0,0]; shifts = [get(args, 0), get(args, 1), get(args, 2)]; break;
    }
    
    if((code[pc][0] != OP.OSH)&(code[pc][0] != OP.LNP)&(code[pc][0] != OP.PRINT)) shifts = [0, 0, 0]
    
    pc++

    return
}
