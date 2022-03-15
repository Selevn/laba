import * as fs from "fs";

let data = JSON.parse(fs.readFileSync('./database.json').toString())

export const get = () => {
    return data;
}
export const getByName = (n) => {
    return data.find(item=>item.name===n);
}
export const add = (item) => {
    data.push({name: item?.name || "", phone: item?.phone || ""});
    return item
}

export const del = (item) => {
    data = data.filter(unit => unit.name !== item?.name)
    return item;
}

export const update = (item) => {
    data = data.map(i => {
        if(i.name === item?.prevName){
            return {
                name: item.name|| '',
                phone: item.phone|| ''
            }
        }
        return i
    })
    return item;
}

export const save = () => {
    fs.writeFile('./database.json', JSON.stringify(data), ()=>{})
}

setInterval(()=>{
    save()
}, 30000)

