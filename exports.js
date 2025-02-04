const TYPE = {
    REG: 1,
    CONST: 0,
    LINK: 2,
    PREG: 3,
    PLINK: 4,
    FLAG: 5,
}

const TYPEDESTMUT = {
    1: 0,
    0: 5,
    2: 3,
    5: 1,
    4: 3,
    3: 3
}

const PREGS = {
    $A: 0,
    $B: 1,
    $C: 2,
    $D: 3,
    $X: 4,
    $Y: 5,
    $KB: 6,
    $KBT: 7,
    $XDIR: 8,
    $YDIR: 9,
    $CRSX: 10,
    $CRSY: 11,
    $CRSAM: 12,
    $CRSLE: 13,

    $STACK: 14,

    $RANDOM: 15,

    $FCOLOR: 29,
    $BGCOLOR: 30,
    $N: 31,
}

const FLAG = {
    $CF: 0,
    $HCF: 1,
    $PF: 2,
    $SF: 3,
    $ZF: 4,
    $IF: 5,
    $OF: 6,
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
    ADD: 1,
    SUB: 2,
    MUL: 3,
    MLL: 4,
    DVV: 5,
    MOD: 6,
    MNP: 7,
    DIV: 8,
    LSH: 9,
    LNP: 10,
    PRG: 11,
    EXT: 12,
    SET: 13,
    MOV: 14,
    CPY: 15,
    VAR: 16,
    CONST: 17,
    RTN: 18,
    PRINT: 19,
    AND: 20,
    NND: 21,
    BOR: 22,
    NOR: 23,
    XOR: 24,
    NXR: 25,
    INV: 26,
    RSH: 27,
    JMP: 28,
    JIE: 29,
    JNE: 30,
    JEZ: 31,
    JNZ: 32,
    JWR: 33,
    PNT: 34,
    CLS: 35,
    PLT: 36,
    PTL: 37,
    SWP: 38,
    JIG: 39,
    JIS: 40,
    JNG: 41,
    JNS: 42,
    JGE: 43,
    JSE: 44,
    OSH: 45,
    ASH: 46,
}
const OPFUNCS = [
    (args) => {},
    (args) => {set(args, 2, get(args, 0) + get(args, 1), true);},
    (args) => {set(args, 2, get(args, 0) - get(args, 1), true);},
    (args) => {set(args, 2, get(args, 0) * get(args, 1), true);},
    (args) => {
        set(args, 2, get(args, 0) * get(args, 1), true)
        shifts[0][2] = shifts[0][2] + 1
        set(args, 2, get(args, 0) * get(args, 1) >>> DS, false);
    },
    (args) => {set(args, 2, Math.floor(get(args, 0) / get(args, 1)), true);},
    (args) => {set(args, 2, get(args, 0) % get(args, 1), true);},
    (args) => {update_flags(0);},
    (args) => {set(args, 2, Math.floor(get(args, 0) / get(args, 1)), true);},
    (args) => {set(args, 2, get(args, 0) << get(args, 1), true);},
    (args) => {},
    (args) => {},
    (args) => {pc = 0; isRunning = false;},
    (args) => {set(args, 0, get(args, 1));},
    (args) => {set(args, 0, get(args, 1)); set(args[1][0], args[1][1], 0);},
    (args) => {set(args, 0, get(args, 1));},
    (args) => {},
    (args) => {},
    (args) => {pc = (funcstack[fsp & AL] - 1) & DL; fsp --;},
    (args) => {console.log(">>>", get(args, 0), get(args, 1), get(args, 2));},
    (args) => {set(args, 2, get(args, 0) & get(args, 1), true);},
    (args) => {set(args, 2, ~(get(args, 0) & get(args, 1)), true);},
    (args) => {set(args, 2, get(args, 0) | get(args, 1), true);},
    (args) => {set(args, 2, ~(get(args, 0) | get(args, 1)), true);},
    (args) => {set(args, 2, get(args, 0) ^ get(args, 1), true);},
    (args) => {set(args, 2, ~(get(args, 0) ^ get(args, 1)), true);},
    (args) => {set(args, 1, ~get(args, 0), true);},
    (args) => {set(args, 2, get(args, 0) >> get(args, 1), true);},
    (args) => {pc = get(args, 0) - 1;},
    (args) => {if(get(args, 0) == get(args, 1)) pc = get(args, 2) - 1;},
    (args) => {if(get(args, 0) != get(args, 1)) pc = get(args, 2) - 1;},
    (args) => {if(get(args, 0) == 0) pc = get(args, 1) - 1;},
    (args) => {if(get(args, 0) != 0) pc = get(args, 1) - 1;},
    (args) => {fsp ++; funcstack[fsp & AL] = (pc + 1) & DL; pc = get(args, 0) - 1;},
    (args) => {
        monitor.character(get(args, 0), get(args, 1), get(args, 2),
        getHexRGBA(pregs[PREGS.$FCOLOR], true), getHexRGBA(pregs[PREGS.$BGCOLOR], false));
    },
    (args) => {monitor.clear()},
    (args) => {monitor.dot(get(args, 0), get(args, 1), getHexRGBA(get(args, 2)));
        swaprequest |= !monitor.swapmode
    },
    (args) => {
        monitor.plot(get(args, 0), get(args, 1), get(args, 2),
        getHexRGBA(pregs[PREGS.$FCOLOR], true), getHexRGBA(pregs[PREGS.$BGCOLOR], false));
    },
    (args) => {monitor.swap();},
    (args) => {
        //console.log(">", args, get(args, 0), get(args, 1), get(args, 2));
        if(get(args, 0) > get(args, 1)) {pc = get(args, 2) - 1;}},
    (args) => {
        //console.log("<", args, get(args, 0), get(args, 1), get(args, 2));
        if(get(args, 0) < get(args, 1)) {pc = get(args, 2) - 1;}},
    (args) => {
        //console.log("!>", args, get(args, 0), get(args, 1), get(args, 2));
        if(get(args, 0) <= get(args, 1)) {pc = get(args, 2) - 1;}},
    (args) => {
        //console.log("!<", args, get(args, 0), get(args, 1), get(args, 2));
        if(get(args, 0) >= get(args, 1)) {pc = get(args, 2) - 1;}},
    (args) => {
        //console.log(">=", args, get(args, 0), get(args, 1), get(args, 2));
        if(get(args, 0) >= get(args, 1)) {pc = get(args, 2) - 1;}},
    (args) => {
        //console.log("<=", args, get(args, 0), get(args, 1), get(args, 2));
        if(get(args, 0) <= get(args, 1)) {pc = get(args, 2) - 1;}},
    (args) => {shifts[0] = [0,0,0]; shifts[0] = [get(args, 0, false), get(args, 1, false), get(args, 2, false)];},
    (args) => {shifts[1] = [0,0,0]; shifts[1] = [get(args, 0, false), get(args, 1, false), get(args, 2, false)];},
]
/*
const OP = {
    NULL: 0,
    ADD: 31,//
    SUB: 32,//
    MUL: 33,//
    MLL: 34,//
    DVV: 35,//
    MOD: 36,//
    MNP: 37,
    DIV: 38,//---
    LSH: 39,//
    LNP: 310,
    PRG: 11,
    EXT: 12,
    SET: 13,//
    MOV: 14,//
    CPY: 15,//
    VAR: 16,
    CONST: 17,
    RTN: 18,
    PRINT: 19,
    AND: 21,//
    NND: 22,//
    BOR: 23,//
    NOR: 24,//
    XOR: 25,//
    NXR: 26,//
    INV: 27,//
    RSH: 29,//
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
    SWP: 411,
    
    JIG: 50,
    JIS: 51,
    JNG: 52,
    JNS: 53,
    JGE: 53,
    JSE: 52,

    OSH: 60,
    ASH: 61,
}

*/
/*
const OUTPUTMAP = {
    0: -1,
    31: 2,
    32: 2,
    33: 2,
    34: 2,
    35: 2,
    36: 2,
    37: -1,
    38: 2,
    11: -1,
    12: -1,
    13: 0,
    14: 0,
    15: 0,
    //16: 16,
    //17: 17,
    18: -1,
    19: -1,
    21: 2,
    22: 2,
    23: 2,
    24: 2,
    25: 2,
    26: 2,
    27: 1,
    28: -1,
    29: 2,
    39: 2,
    41: -1,
    42: -1,
    43: -1,
    44: -1,
    45: -1,
    46: -1,
    47: -1,
    48: -1,
    49: -1,
    410: -1,
    411: -1,
}

const ARGUMENTCOUNT = {
    0: 0,
    31: 3,
    32: 3,
    33: 3,
    34: 3,
    35: 3,
    36: 3,
    37: 0,
    38: 3,
    11: 0,
    12: 0,
    13: 2,
    14: 2,
    15: 2,
    //16: 16,
    //17: 17,
    18: 0,
    19: 3,
    21: 3,
    22: 3,
    23: 3,
    24: 3,
    25: 3,
    26: 3,
    27: 2,
    28: -1,
    29: 3,
    39: 2,
    41: 1,
    42: 3,
    43: 3,
    44: 3,
    45: 3,
    46: 1,
    47: 3,
    48: 0,
    49: 3,
    410: 3,
    411: 0,

    50: 3,
    51: 3,
    52: 3,
    53: 3,
}
*/
