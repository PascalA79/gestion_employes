const AllTests = {};


AllTests["login.js"] = require("../../myapp/public/scripts/login").unitTests;




Object.keys(AllTests).forEach(fileName =>{
    console.log(`${fileName} Unit tests`);
    console.log("_________________________________________");
    let unitTests = AllTests[fileName];
    Object.keys(unitTests).forEach(functionName => {
        let functionTests = unitTests[functionName];
        Object.keys(functionTests).forEach(testCase => {
            console.log(`${functionTests[testCase]() ? "OK  " : "FAIL"}:: ${functionName} - ${testCase}`)
        })
    })
    console.log("_________________________________________");
});