export default class Storage {

    save(item: string, data: string){
        localStorage.setItem(item, data)
    }

    clear(){
        localStorage.clear()
    }

    get(item: string){
        return localStorage.getItem(item)
    }
}

