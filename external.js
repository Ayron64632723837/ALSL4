class Port{
    constructor(id){
        this.id = id
    }

    get(address){
        return PORTS[this.id].data[address & (2**PORTS[this.id].addressbits - 1)]
    }
    set(address, value){
        return PORTS[this.id].data[address & (2**PORTS[this.id].addressbits - 1)] = value & (2**PORTS[this.id].databits - 1)
    }
}

class Disk{
    constructor(id){
        this.id = id
        this.page = 0
    }

    get(address){
        if(address == 0){
            return this.page
        }
        return PORTS[this.id].data[address & (2**PORTS[this.id].addressbits - 1)]
    }
    set(address, value){
        if(address == 0){
            return this.page = value & (2**PORTS[this.id].pagebits - 1)
        }
        return PORTS[this.id].data[address & (2**PORTS[this.id].addressbits - 1)] = value & (2**PORTS[this.id].databits - 1)
    }
}

PORTS = {

}

port = {
    databits: 8,
    addressbits: 8,
    pagebits: 8,
    type: 0,
    data: [/*...*/]
}

const portChange = {
    name(port, name){
        if(!Object.keys(PORTS).includes(port)){
            PORTS[name] = {databits: 8, addressbits: 8, pagebits: 8, data: [/*...*/]}
        }else{
            PORTS[name] = {...PORTS[port]}
            delete(PORTS[port])
        }
    },

    variable(port, vartochange, val){
        if(!Object.keys(PORTS).includes(port)){
            PORTS[port] = {databits: 8, addressbits: 8, pagebits: 8, data: [/*...*/]}
        }
        switch(vartochange){
            case 0:
                PORTS[port].databits = val
                break;
            case 1:
                PORTS[port].addressbits = val
                break;
            case 2:
                PORTS[port].pagebits = val
                break;
            case 3:
                PORTS[port].typed4ferdc = val
                break;
        }
    }
}

const portData = {
    load(port){
        var input = document.createElement('input')
        input.type = 'file'
        input.accept = 'bin'
        
        input.onchange = e => { 
        
            var file = e.target.files[0]

            let ext = file.name.split('.').pop()

            reader.readAsArrayBuffer(file)
        }
        
        var reader = new FileReader()

        reader.onload = readerEvent => {
            var buffer = new Uint8Array(reader.result)
            
            if(!Object.keys(PORTS).includes(port)){
                PORTS[port] = {databits: 8, addressbits: 8, pagebits: 8, data: [/*...*/]}
            }
            let l = 2 ** PORTS[port].databits

            for(let i = 0; i < l; i++){
                if(i >= buffer.length){
                    PORTS[port].data[i] = 0
                }else{
                    PORTS[port].data[i] = buffer[i]
                }
            }
        }
        
        input.click();
    }
}