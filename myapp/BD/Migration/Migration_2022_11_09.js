const Utilities = require("../../class/Utilities");
const QuartTravail = require("../../model/QuartTravail");

module.exports.Migrate = async function Migrate(connexion){
    const quarts = await GetAllQuarts(connexion);
    // ChangeTable(connexion);
    const newQuarts = quarts.map(UpdateQuart);
    // InsertQuarts(connexion, newQuarts);
    LogQuarts(newQuarts);
    // ExportQuarts(newQuarts, "export.json");
    ExportAddQuarts(newQuarts, "export.txt");
}


async function GetAllQuarts(connexion){
    const quarts = await connexion.excecuteSync("SELECT * FROM QuartsTravail");
    Utilities.getArray(quarts).map(x=>Utilities.getArray(x));
    return quarts;
}


// async function ChangeTable(connexion){
//     // connexion.excecuteSync("CREATE OR REPLACE TABLE `QuartsTravail2` (`idQuartTravail` int(11) NOT NULL,`idPlancher` int(11) NOT NULL,`idUtilisateur` int(11) NOT NULL,`idRoleUtilisateur` int(11) NOT NULL,`debut` INT NOT NULL,`fin` INT NOT NULL,`confirme` bit(1) NOT NULL DEFAULT b'0') ;")
// }

function UpdateQuart(quart){
    // console.log(quart);
    quart.debut = UpdateDate(quart.debut);
    quart.fin = UpdateDate(quart.fin);
    return new QuartTravail(quart);
}

function UpdateDate(date){
    return Date.parse(date);
}

function InsertQuarts(connexion, quarts){

}

function LogQuarts(quarts){
    for(q of quarts){
        console.log(JSON.stringify(q));
    }
}

function ExportQuarts(quarts, filePath){
    const fs = require("fs");
    fs.writeFileSync(filePath, JSON.stringify(quarts));
}

function ExportAddQuarts(quarts, filePath){
    const fs = require("fs");
    const writer = fs.createWriteStream(filePath, {autoClose: true});
    writer.write("Allo");
    writer.write("\n");
    for(q of quarts){
        //AddQuartTravail(idPlancher, idUtilisateur, idRoleUtilisateur, debut, fin, confirme)
        writer.write(`CALL AddQuartTravail(${q.idPlancher}, ${q.idUtilisateur}, ${q.idRoleUtilisateur}, ${q.debut}, ${q.fin}, ${q.confirme});\n`);
    }
}

