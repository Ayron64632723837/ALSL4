
step = -1;

vars = {};
consts = {};
points = {};

function textToBin(text) {
    //console.error(text)
    let output = "0x"
    for (var i of text) {
        let numberstring = i.charCodeAt(0).toString(16)
        if(numberstring.length % 2 == 1) numberstring = "0" + String(numberstring)
        output += String(numberstring)
    }
    //console.error(Number(output))
    return Number(output);
}

function parseArray(text, convertText = false, open="(", close=")", separator=","){
    var result = []
    for(let i of text.slice(1, -1).split(separator)){
        i = i.trim()
        if(/^\s?-?[0-9]+$/i.test(i)){
            result.push( Number(i) )
        }
        else if(/^\s?-?\b(h|0x)[0-9a-f]+$/i.test(i)){
            result.push( Number(i.toLowerCase().replace("h", "0x")) )
        }
        else if(/^\s?-?\b(b|0b)[01]+$/i.test(i)){
            if(i[0] == "b"){i = i.replace("b", "0b")}
            result.push( Number(i.toLowerCase()) )
        }
        else if((i[0] == '"' && i[i.length - 1] == '"')|(i[0] == "'" && i[i.length - 1] == "'")){
            if(convertText){
                for(let c of i.slice(1, -1)){
                    result.push(c.charCodeAt(0))
                }
            }else{
                result.push(i.slice(1, -1))
            }
        }
    }

    return result
}


function lex(rawCode){
    step = -1;

    vars = {};
    consts = {};
    points = {};

    code = []

    for(let i of rawCode.split(/\r?\n/)){
        let str = i.trimStart().split(" ");

        if(str.length < 1) continue;

        if(str[0].slice(0, 1) == "."){
            points[str[0]] = step + 1;
            continue;
        }

        if(str[0].toLowerCase() == "var"){
            vars[str[1].toUpperCase()] = parseArgument(str[2])[1];
            step++;
        }
        else if(str[0].toLowerCase() == "const"){
            consts[str[1].toUpperCase()] = parseArgument(str[2])[1];
        }

        else if(str[0].toUpperCase() in OP){
            step++;
        }
    }
    step = -1

    for(let i of rawCode.split(/\r?\n/)){
        let newInstruction = [null, [
            [TYPE.CONST, 0],
            [TYPE.CONST, 0],
            [TYPE.CONST, 0]
        ]]

        let str = i.trimStart().split(" ")

        //console.log(str)

        if(str.length < 1) continue

        if(str[0].slice(0, 1) == "."){
            continue
        }

        if(str[0].toLowerCase() == "var"){
            step++
            if(str.length > 3){
                newInstruction = [
                    OP.SET, [
                        [TYPE.REG, parseArgument(str[2])[1]],
                        [TYPE.CONST, parseArgument(str[3])[1]],
                        [0, 0]
                    ]
                ]
            }else{
                newInstruction = [
                    OP.SET, [
                        [TYPE.REG, parseArgument(str[2])[1]],
                        [TYPE.CONST, 0],
                        [0, 0]
                    ]
                ]
            }
        }

        else if(str[0].toLowerCase() == "const"){
            consts[str[1].toUpperCase()] = parseArgument(str[2])[1]
        }

        else if(str[0].toUpperCase() in OP){

            step++

            newInstruction[0] = OP[str[0].toUpperCase()]

            for(var j = 1; (j < str.length) & (j < 4); j++){
                let newArg = parseArgument(str[j])
                if(newArg.length < 2) break

                newInstruction[1][j-1] = newArg
            }
        }
        if((newInstruction[0] != null) & (newInstruction[0] != undefined)){
            code.push(newInstruction)
            continue
        }
    }

    return code
}

function parseArgument(value){
    switch(true){
        case /^-?[0-9]+$/i.test(value):
            return [0, Number(value)]
        case /^-?\b(h|0x)[0-9a-f]+$/i.test(value):
            return [0, Number(value.toLowerCase().replace("h", "0x"))]
        case /^-?\b(b|0b)[01]+$/i.test(value):
            if(value[0] == "b"){value = value.replace("b", "0b")}
            return [0, Number(value.toLowerCase())]
        case /^(r|\#)[0-9a-f]+$/i.test(value):
            return [1, Number("0x" + String(value.toLowerCase().slice(1)))]
        case (value[0] == "~"):
            let nextline = value.slice(1)
            try{
                return [0, step + Number(nextline)]
            }catch{
                return [0, step + 1] }
        case value.toUpperCase() in FLAG: return [TYPE.FLAG, FLAG[value.toUpperCase()]]
        case value.toUpperCase() in PREGS: return [TYPE.PREG, PREGS[value.toUpperCase()]]
        case value.toUpperCase() in vars: return [TYPE.REG, vars[value.toUpperCase()]]
        case value.toUpperCase() in consts: return [TYPE.CONST, consts[value.toUpperCase()]]

        case value[0] == "[" && value[value.length -1] == "]":
            switch(true){
                case /^(r|\#)[0-9a-f]+$/i.test(value.slice(1, -1)):
                    return [TYPE.LINK, Number("0x" + String(value.slice(1, -1).toLowerCase().slice(1)))]
                case Object.keys(PREGS).includes(value.slice(1, -1).toUpperCase()): return [TYPE.PLINK, PREGS[value.slice(1, -1).toUpperCase()]]
            }

        case (value.slice(0, 2) == "@!") & (value in consts):
            //console.error("blah")
            return [
                TYPE.CONST, consts[value.toUpperCase()]
            ]
        case (value.slice(0, 1) == "@") & (value.slice(1, 2) != "!") & (value in vars):
            return [
                DTYPE.REG, this.vars[value.toUpperCase()], false
            ]
        case (value.slice(0, 1) == "."):
            if(! value in points) return [TYPE.CONST, 0]
            return [
                TYPE.CONST, points[value]
            ]
        
        case value[0] == '"' && value[value.length - 1] == '"':
            return [
                TYPE.CONST, textToBin(value.slice(1, -1))
            ]
        case value[0] == "'" && value[value.length - 1] == "'":
            //console.log(value.slice(1, -1))
            return [
                TYPE.CONST, textToBin(value.slice(1, -1))
            ]

        default:
            return [
                0, 255
            ]
    }
}
