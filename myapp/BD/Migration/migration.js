const ConnectionMYSQL = require("../../class/ConnectionMYSQL");
const config = require("config");
const { Migrate } = require("./Migration_2022_11_09");

async function doSomething(){
    const connexion = new ConnectionMYSQL({
        host: "127.0.0.1",
        user: "root",
        password: "DrCozmo138",
        database : "projet"
    });
    // const connexion = new ConnectionMYSQL({
    //     host: config.get("dbserver.host"),
    //     user: config.get("dbserver.user"),
    //     password: config.get("dbserver.password"),
    //     database :config.get("dbserver.database")
    // });
    // console.log(config);
    const res = await Migrate(connexion);
    // console.log(promise);
    connexion.end();
    return false;
};

doSomething().then((res) => console.log("Finis"))


