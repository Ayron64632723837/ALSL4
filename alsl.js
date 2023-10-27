/*
class ArgumentsCountError extends Error{
    constructor(message){
        super(message)
        this.name = "ArgumentCountError"
    }
}


const TYPE = {
    REG: 1,
    CONST: 0,
    LINK: 2,
    PREG: 3,
    PLINK: 4,
    FLAG: 5,
}

const PREGS = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    X: 4,
    Y: 5,
    KB: 6,
    KBT: 7,
    XDIR: 8,
    YDIR: 9,
    CRSX: 10,
    CRSY: 11,
    CRSAM: 12,
    CRSLE: 13,

    STACK: 14,

    RANDOM: 15,

    N: 255,
}

const FLAG = {
    CARRY: 0,
    HALFCARRY: 1,
    PARITY: 2,
    SIGN: 3,
    ZERO: 4,
    INTERRUPTION: 5,
    OVERFLOW: 6,
}

const OP = {
    NULL: 0,
    ADD: 31,
    SUB: 32,
    MUL: 33,
    MLL: 34,
    DVV: 35,
    MOD: 36,
    MNP: 37,
    DIV: 38,
    PRG: 11,
    EXT: 12,
    SET: 13,
    MOV: 14,
    CPY: 15,
    VAR: 16,
    CONST: 17,
    RTN: 18,
    PRINT: 19,
    AND: 21,
    NND: 22,
    BOR: 23,
    NOR: 24,
    XOR: 25,
    NXR: 26,
    INV: 27,
    LNP: 28,
    JMP: 41,
    JIE: 42,
    JNE: 43,
    JEZ: 44,
    JNZ: 45,
    JWR: 46,
    PNT: 47,
    CLS: 48,
    PLT: 49,
    PTL: 410,
}

function NoOP(){return}

const keyboardMap = [
    "", // [0]
    "", // [1]
    "", // [2]
    "CANCEL", // [3]
    "", // [4]
    "", // [5]
    "HELP", // [6]
    "", // [7]
    "BACK_SPACE", // [8]
    "TAB", // [9]
    "", // [10]
    "", // [11]
    "CLEAR", // [12]
    "ENTER", // [13]
    "ENTER_SPECIAL", // [14]
    "", // [15]
    "SHIFT", // [16]
    "CONTROL", // [17]
    "ALT", // [18]
    "PAUSE", // [19]
    "CAPS_LOCK", // [20]
    "KANA", // [21]
    "EISU", // [22]
    "JUNJA", // [23]
    "FINAL", // [24]
    "HANJA", // [25]
    "", // [26]
    "ESCAPE", // [27]
    "CONVERT", // [28]
    "NONCONVERT", // [29]
    "ACCEPT", // [30]
    "MODECHANGE", // [31]
    "SPACE", // [32]
    "PAGE_UP", // [33]
    "PAGE_DOWN", // [34]
    "END", // [35]
    "HOME", // [36]
    "LEFT", // [37]
    "UP", // [38]
    "RIGHT", // [39]
    "DOWN", // [40]
    "SELECT", // [41]
    "PRINT", // [42]
    "EXECUTE", // [43]
    "PRINTSCREEN", // [44]
    "INSERT", // [45]
    "DELETE", // [46]
    "", // [47]
    "0", // [48]
    "1", // [49]
    "2", // [50]
    "3", // [51]
    "4", // [52]
    "5", // [53]
    "6", // [54]
    "7", // [55]
    "8", // [56]
    "9", // [57]
    "COLON", // [58]
    "SEMICOLON", // [59]
    "LESS_THAN", // [60]
    "EQUALS", // [61]
    "GREATER_THAN", // [62]
    "QUESTION_MARK", // [63]
    "AT", // [64]
    "A", // [65]
    "B", // [66]
    "C", // [67]
    "D", // [68]
    "E", // [69]
    "F", // [70]
    "G", // [71]
    "H", // [72]
    "I", // [73]
    "J", // [74]
    "K", // [75]
    "L", // [76]
    "M", // [77]
    "N", // [78]
    "O", // [79]
    "P", // [80]
    "Q", // [81]
    "R", // [82]
    "S", // [83]
    "T", // [84]
    "U", // [85]
    "V", // [86]
    "W", // [87]
    "X", // [88]
    "Y", // [89]
    "Z", // [90]
    "OS_KEY", // [91] Windows Key (Windows) or Command Key (Mac)
    "", // [92]
    "CONTEXT_MENU", // [93]
    "", // [94]
    "SLEEP", // [95]
    "NUMPAD0", // [96]
    "NUMPAD1", // [97]
    "NUMPAD2", // [98]
    "NUMPAD3", // [99]
    "NUMPAD4", // [100]
    "NUMPAD5", // [101]
    "NUMPAD6", // [102]
    "NUMPAD7", // [103]
    "NUMPAD8", // [104]
    "NUMPAD9", // [105]
    "MULTIPLY", // [106]
    "ADD", // [107]
    "SEPARATOR", // [108]
    "SUBTRACT", // [109]
    "DECIMAL", // [110]
    "DIVIDE", // [111]
    "F1", // [112]
    "F2", // [113]
    "F3", // [114]
    "F4", // [115]
    "F5", // [116]
    "F6", // [117]
    "F7", // [118]
    "F8", // [119]
    "F9", // [120]
    "F10", // [121]
    "F11", // [122]
    "F12", // [123]
    "F13", // [124]
    "F14", // [125]
    "F15", // [126]
    "F16", // [127]
    "F17", // [128]
    "F18", // [129]
    "F19", // [130]
    "F20", // [131]
    "F21", // [132]
    "F22", // [133]
    "F23", // [134]
    "F24", // [135]
    "", // [136]
    "", // [137]
    "", // [138]
    "", // [139]
    "", // [140]
    "", // [141]
    "", // [142]
    "", // [143]
    "NUM_LOCK", // [144]
    "SCROLL_LOCK", // [145]
    "WIN_OEM_FJ_JISHO", // [146]
    "WIN_OEM_FJ_MASSHOU", // [147]
    "WIN_OEM_FJ_TOUROKU", // [148]
    "WIN_OEM_FJ_LOYA", // [149]
    "WIN_OEM_FJ_ROYA", // [150]
    "", // [151]
    "", // [152]
    "", // [153]
    "", // [154]
    "", // [155]
    "", // [156]
    "", // [157]
    "", // [158]
    "", // [159]
    "CIRCUMFLEX", // [160]
    "EXCLAMATION", // [161]
    "DOUBLE_QUOTE", // [162]
    "HASH", // [163]
    "DOLLAR", // [164]
    "PERCENT", // [165]
    "AMPERSAND", // [166]
    "UNDERSCORE", // [167]
    "OPEN_PAREN", // [168]
    "CLOSE_PAREN", // [169]
    "ASTERISK", // [170]
    "PLUS", // [171]
    "PIPE", // [172]
    "HYPHEN_MINUS", // [173]
    "OPEN_CURLY_BRACKET", // [174]
    "CLOSE_CURLY_BRACKET", // [175]
    "TILDE", // [176]
    "", // [177]
    "", // [178]
    "", // [179]
    "", // [180]
    "VOLUME_MUTE", // [181]
    "VOLUME_DOWN", // [182]
    "VOLUME_UP", // [183]
    "", // [184]
    "", // [185]
    "SEMICOLON", // [186]
    "EQUALS", // [187]
    "COMMA", // [188]
    "MINUS", // [189]
    "PERIOD", // [190]
    "SLASH", // [191]
    "BACK_QUOTE", // [192]
    "", // [193]
    "", // [194]
    "", // [195]
    "", // [196]
    "", // [197]
    "", // [198]
    "", // [199]
    "", // [200]
    "", // [201]
    "", // [202]
    "", // [203]
    "", // [204]
    "", // [205]
    "", // [206]
    "", // [207]
    "", // [208]
    "", // [209]
    "", // [210]
    "", // [211]
    "", // [212]
    "", // [213]
    "", // [214]
    "", // [215]
    "", // [216]
    "", // [217]
    "", // [218]
    "OPEN_BRACKET", // [219]
    "BACK_SLASH", // [220]
    "CLOSE_BRACKET", // [221]
    "QUOTE", // [222]
    "", // [223]
    "META", // [224]
    "ALTGR", // [225]
    "", // [226]
    "WIN_ICO_HELP", // [227]
    "WIN_ICO_00", // [228]
    "", // [229]
    "WIN_ICO_CLEAR", // [230]
    "", // [231]
    "", // [232]
    "WIN_OEM_RESET", // [233]
    "WIN_OEM_JUMP", // [234]
    "WIN_OEM_PA1", // [235]
    "WIN_OEM_PA2", // [236]
    "WIN_OEM_PA3", // [237]
    "WIN_OEM_WSCTRL", // [238]
    "WIN_OEM_CUSEL", // [239]
    "WIN_OEM_ATTN", // [240]
    "WIN_OEM_FINISH", // [241]
    "WIN_OEM_COPY", // [242]
    "WIN_OEM_AUTO", // [243]
    "WIN_OEM_ENLW", // [244]
    "WIN_OEM_BACKTAB", // [245]
    "ATTN", // [246]
    "CRSEL", // [247]
    "EXSEL", // [248]
    "EREOF", // [249]
    "PLAY", // [250]
    "ZOOM", // [251]
    "", // [252]
    "PA1", // [253]
    "WIN_OEM_CLEAR", // [254]
    "" // [255]
  ];

/* COMMAND STRUCTURE
*  
*  PROGRAM = [
    [CMD_ID, [
        [ARG_TYPE, ARG_VALUE]
        *N [0<=N<=3]
    ]]
]
*  EXAMPLE:
*  
*  PROGRAM = [
    [OP.SET, [
        [TYPE.REG, 0],
        [TYPE.CONST, 20]
    ]],

    [OP.ADD, [
        [TYPE.REG, 0],
        [TYPE.CONST, 1],
        [TYPE.REG, 0]
    ]]
]
*//*


class Screen{
    constructor(width, height, wchars, hchars, node){

        //console.log(width, height, wchars, hchars)

        this.width = width
        this.height = height
        this.wchars = wchars
        this.hchars = hchars
        let nodeid = document.getElementById(node)
        this.canvas = nodeid.getContext('2d')

        //console.log(this.width, this.height, this.wchars, this.hchars)

        nodeid.width = width
        nodeid.height = height
        nodeid.imageSmoothingEnabled = false

        this.canvas.imageSmoothingEnabled = false

        this.img = new Image
        this.img.src = './assets/default_font.png'

    }

    character(x, y, char, color='white', bgcolor='black'){
        //console.warn(x, y, char)

        //x %= this.wchars
        //y %= this.hchars

        let charwidth = this.width / this.wchars
        let charheight = this.height / this.hchars

        let charnum
        if(typeof(char) == String){
            charnum = char.charCodeAt(0) % 256
        }else {
            charnum = char
        }

        //console.log(x, y, charnum)

        let imgX = (charnum % 16) * 8
        let imgY = ((charnum - (charnum % 16)) / 16) * 8

        this.canvas.fillStyle = bgcolor
        this.canvas.fillRect(x * charwidth, y * charheight, charwidth, charheight)
        this.canvas.fillStyle=color
        this.canvas.drawImage(this.img, imgX, imgY, 8, 8, x*charwidth, y*charheight, charwidth, charheight)
    }
    dot(x, y, color='white'){
        console.log(x, y)
        this.canvas.fillStyle = color
        this.canvas.fillRect(x, y, 1, 1)
    }

    plot(x, y, char, color="white", bgcolor="transparent"){

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

    clear(){
        this.canvas.clearRect(0, 0, this.width, this.height)
    }
}

class Memory{
    data = Array(256).fill(0)
    limit = 0xff
    dataLimit = 0xff
    
    constructor(bbd, dbd){
        this.data = Array(2**bbd).fill(0)
        this.limit = 2**dbd - 1
        this.dataLimit = 2**bbd - 1
    }

    set(address, value){
        if (address % 1 != 0) return false
        this.data[address & this.dataLimit] = value & this.limit
        return true
    }
    get(address){
        return this.data[Math.floor(address) & this.dataLimit]
    }

    fill(value){
        this.data.fill(value & this.limit)
    }
}

class MemoryStack{
    data = Array(256).fill(0)
    limit = 0xff
    dataLimit = 0xff
    pointer = -1
    
    constructor(bbd, dbd){
        this.data = Array(2**bbd).fill(0)
        this.limit = 2**dbd - 1
        this.dataLimit = 2**bbd - 1
    }

    set(value){
        this.data[++this.pointer & this.dataLimit] = value & this.limit
        return true
    }
    get(){
        if (this.pointer < 0) return -1
        return this.data[this.pointer-- & this.dataLimit]
    }

    fill(value){
        this.data.fill(value & this.limit)
    }
}

class Machine{
    busSize = 8
    dataSize = 8

    screen = null

    ram = []
    pregs = []
    stackmem = []
    funcstack = []
    flags = []

    pc = 0

    code = []

    ops = Array(64).fill(this.nothing)

    constructor(bbd, dbd, code = [], sw, sh, swc, shc){
        this.busSize = bbd
        this.dataSize = dbd

        this.code = code

        this.ram = new Memory(bbd, dbd)
        this.pregs = new Memory(5, dbd)
        this.stackmem = new MemoryStack(bbd, dbd)
        this.funcstack = new MemoryStack(bbd, dbd)
        this.flags = new Memory(5, 1)

        this.screen = new Screen(sw, sh, swc, shc, "screen")
        
        this.ops[31] = this.op_add
        this.ops[32] = this.op_sub
        this.ops[33] = this.op_mul
        this.ops[34] = this.op_mll
        this.ops[35] = this.op_dvv
        this.ops[36] = this.op_mod
        
        this.ops[21] = this.op_and
        this.ops[22] = this.op_nnd
        this.ops[23] = this.op_bor
        this.ops[24] = this.op_nor
        this.ops[25] = this.op_xor
        this.ops[26] = this.op_nxr
        this.ops[27] = this.op_inv

        this.pregs.set(PREGS.KB, 0)
    }


    op_add(args){

        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r = a + b
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r)
        }else{
            this.ram.set(c, r)
        }

        this.update_flags(r)

        this.pc++

        return true
    }
    op_sub(args){
        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r = a - b
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r)
        }else{
            this.ram.set(c, r)
        }


        this.update_flags(r)

        this.pc++

        return true
    }
    op_dvv(args){
        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r = (a - (a % b))/b
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r)
        }else{
            this.ram.set(c, r)
        }

        this.update_flags(r)

        this.pc++

        return true
    }
    op_mll(args){
        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r = a * b
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r)
        }else{
            this.ram.set(c, r)
        }

        this.update_flags(r)

        this.pc++

        return true
    }
    op_mul(args){
        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r0 = a * b
        let r1 = a * b >> this.datasize
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r0)
        }else{
            this.ram.set(c, r0)
            this.ram.set(c + 1, r1)
        }

        this.update_flags(r0)

        this.pc++

        return true
    }
    op_mod(args){
        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r = a % b
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r)
        }else{
            this.ram.set(c, r)
        }

        this.update_flags(r)

        this.pc++

        return true
    }
    
    op_and(args){
        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r = a & b
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r)
        }else{
            this.ram.set(c, r)
        }

        this.update_flags(r)

        this.pc++

        return true
    }
    op_nnd(args){
        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r = ~(a & b)
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r)
        }else{
            this.ram.set(c, r)
        }

        this.update_flags(r)

        this.pc++

        return true
    }
    op_bor(args){
        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r = a | b
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r)
        }else{
            this.ram.set(c, r)
        }

        this.update_flags(r)

        this.pc++

        return true
    }
    op_nor(args){
        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r = ~(a | b)
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r)
        }else{
            this.ram.set(c, r)
        }

        this.update_flags(r)

        this.pc++

        return true
    }
    op_xor(args){
        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r = a ^ b
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r)
        }else{
            this.ram.set(c, r)
        }

        this.update_flags(r)

        this.pc++

        return true
    }
    op_nxr(args){
        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], false)

        let r = ~(a ^ b)
        if (args[2][0] == TYPE.PREG){
            this.pregs.set(c, r)
        }else{
            this.ram.set(c, r)
        }

        this.update_flags(r)

        this.pc++

        return true
    }
    op_inv(args){
        if (args.length != 2) throw new ArgumentsCountError("Expected 2 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], false)
        //let c = this.getarg(args[2][1], args[2][0], false)

        let r = ~a
        if (args[1][0] == TYPE.PREG){
            this.pregs.set(b, r)
        }else{
            this.ram.set(b, r)
        }

        this.update_flags(r)

        this.pc++

        return true
    }

    op_set(args){
        if (args.length != 2) throw new ArgumentsCountError("Expected 2 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], false)
        let b = this.getarg(args[1][1], args[1][0], true)
        //let c = this.getarg(args[2][1], args[2][0], false)

        if (args[0][0] == TYPE.PREG){
            this.pregs.set(a, b)
        }else{
            this.ram.set(a, b)
        }

        this.update_flags(b)

        this.pc++

        return true
    }
    op_mov(args){

        //console.log(args)

        if (args.length != 2) throw new ArgumentsCountError("Expected 2 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], false)
        let b = this.getarg(args[1][1], args[1][0], true)
        //let c = this.getarg(args[2][1], args[2][0], false)

        if (args[0][0] == TYPE.PREG){
            this.pregs.set(a, b)
        }else{
            this.ram.set(a, b)
        }
        if (args[1][0] == TYPE.PREG){
            this.pregs.set(args[1][1], 0)
        }else{
            this.ram.set(args[1][1], 0)
        }

        this.update_flags(b)

        this.pc++

        return true
    }
    op_cpy(args){
        if (args.length != 2) throw new ArgumentsCountError("Expected 2 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], false)
        let b = this.getarg(args[1][1], args[1][0], true)
        //let c = this.getarg(args[2][1], args[2][0], false)

        if (args[0][0] == TYPE.PREG){
            this.pregs.set(a, b)
        }else{
            this.ram.set(a, b)
        }

        this.update_flags(b)

        this.pc++

        return true
    }
    
    op_print(args){
        let a = -1
        let b = -1
        let c = -1
        if (args.length > 0) a = this.getarg(args[0][1], args[0][0], true)
        if (args.length > 1) b = this.getarg(args[1][1], args[1][0], true)
        if (args.length > 2) c = this.getarg(args[2][1], args[2][0], true)

        console.log(">>>", a, b, c)

        this.pc++

        return true
    }
    op_pnt(args){

        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], true)

        //console.log(c, "at (", a, ";", b, ")")

        this.screen.character(a, b, c)

        this.update_flags(c)

        this.pc++

        return true
    }
    op_plt(args){

        if (args.length < 2) throw new ArgumentsCountError("Expected at least 2 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        if(args.length == 3) {
            let c = this.getarg(args[2][1], args[2][0], true)
            this.screen.dot(a, b, "#" +
            (((
                ( ( ((c & 0b11000000) >>> 6) * 85 ) <<24)
                |( ( ((c & 0b00110000) >>> 4) * 85 ) <<16)
                |( ( ((c & 0b00001100) >> 2) * 85 ) <<8)
                |( ( (c & 0b00000011) * 85 ) )
            ) & 0x00000000FFFFFFFF)>>>0).toString(16).padStart(8, '0'))
        }else{
            this.screen.dot(a, b)
        }
        //console.log(c, "at (", a, ";", b, ")")

        //this.update_flags(c)

        return true
    }
    op_ptl(args){

        if (args.length < 3) throw new ArgumentsCountError("Expected at least 2 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], true)
        //console.log(c, "at (", a, ";", b, ")")

        this.screen.plot(a, b, c)

        //this.update_flags(c)

        return true
    }

    op_jie(args){

        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], true)

        //console.warn(a, b, c, a == b)

        if (a == b) this.pc = c
        else this.pc++

        this.update_flags(c)

        return true
    }
    op_jne(args){

        if (args.length < 3) throw new ArgumentsCountError("Expected 3 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)
        let c = this.getarg(args[2][1], args[2][0], true)

        if (a != b) this.pc = c
        else this.pc++

        this.update_flags(c)

        return true
    }
    op_jez(args){

        if (args.length != 2) throw new ArgumentsCountError("Expected 2 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)

        //console.error(a, b, a==0)

        if (a == 0) this.pc = b
        else this.pc++

        this.update_flags(b)

        return true
    }
    op_jnz(args){

        if (args.length != 2) throw new ArgumentsCountError("Expected 2 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)
        let b = this.getarg(args[1][1], args[1][0], true)

        if (a != 0) this.pc = b
        else this.pc++

        //console.log("Jump to", this.pc)

        this.update_flags(b)

        return true
    }
    op_jmp(args){

        if (args.length != 1) throw new ArgumentsCountError("Expected 1 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)

        this.pc = a

        this.update_flags(a)

        return true
    }
    op_jwr(args){

        if (args.length != 1) throw new ArgumentsCountError("Expected 1 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")
        let a = this.getarg(args[0][1], args[0][0], true)

        this.funcstack.set(this.pc)
        this.pc = a

        this.update_flags(a)

        return true
    }
    op_rtn(args){

        if (args.length != 0) throw new ArgumentsCountError("Expected 1 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")

        this.pc = this.funcstack.get() + 1

        this.update_flags(this.pc)

        return true
    }

    op_lnp(args){
        this.pc++
        return true
    }

    op_ext(args){

        if (args.length != 0) throw new ArgumentsCountError("Expected 1 arguments at line [" + String(this.pc), "], got [" + String(args.length) + "].")

        //console.log("Finish at line", String(this.pc))

        this.pc = -1

        return true
    }

    nothing(args){
        return true
    }

    getarg(value, type, canBePointer = true){
        //console.log("VAR", value, type, canBePointer)
        let r = 0
        if (!canBePointer) return value
        switch(type){
            case TYPE.REG:
                r = this.ram.get(value)
                break
            case TYPE.CONST:
                r = value
                break
            case TYPE.PREG:
                r = this.pregs.get(value)
                break
            case TYPE.LINK:
                r = this.ram.get(this.ram.get(value))
                break
            case TYPE.PLINK:
                r = this.ram.get(this.pregs.get(value))
                break
            case TYPE.FLAG:
                r = this.flags.get(value)
                break
        } return r
    }

    update_flags(value){
        this.flags.set(FLAG.CARRY, value < 0 )
        this.flags.set(FLAG.HALFCARRY, (value & (2**this.dataSize << (this.dataSize/2)) ) == 0 )
        this.flags.set(FLAG.PARITY, value & 1 )
        this.flags.set(FLAG.ZERO, value == 0 )
        this.flags.set(FLAG.SIGN, (value & (1 << (this.dataSize-1))) > 0 )
        this.flags.set(FLAG.OVERFLOW, value >= 2**this.dataSize )/*
        console.log("FLAGS FOR", value, "STEP", this.pc)
        console.log(this.flags.get(0), "carry")
        console.log(this.flags.get(1), "halfcarry")
        console.log(this.flags.get(2), "parity")
        console.log(this.flags.get(3), "sign")
        console.log(this.flags.get(4), "zero")
        console.log(this.flags.get(5), "reserved")
        console.log(this.flags.get(6), "overflow")*//*
    }

    perform(){
        if(this.code.length < 1) return -1
        if(this.pc < 0) return -1
        if(Array.isArray(this.code[this.pc])){
            if(this.code[this.pc].length < 2) return -1
        }
        if(this.pc >= this.code.length) return -1

        this.pregs.set(PREGS.RANDOM, Math.floor(Math.random() * (2**this.dataSize - 1)))

        this.pc = this.pc % this.code.length

        //console.log(this.code[this.pc])

        //console.warn(this.pregs.get(PREGS.KB))

        switch(this.code[this.pc][0]){
            case OP.ADD: this.op_add(this.code[this.pc][1]); break
            case OP.SUB: this.op_sub(this.code[this.pc][1]); break
            case OP.MLL: this.op_mll(this.code[this.pc][1]); break
            case OP.MUL: this.op_mul(this.code[this.pc][1]); break
            case OP.DVV: this.op_dvv(this.code[this.pc][1]); break
            case OP.MOD: this.op_mod(this.code[this.pc][1]); break

            case OP.AND: this.op_and(this.code[this.pc][1]); break
            case OP.NND: this.op_nnd(this.code[this.pc][1]); break
            case OP.BOR: this.op_bor(this.code[this.pc][1]); break
            case OP.NOR: this.op_nor(this.code[this.pc][1]); break
            case OP.XOR: this.op_xor(this.code[this.pc][1]); break
            case OP.NXR: this.op_nxr(this.code[this.pc][1]); break
            case OP.INV: this.op_inv(this.code[this.pc][1]); break

            case OP.SET: this.op_set(this.code[this.pc][1]); break
            case OP.MOV: this.op_mov(this.code[this.pc][1]); break
            case OP.CPY: this.op_cpy(this.code[this.pc][1]); break

            case OP.JMP: this.op_jmp(this.code[this.pc][1]); break
            case OP.JIE: this.op_jie(this.code[this.pc][1]); break
            case OP.JNE: this.op_jne(this.code[this.pc][1]); break
            case OP.JEZ: this.op_jez(this.code[this.pc][1]); break
            case OP.JNZ: this.op_jnz(this.code[this.pc][1]); break
            case OP.JWR: this.op_jwr(this.code[this.pc][1]); break
            case OP.RTN: this.op_rtn(this.code[this.pc][1]); break
            
            case OP.EXT: this.op_ext(this.code[this.pc][1]); break
            case OP.PNT: this.op_pnt(this.code[this.pc][1]); break
            case OP.PLT: this.op_plt(this.code[this.pc][1]); break
            case OP.PTL: this.op_ptl(this.code[this.pc][1]); break
            
            case OP.LNP: this.op_lnp(this.code[this.pc][1]); break

            default: this.op_print(this.code[this.pc][1])

            //this.perform()

            this.pregs.data[PREGS.KB] = 0

        }

        //console.log(n)
    }

}

let program = [
       [ OP.SET, [
            [TYPE.REG, 1],
            [TYPE.CONST, 0]
        ]],
        [OP.JIE, [
            [TYPE.REG, 1],
            [TYPE.CONST, 16],
            [TYPE.CONST, 10]
        ]],
        [OP.SET, [
            [TYPE.REG, 0],
            [TYPE.CONST, 0x30]
        ]],
        [OP.ADD, [
            [TYPE.REG, 1],
            [TYPE.REG, 0],
            [TYPE.REG, 0]
        ]],
        [OP.ADD, [
            [TYPE.CONST, 246],
            [TYPE.REG, 1],
            [TYPE.PREG, PREGS.N]
        ]],
        [OP.JEZ, [
            [TYPE.FLAG, FLAG.OVERFLOW],
            [TYPE.CONST, 7]
        ]],
        [OP.ADD, [
            [TYPE.REG, 0],
            [TYPE.CONST, 7],
            [TYPE.REG, 0]
        ]],
        [OP.PNT, [
            [TYPE.REG, 1],
            [TYPE.CONST, 0],
            [TYPE.REG, 0]
        ]],
        [OP.ADD, [
            [TYPE.REG, 1],
            [TYPE.CONST, 1],
            [TYPE.REG, 1]
        ]],
        [OP.JMP, [
            [TYPE.CONST, 1]
        ]],
        [OP.EXT, []]
]

const programTest = [
    [
        [OP.SET, [
            [TYPE.REG, 0],
            [TYPE.CONST, 20]
        ]],
        [OP.SUB, [
            [TYPE.REG, 0],
            [TYPE.CONST, 15],
            [TYPE.REG, 1]
        ]],
        [OP.SUB, [
            [TYPE.REG, 1],
            [TYPE.CONST, 15],
            [TYPE.REG, 2]
        ]]
    ],
    [
        [OP.JEZ, [
            [TYPE.REG, 0],
            [TYPE.CONST, 2]
        ]],
        [OP.SET, [
            [TYPE.REG, 1],
            [TYPE.CONST, 12]
        ]],
        [OP.SET, [
            [TYPE.REG, 0],
            [TYPE.CONST, 1]
        ]],
        [OP.JEZ, [
            [TYPE.REG, 0],
            [TYPE.CONST, 0]
        ]],
        [OP.EXT, []]
    ]
]

const symbolsettest = [
    [OP.SET, [
        [TYPE.PREG, PREGS.X],
        [TYPE.CONST, 0]
    ]],
    [OP.SET, [
        [TYPE.PREG, PREGS.Y],
        [TYPE.CONST, 0]
    ]],
    [OP.PNT, [
        [TYPE.PREG, PREGS.X],
        [TYPE.PREG, PREGS.Y],
        [TYPE.PREG, PREGS.RANDOM]
    ]],
    [OP.ADD, [
        [TYPE.PREG, PREGS.X],
        [TYPE.CONST, 1],
        [TYPE.PREG, PREGS.X]
    ]],
    [OP.JEZ, [
        [TYPE.FLAG, FLAG.OVERFLOW],
        [TYPE.CONST, 2]
    ]],
    [OP.SET, [
        [TYPE.PREG, PREGS.X],
        [TYPE.CONST, 0]
    ]],
    [OP.ADD, [
        [TYPE.PREG, PREGS.Y],
        [TYPE.CONST, 1],
        [TYPE.PREG, PREGS.Y]
    ]],
    [OP.JEZ, [
        [TYPE.FLAG, FLAG.OVERFLOW],
        [TYPE.CONST, 2]
    ]],
    [OP.EXT, []]
]

var keyboardtest = [
    [OP.JNE, [
        [TYPE.PREG, PREGS.KB],
        [TYPE.CONST, 0],
        [TYPE.CONST, 2]
    ]],
    [OP.JIE, [
        [TYPE.PREG, PREGS.KB],
        [TYPE.CONST, 0],
        [TYPE.CONST, 0]
    ]],
    [OP.PNT, [
        [TYPE.CONST, 0],
        [TYPE.CONST, 0],
        [TYPE.CONST, 65]
    ]]
]

pongW = 32
pongH = 16
pongBX = 0
pongBY = 1
pongBnX = 2
pongBnY = 3
pongBSX = 4
pongBSY = 5
var pong = [
    [OP.SET, [ //0
        [TYPE.REG, pongBSX],
        [TYPE.CONST, 1]
    ]],
    [OP.SET, [ //1
        [TYPE.REG, pongBSY],
        [TYPE.CONST, 1]
    ]],
    [OP.SET, [ //0
        [TYPE.REG, pongBX],
        [TYPE.CONST, 7]
    ]],
    [OP.SET, [ //1
        [TYPE.REG, pongBY],
        [TYPE.CONST, 2]
    ]],

    [OP.JMP, [
        [TYPE.CONST, 23]
    ]],

    [OP.ADD, [ //2
        [TYPE.REG, pongBX],
        [TYPE.REG, pongBSX],
        [TYPE.REG, pongBnX]
    ]],
    [OP.ADD, [ //3
        [TYPE.REG, pongBnX],
        [TYPE.CONST, 256-pongW],
        [TYPE.PREG, PREGS.N]
    ]],
    [OP.JEZ, [ //4
        [TYPE.FLAG, FLAG.OVERFLOW],
        [TYPE.CONST, 10]
    ]],
    [OP.INV, [ //5
        [TYPE.REG, pongBSX],
        [TYPE.REG, pongBSX]
    ]],
    [OP.ADD, [ //6
        [TYPE.REG, pongBSX],
        [TYPE.CONST, 1],
        [TYPE.REG, pongBSX]
    ]],
    
    [OP.ADD, [ //7
        [TYPE.REG, pongBY],
        [TYPE.REG, pongBSY],
        [TYPE.REG, pongBnY]
    ]],
    [OP.ADD, [ //8
        [TYPE.REG, pongBnY],
        [TYPE.CONST, 256-pongH],
        [TYPE.PREG, PREGS.N]
    ]],
    [OP.JEZ, [ //9
        [TYPE.FLAG, FLAG.OVERFLOW],
        [TYPE.CONST, 15]
    ]],
    [OP.INV, [ //10
        [TYPE.REG, pongBSY],
        [TYPE.REG, pongBSY]
    ]],
    [OP.ADD, [ //11
        [TYPE.REG, pongBSY],
        [TYPE.CONST, 1],
        [TYPE.REG, pongBSY]
    ]],

    [OP.ADD, [ //12
        [TYPE.REG, pongBX],
        [TYPE.REG, pongBSX],
        [TYPE.REG, pongBnX]
    ]],
    [OP.ADD, [ //13
        [TYPE.REG, pongBY],
        [TYPE.REG, pongBSY],
        [TYPE.REG, pongBnY]
    ]],

    /*[OP.PRINT, [
        [TYPE.REG, pongBX],
        [TYPE.REG, pongBY]
    ]],*/

    [OP.PNT, [ //14
        [TYPE.REG, pongBX],
        [TYPE.REG, pongBY],
        [TYPE.CONST, 32]
    ]],
    [OP.PNT, [ //15
        [TYPE.REG, pongBnX],
        [TYPE.REG, pongBnY],
        [TYPE.CONST, 79]
    ]],

    [OP.SET, [ //16
        [TYPE.REG, pongBX],
        [TYPE.REG, pongBnX]
    ]],
    [OP.SET, [ //17
        [TYPE.REG, pongBY],
        [TYPE.REG, pongBnY]
    ]],

    [OP.JMP, [ //18
        [TYPE.CONST, 5]
    ]],


    [OP.SET, [ //23
        [TYPE.REG, 20],
        [TYPE.CONST, 0]
    ]],
    [OP.PNT, [
        [TYPE.REG, 20],
        [TYPE.CONST, pongH],
        [TYPE.CONST, 126]
    ]],
    [OP.ADD, [
        [TYPE.REG, 20],
        [TYPE.CONST, 1],
        [TYPE.REG, 20]
    ]],
    [OP.ADD, [
        [TYPE.REG, 20],
        [TYPE.CONST, 256-32],
        [TYPE.PREG, PREGS.N]
    ]],
    [OP.JEZ, [
        [TYPE.FLAG, FLAG.OVERFLOW],
        [TYPE.CONST, 24]
    ]],

    [OP.JMP, [
        [TYPE.CONST, 5]
    ]]
]

