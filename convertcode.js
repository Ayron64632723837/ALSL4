const convertCode = {
    toPureALSL4(raw){
        let c = lex(raw)[0]
        let result = ""
        for(let i of c){
            result += getKeyByValue(OP, i[0], "LNP").toLowerCase()
            for(let j = 0; j < i[1].length; j++){
                result += ` ${getArgumentALSLRepresentation(i[1][j][0], i[1][j][1])}`
            }
            result += "\n"
        }

        return result
    }
}

function getKeyByValue(obj, val, def){
    for(let i of Object.keys(obj)){
        if(obj[i] == val) return i
    }
    return def
}

function getArgumentALSLRepresentation(type, value){
    switch(type){
        case TYPE.CONST:
            return String(value)
        case TYPE.REG:
            abl = Number(document.getElementById('abs').value)
            return `#${value.toString(16).padStart(Math.ceil(abl / 4) - (abl < 5), "0")}`
        case TYPE.PREG:
            return getKeyByValue(PREGS, value)
        case TYPE.FLAG:
            return getKeyByValue(FLAG, value)
        case TYPE.LINK:
            abl = Number(document.getElementById('abs').value)
            return `[${value.toString(16).padStart(Math.ceil(abl / 4) - (abl < 5), "0")}]`
        case TYPE.PLINK:
            return `[#${getKeyByValue(PREGS, value)}]`
        default: return "0"
    }
}