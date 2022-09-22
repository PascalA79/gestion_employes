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
        let array=[];
        let keys=Object.keys(dictionnaire);
        keys.forEach(key=>array[key]=dictionnaire[key])
        return array;
    }
}
module.exports = Utilities