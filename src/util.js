export function add(a=0,b=0) {
    
    if(!b){
        return a
    }
    return a+b
}

export function swap(array) {
    if(array.length!==2){
        return array
    }

    return [array[1],array[0]]

}
