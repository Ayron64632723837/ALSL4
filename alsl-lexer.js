const KEYWORDS = {
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
    //VAR: 16,
    //CONST: 17,
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
}


const DTYPE = {
    REG: 1, //done
    CONST: 0, //done?
    LINK: 2, //done?
    // REG
    // VAR
    // PREG = PLINK -> deny
    // CONST -> reg address
    // FLAG -> deny
    PREG: 3, //done
    PLINK: 4,  //done?
    FLAG: 5, //done
    //VAR? //done
    //CONST? //done
}
const PREGSnames = {
    "$a": 0,
    "$b": 1,
    "$c": 2,
    "$d": 3,
    "$x": 4,
    "$y": 5,
    "$kb": 6,
    "$kbt": 7,
    "$xdir": 8,
    "$ydir": 9,
    "$crsx": 10,
    "$crsy": 11,
    "$crsam": 12,
    "$crsle": 13,

    "$stack": 14,

    "$random": 15,

    "$n": 31,
}

const FLAGS = {
    "$cf": 0,
    "$hcf": 1,
    "$pf": 2,
    "$sf": 3,
    "$zf": 4,
    "$if": 5,
    "$of": 6,
}


class Lexer{
    vars = {

    }
    consts = {

    }
    points = {

    }
    constructor(rawCode){
        let step = -1
        let code = []
        rawCode = rawCode.replace('\r', '')
        //console.log((rawCode))
        for(let i of rawCode.split("\n")){

            let str = i.trimStart().split(" ")

            //console.log(str)

            if(str.length < 1) continue

            if(str[0].slice(0, 1) == "."){
                this.points[str[0]] = step + 1
                continue
            }

            if(str[0].toLowerCase() == "var"){
                this.vars[str[1]] = this.parseArgument(str[2])[1]
                step++
            }

            else if(str[0].toUpperCase() in KEYWORDS){
                step++
            }
        }

        //console.log(this)

        for(let i of rawCode.split("\n")){
            let newInstruction = [null, []]

            let str = i.trimStart().split(" ")

            //console.log(str)

            if(str.length < 1) continue

            if(str[0].slice(0, 1) == "."){
                continue
            }

            if(str[0].toLowerCase() == "var"){
                if(str.length > 3){
                    newInstruction = [
                        KEYWORDS.SET, [
                            [DTYPE.REG, this.parseArgument(str[2])[1]],
                            [DTYPE.CONST, this.parseArgument(str[3])[1]]
                        ]
                    ]
                }else{
                    newInstruction = [
                        KEYWORDS.SET, [
                            [DTYPE.REG, this.parseArgument(str[2])[1]],
                            [DTYPE.CONST, 0]
                        ]
                    ]
                }
                step++
            }

            else if(str[0].toLowerCase() == "const"){
                this.consts[str[1]] = this.parseArgument(str[2])[1]
            }

            else if(str[0].toUpperCase() in KEYWORDS){

                //console.warn(KEYWORDS[str[0].toUpperCase()])

                newInstruction[0] = KEYWORDS[str[0].toUpperCase()]
                for(var j = 1; j < str.length; j++){
                    let newArg = this.parseArgument(str[j])
                    if(newArg.length < 2) break

                    newInstruction[1].push(newArg)
                }

                step++
            }

            //console.log(newInstruction)
            if((newInstruction[0] != null) & (newInstruction[0] != undefined)){
                code.push(newInstruction)
                continue
            }
        }

        //console.warn(code)

        this.code = code
    }

    parseArgument(raw){
        let result = []
        //console.log(this.points)
        //console.log(raw)
        switch(true){
            case /^-?[0-9]+$/i.test(raw):
                result = [
                    DTYPE.CONST, Number(raw)
                ]
                break;
            case /^-?\b(h|0x)[0-9a-f]+$/i.test(raw):
                result = [
                    DTYPE.CONST, Number(raw.toLowerCase().replace("h", "0x"))
                ]
                break;
            case /^-?\b(b|0b)[01]+$/i.test(raw):
                if(raw[0] == "b"){raw = raw.replace("b", "0b")}
                result = [
                    DTYPE.CONST, Number(raw.toLowerCase())
                ]
                break;
            case /^(r|\#)[0-9a-f]+$/i.test(raw):
                result = [
                    DTYPE.REG, Number("0x" + String(raw.toLowerCase().slice(1)))
                ]
                break;
            case raw in FLAGS:
                result = [
                    DTYPE.FLAG, FLAGS[raw]
                ]
                break;
            case raw in PREGSnames:
                result = [
                    DTYPE.PREG, PREGSnames[raw]
                ]
                break;
            case raw in this.vars:
                result = [
                    DTYPE.REG, this.vars[raw]
                ]
                break;
            case raw in this.consts:
                result = [
                    DTYPE.CONST, this.consts[raw]
                ]
                break;
            case (raw[0] == "[") & (raw[-1] == "]") & (raw[1] != "$"):
                result = [
                    DTYPE.LINK, this.parseArgument(raw.slice(1, -1))[1]
                ]
                break;
            case (raw[0] == "[") & (raw[-1] == "]") & (raw[1] == "$") & (raw.slice(1, -1) in PREGSnames):
                result = [
                    DTYPE.PLINK, PREGSnames[raw.slice(1, -1)]
                ]
                break;
            case (raw.slice(0, 1) == "@") & (raw in this.vars):
                result = [
                    DTYPE.REG, this.vars[raw]
                ]
                break;
            case (raw.slice(0, 2) == "@!") & (raw in this.consts):
                result = [
                    DTYPE.CONST, this.consts[raw]
                ]
                break;
            case (raw.slice(0, 1) == "."):
                if(! raw in this.points) console.error("No such point as", raw)
                result = [
                    DTYPE.CONST, this.points[raw]
                ]
                break;

            default:
                result = [
                    DTYPE.CONST, 255
                ]
                //break;

        }
        //console.warn(raw, result[0], result[1])
        if(!Number.isInteger(result[1])) console.error(raw)
        return result
    }

}
