function main(){
    const ajaxProfil=new Ajax(defaultPath=location.pathname);
    const idInfoProfil="infoEmploye";
    const idFormProfil="formEmploye";
    const validationLoginText = this.loginValidation.getPasswordValidationText;
    const validationLoginCode = this.loginValidation.validatePassword;
    refreshList("#"+idInfoProfil)
    function refreshList(selecteur){
        ajaxProfil.GET((data)=>{
            $(selecteur).empty()
            let dataJSON = JSON.parse(data)
            console.log(dataJSON)
            let stringHTML=`
            <div>
                <h1>Votre profil</h1>
            </div>
            <div>
                <label>Alias</label><input type="text" readonly value="${dataJSON.alias}">
            </div>
            <div>
                <label>Prénom</label><input type="text" readonly value="${dataJSON.prenom}">
            </div>
            <div>
                <label>Nom</label><input type="text" readonly value="${dataJSON.nom}">
            </div>
            <div>
                <label>Nom du plancher</label><input type="text" readonly value="${dataJSON.nomPlancher}">
            </div>
            <div>
                <label>Type d'utilisateur</label><input type="text" readonly value="${dataJSON.nomTypeUtilisateur}">
            </div>
            <div>
                <label>Numéro de téléphone</label><input type="tel"  readonly value="${dataJSON.telephone}">
            </div>
            <div>
                <label>Courriel</label><input type="text" readonly value="${dataJSON.courriel}">
            </div>
            `
            $(selecteur).append(stringHTML)
            
        },
        console.error,"get")
    }
    window.window.iSubmit=0;
    $("#newPassword").keyup(function(){
        if(window.iSubmit) $(".newPassword").text(validationLoginText($(this).val()))
        if($("#newPassword").val()=="") window.iSubmit=0
    })
    $("#confirmPassword,#newPassword").keyup(
    function(){
        if($("#confirmPassword").val()!="" && window.iSubmit && $("#newPassword").val()!=$("#confirmPassword").val()){
            $("#confirmation").text("Les mots de passes doivent correspondre")
        }
        else{
            $("#confirmation").text("")
            $(".lbl-confirm").empty()
    }})
    $(`#${idFormProfil}`).submit(function(e){
        e.preventDefault()
        window.iSubmit=1
        if(validationLoginCode($("#newPassword").val()) ==0 && $("#confirmPassword").val()==$("#newPassword").val()){
            ajaxProfil.POST({newPassword:this[0].value},data=>{
                if(data.error==0){
                    window.iSubmit=0
                    $(".lbl-error").empty()
                    $(".lbl-confirm").text("Mot de passe modifié")
                }
                else{
                    $("#confirmPassword,#newPassword").keyup()
                }
                

            },console.error,"./change_password")
        }
        else{
            $("#confirmPassword,#newPassword").keyup()

        }
    })
    
}
main()