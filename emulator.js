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

isRunning = false
interval = null


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

        this.img = new Image
        this.img.src = './assets/default_font.png'

    }

    async character(x, y, char, color='white', bgcolor='black'){
        
        //console.error(x, y, char, pc)

        let charwidth = this.width / this.wchars
        let charheight = this.height / this.hchars

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
        this.canvas.fillStyle=color
        this.canvas.drawImage(this.img, imgX, imgY, this.img.width / 16, this.img.height / 16, x*charwidth, y*charheight, charwidth, charheight)
    }

    async dot(x, y, color='white'){
        //console.log(x, y)
        this.canvas.fillStyle = color
        this.canvas.fillRect(x, y, 1, 1)
    }

    async plot(x, y, char, color="white", bgcolor="transparent"){

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
        this.canvas.fillRect(x * charwidth, y * charheight, charwidth, charheight)
        this.canvas.fillStyle=color
        this.canvas.drawImage(this.img, imgX, imgY, this.img.width / 16, this.img.height / 16, x, y, charwidth, charheight)
    }

    async clear(){
        this.canvas.clearRect(0, 0, this.width, this.height)
    }
}


function create(databus, addressbus, code, screenwidth, screenheight, screenwidthchars, screenheightchars){
    ram = Array(2**addressbus).fill(0)
    stack = Array(2**addressbus).fill(0)
    funcstack = Array(2**addressbus).fill(0)
    pregs = Array(32).fill(0)
    flags = Array(32).fill(0)


    monitor = new Screen(screenwidth, screenheight,
        screenwidthchars, screenheightchars, "screen")

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

function set(type, address, value, doUpdateFlags){
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

function get(type, address){
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
        case OP.ADD: set(args[2][0], args[2][1], get(...args[0]) + get(...args[1]), true); break;
        case OP.SUB: set(args[2][0], args[2][1], get(...args[0]) - get(...args[1]), true); break;
        case OP.MLL: set(args[2][0], args[2][1], get(...args[0]) * get(...args[1]), true); break;
        case OP.MUL:
            set(args[2][0], args[2][1], get(...args[0]) * get(...args[1]), true)
            set(args[2][0], args[2][1] + 1, get(...args[0]) * get(...args[1]) >>> DS, false); break;
        case OP.DVV: set(args[2][0], args[2][1], Math.floor(get(...args[0]) / get(...args[1])), true); break;
        case OP.MOD: set(args[2][0], args[2][1], get(...args[0]) % get(...args[1]), true); break;

        case OP.AND: set(args[2][0], args[2][1], get(...args[0]) & get(...args[1]), true); break;
        case OP.NND: set(args[2][0], args[2][1], ~(get(...args[0]) & get(...args[1])), true); break;
        case OP.BOR: set(args[2][0], args[2][1], get(...args[0]) | get(...args[1]), true); break;
        case OP.NOR: set(args[2][0], args[2][1], ~(get(...args[0]) | get(...args[1])), true); break;
        case OP.XOR: set(args[2][0], args[2][1], get(...args[0]) ^ get(...args[1]), true); break;
        case OP.NXR: set(args[2][0], args[2][1], ~(get(...args[0]) ^ get(...args[1])), true); break;
        case OP.INV: set(args[1][0], args[1][1], ~get(...args[0]), true); break;

        case OP.SET: set(args[0][0], args[0][1], get(...args[1])); break;
        case OP.MOV: set(args[0][0], args[0][1], get(...args[1])); set(args[1][0], args[1][1], 0); break;
        case OP.CPY: set(args[0][0], args[0][1], get(...args[1])); break;

        case OP.JMP: pc = get(...args[0]) - 1; break;
        case OP.JIE: if(get(...args[0]) == get(...args[1])) pc = get(...args[2]) - 1; break;
        case OP.JNE: if(get(...args[0]) != get(...args[1])) pc = get(...args[2]) - 1; break;
        case OP.JEZ: if(get(...args[0]) == 0) pc = get(...args[1]) - 1; break;
        case OP.JNZ: if(get(...args[0]) != 0) pc = get(...args[1]) - 1; break;
        case OP.JWR: fsp ++; funcstack[fsp & AL] = (pc + 1) & DL; pc = get(...args[0]) - 1; break;
        case OP.RTN: pc = (funcstack[fsp & AL] - 1) & DL; fsp --; break;
        
        case OP.JIG: if(get(...args[0]) > get(...args[1])) pc = get(...args[2]) - 1; break;
        case OP.JIS: if(get(...args[0]) < get(...args[1])) pc = get(...args[2]) - 1; break;
        case OP.JNG: if(get(...args[0]) <= get(...args[1])) pc = get(...args[2]) - 1; break;
        case OP.JNS: if(get(...args[0]) >= get(...args[1])) pc = get(...args[2]) - 1; break;
        
        case OP.EXT: pc = -1; break;
        case OP.PRINT: console.log(">>>", get(...args[0]), get(...args[1]), get(...args[2])); break;
        
        case OP.PNT: monitor.character(get(...args[0]), get(...args[1]), get(...args[2])); break;
        case OP.PLT:
            let c = get(...args[2])
            monitor.dot(get(...args[0]), get(...args[1]), "#" +
            (((
                ( ( ((c & 0b11000000) >>> 6) * 85 ) <<24)
                |( ( ((c & 0b00110000) >>> 4) * 85 ) <<16)
                |( ( ((c & 0b00001100) >> 2) * 85 ) <<8)
                |( ( (c & 0b00000011) * 85 ) )
            ) & 0x00000000FFFFFFFF)>>>0).toString(16).padStart(8, '0')); break;
        case OP.PTL: monitor.plot(get(...args[0]), get(...args[1]), get(...args[2])); break;
        
        case OP.RSH: set(args[2][0], args[2][1], get(...args[0]) >> get(...args[1]), true); break;
        case OP.LSH: set(args[2][0], args[2][1], get(...args[0]) << get(...args[1]), true); break;
        
        case OP.LNP: break;
        case OP.MNP: update_flags(0); break;
    }

    pc++

    return
}
