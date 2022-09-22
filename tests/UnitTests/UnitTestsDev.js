const AllTests = {};


AllTests["login.js"] = require("../gui/html/scripts/login").unitTests;



let errorsTotal = 0;
Object.keys(AllTests).forEach(fileName =>{
    let errorsFile = 0;
    let unitTests = AllTests[fileName];
    Object.keys(unitTests).forEach(functionName => {
        let errorsFunction = 0;
        let functionTests = unitTests[functionName];
        Object.keys(functionTests).forEach(testCase => {
            let result = functionTests[testCase]()
            if(!result){
                console.log(`FAIL:: ${fileName} - ${functionName} - ${testCase}`);
                errorsFunction++;
                errorsFile++;
                errorsTotal++;
            }
        });
        if(errorsFunction > 0)
            console.log(`${functionName} errors: ${errorsFunction}`)
    })
    console.log(`${fileName} errors: ${errorsFile}`)
});
console.log(`TOTAL ERRORS: ${errorsTotal}`);