var stuff1 = [
    [OP.SET, [ //0
        [TYPE.REG, pongBSX],
        [TYPE.CONST, 1]
    ]],
    [OP.SET, [ //1
        [TYPE.REG, pongBSY],
        [TYPE.CONST, 1]
    ]],
    [OP.SET, [ //0
        [TYPE.REG, pongBX],
        [TYPE.CONST, 7]
    ]],
    [OP.SET, [ //1
        [TYPE.REG, pongBY],
        [TYPE.CONST, 2]
    ]],

    [OP.JMP, [
        [TYPE.CONST, 23]
    ]],

    [OP.ADD, [ //2
        [TYPE.REG, pongBX],
        [TYPE.REG, pongBSX],
        [TYPE.REG, pongBnX]
    ]],
    [OP.ADD, [ //3
        [TYPE.REG, pongBnX],
        [TYPE.CONST, 256-pongW],
        [TYPE.PREG, PREGS.N]
    ]],
    [OP.JEZ, [ //4
        [TYPE.FLAG, FLAG.OVERFLOW],
        [TYPE.CONST, 9]
    ]],
    [OP.INV, [ //5
        [TYPE.REG, pongBSX],
        [TYPE.REG, pongBSX]
    ]],
    [OP.ADD, [ //6
        [TYPE.REG, pongBSX],
        [TYPE.CONST, 1],
        [TYPE.REG, pongBSX]
    ]],
    
    [OP.ADD, [ //7
        [TYPE.REG, pongBY],
        [TYPE.REG, pongBSY],
        [TYPE.REG, pongBnY]
    ]],
    [OP.ADD, [ //8
        [TYPE.REG, pongBnY],
        [TYPE.CONST, 256-pongH],
        [TYPE.PREG, PREGS.N]
    ]],
    [OP.JEZ, [ //9
        [TYPE.FLAG, FLAG.OVERFLOW],
        [TYPE.CONST, 14]
    ]],
    [OP.INV, [ //10
        [TYPE.REG, pongBSY],
        [TYPE.REG, pongBSY]
    ]],
    [OP.ADD, [ //11
        [TYPE.REG, pongBSY],
        [TYPE.CONST, 1],
        [TYPE.REG, pongBSY]
    ]],

    [OP.ADD, [ //12
        [TYPE.REG, pongBX],
        [TYPE.REG, pongBSX],
        [TYPE.REG, pongBnX]
    ]],
    [OP.ADD, [ //13
        [TYPE.REG, pongBY],
        [TYPE.REG, pongBSY],
        [TYPE.REG, pongBnY]
    ]],

    [OP.PRINT, [
        [TYPE.REG, pongBX],
        [TYPE.REG, pongBY]
    ]],

    [OP.PNT, [ //14
        [TYPE.REG, pongBX],
        [TYPE.REG, pongBY],
        [TYPE.CONST, 32]
    ]],
    [OP.PNT, [ //15
        [TYPE.REG, pongBnX],
        [TYPE.REG, pongBnY],
        [TYPE.CONST, 79]
    ]],

    [OP.SET, [ //16
        [TYPE.REG, pongBX],
        [TYPE.REG, pongBnX]
    ]],
    [OP.SET, [ //17
        [TYPE.REG, pongBY],
        [TYPE.REG, pongBnY]
    ]],

    [OP.JMP, [ //18
        [TYPE.CONST, 5]
    ]],


    [OP.SET, [ //23
        [TYPE.REG, 20],
        [TYPE.CONST, 0]
    ]],
    [OP.PNT, [
        [TYPE.REG, 20],
        [TYPE.CONST, pongH],
        [TYPE.CONST, 126]
    ]],
    [OP.ADD, [
        [TYPE.REG, 20],
        [TYPE.CONST, 1],
        [TYPE.REG, 20]
    ]],
    [OP.ADD, [
        [TYPE.REG, 20],
        [TYPE.CONST, 256-32],
        [TYPE.PREG, PREGS.N]
    ]],
    [OP.JEZ, [
        [TYPE.FLAG, FLAG.OVERFLOW],
        [TYPE.CONST, 24]
    ]],

    [OP.JMP, [
        [TYPE.CONST, 5]
    ]]
]
*/
