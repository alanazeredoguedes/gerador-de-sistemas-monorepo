
const sessionStorage = {
    set(key, value){
        value ? window.sessionStorage[key] = value : this.remove(key)
        //return window.sessionStorage[key]
    },
    get(key, defaultValue = null){
        return window.sessionStorage[key] || defaultValue
    },
    setObject(key, value){
        window.sessionStorage[key] = JSON.stringify(value)
        return this.getObject(key)
    },
    getObject(key){
        return JSON.parse(window.sessionStorage[key] || null)
    },
    remove(key){
        window.sessionStorage.removeItem(key)
    }


}

export default sessionStorage