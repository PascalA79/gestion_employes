function main(){
    const ajaxPlancher=new Ajax(defaultPath=location.pathname);
    const idFormPlancher="form-plancher";
    
    function refreshList(container){
        $(container).empty()
        ajaxListEmployes.GET((data)=>{
            builtList(container,data);
            addEvents();
        },console.error,'get')
    }
}
