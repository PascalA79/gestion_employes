// transforme un dictionnaire en tableau avec comme index, les clés en sachant les clés en avance
class Utilities{
    static getValidArray(dictionnaire,...keys){
        let array=[];
        keys.forEach(key=>{
            if(!dictionnaire[key]) return false;
            array[key]=dictionnaire[key];
        })
        return array;
    }
    // transforme un dictionnaire en tableau avec comme index
    static getArray(dictionnaire){
        if(!dictionnaire) return undefined
        let array=[];
        let keys=Object.keys(dictionnaire);
        keys.forEach(key=>array[key]=dictionnaire[key])
        return array;
    }
    static assiativeArrayToDict(array){
        if(typeof array != typeof (new Object())){
            return array
        }
        let entries=Object.entries(array)
        let dict={}
        entries.forEach((elem)=>dict[elem[0]]=Utilities.assiativeArrayToDict(elem[1]))
        return dict;
    }


    static getArrayFromKeys(dictionnaire, ...keys){
        let array=[];
        keys.forEach(key=>{
            if(!!dictionnaire[key]);
                array[key]=dictionnaire[key];
        })
        return array;
    }
}
module.exports = Utilities