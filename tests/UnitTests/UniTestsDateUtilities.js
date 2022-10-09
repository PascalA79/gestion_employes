const DateUtilities= require('../../myapp/class/Utilities/DateUtilities')
const DateError=require('../../myapp/class/Error/DateError')
class TestUnitaire{
    constructor(f_succes=console.log,f_error=console.error){
        this.f_succes=f_succes;
        this.f_error=f_error;
    }
    test(f,...arg){
        try {
            f.apply(null,arg)
            this.f_succes(f.name)
            return 1;
        } catch (error) {
            this.f_error(f.name, error.name)
            return 0
        }
    }
}
const testUnitaire=new TestUnitaire()
testUnitaire.test(DateUtilities.getDate,1, 1, 1, 1, 'd', 2, 3);
testUnitaire.test(DateUtilities.getObj,DateUtilities.getDate(1, 1, 1, "j", 7, 2, 3))// ?

