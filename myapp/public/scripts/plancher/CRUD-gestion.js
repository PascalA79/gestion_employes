
function main(){
    const ajaxGestion=new Ajax(defaultPath=location.pathname);
    const idFormPlancher="form-gestion";
    function builtList(container,data){
        const dataJSON=JSON.parse(data)
        listGestion=dataJSON;

        erreurNomPlancher=[
            {name:"required",value:"Requis"},
            {name:"invalid",value:"Invalide"},
            {name:"min",value:"Trop court"},
            {name:"max",value:"Trop Long"},
            {name:"unique",value:"Doit être unique"}
        ]
        $(container).empty()
        let stringHTML=`<div class="table-container-gestion">
        <table>
            <thead>
                <tr>
                    <th colspan="100%">
                        <h1>Gestion des planchers</h1>
                    </th>
                </tr>
                <tr>
                    <th>Plancher</th>
                    <th>Superviseurs</th>
                    <th>Confirmation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                    <div class="nom-plancher">
                    <select id="planchers" name="planchers">`;
                    dataJSON.planchers.forEach((plancher)=>{
                        stringHTML+=`<option value="${plancher.idPlancher}" idplancher="${plancher.idPlancher}">${plancher.nomPlancher}</option>`
                    });
                    stringHTML+=`<option value="ajouter" idplancher="-1">Ajouter</option></select><br>
                    <label for="nomPlancher">Nom du plancher</label>
                    <input id="nomPlancher" value=""/>`;
                    erreurNomPlancher.forEach(error=>{
                        stringHTML+=`<div class="lbl-error ${error.name}" hidden>
                        ${error.value}</div>`
                    })
                    stringHTML+=`</div>
                    </td>
                    <td>
                        <table id="superviseurs"> `
                        Object.entries(dataJSON.organisation).forEach((superviseur)=>{
                            stringHTML+=`
                            <tr>    
                                <td><label for="${superviseur[0]}">${superviseur[0]}</label></td>
                                    <td><input id="${superviseur[0]}" type="checkbox"  idsuperviseur="${superviseur[1]["idUtilisateur"]}" /></td>
                                    <td><select>`
                                    superviseur[1]["planchers"].forEach((plancher)=>{
                                        stringHTML+=`<option value="${plancher["idPlancher"]}">${plancher["nomPlancher"]}</option>`
                                    })
                                       stringHTML+=` </select>
                                    </td>
                            </tr>`
                            })
                            stringHTML+=`
                            </tr>            
                        </table>
                        
                    <td>
                    <div class="buttons_confirmation_plancher">
                        <button id="appliquer_plancher">Appliquer</button>
                        <button id="annuler_plancher">Annnuler</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`;
    $(container).append($(stringHTML))
    $("#form-plancher select")
    const autoCompleteForm=(idPlancher)=>{
        let checkboxes=$("input[type=checkbox]")
        checkboxes.prop( "checked", false );
        currentPlancher=idPlancher;
        if(!isFinite(idPlancher) ){
            //trouver le max pour sélectionner le derner id inséré
            //currentPlancher=
            idPlancher=currentPlancher
        }
        if(idPlancher!=-1){
            $("#nomPlancher").val(listGestion.planchers.filter((p)=>p.idPlancher==idPlancher)[0]["nomPlancher"])
            $("#appliquer_plancher").text("Appliquer")
        }
        else{
            $("#appliquer_plancher").text("Ajouter")
            $("#nomPlancher").val("")
        }
        Object.entries(dataJSON.organisation).forEach((user)=>{
            let planch=Object.entries(user[1])[1][1].map(x=>x.idPlancher)
            if(planch.includes(parseInt(idPlancher))){
                $("#"+user[0]).prop( "checked", true );
            }
        })
    }
    autoCompleteForm($($("#planchers option:selected")[0]).attr("idPlancher"))
    $("#planchers").change(()=>{
        currentPlancher=$($("#planchers option:selected")[0]).attr("idPlancher");
        autoCompleteForm(currentPlancher)
    })
}
function getFormData(){
    let plancher_checked=$("input[type=checkbox]:checked").map((e,elem)=>$(elem).attr("idsuperviseur")).toArray()
    let data={}
    data["superviseurs"]=plancher_checked;
    data["idPlancher"]=currentPlancher;
    data["nomPlancher"]=$("#nomPlancher").val();
    return data;

}
function addEvents(){
    $("#annuler_plancher").unbind("click")
    $("#appliquer_plancher").unbind("click")
    $("#annuler_plancher").click(()=>refreshList(idFormPlancher))
    $("#appliquer_plancher").click(()=>{
        let data=getFormData();
        let validate=ValiderPlancher(data)

        let validation=!Object.values(validate).filter(result=>result!==ERREUR_PLANCHER.OK)[0]
        if(validation){
            if(currentPlancher!=-1){
                ajaxGestion.PUT(data,(dataValidate)=>{
                    if(!envoyerMessagesErreur(JSON.parse(dataValidate))){
                        refreshList("#"+idFormPlancher)
                    }
                },console.error,"update")
            }
            else
            ajaxGestion.POST(data,(dataValidate)=>{
                if(!envoyerMessagesErreur(JSON.parse(dataValidate))){
                    refreshList("#"+idFormPlancher)
                }
            },console.error,"add")
            }
        })
        $("#nomPlancher").keyup(()=>{
            envoyerMessagesErreur();
        })
    };
    function envoyerMessagesErreur(data){
        let retour=0;
        const erreurName=(numero)=>{
            switch (numero) {
                case ERREUR_PLANCHER.OK:
                    return "ok";
                case ERREUR_PLANCHER.MISSING:
                    return "required";
                case ERREUR_PLANCHER.INVALID:
                    return "invalid";
                case ERREUR_PLANCHER.TOO_SHORT:
                    return "min";
                case ERREUR_PLANCHER.TOO_LONG:
                    return "max";
                case ERREUR_PLANCHER.DUPLICATE_KEY:
                    return "unique";
                case ERREUR_PLANCHER.UNFOUND_KEY:
                    return "unfound";    
                default:
                    return "ok"
            }
        }
        let validation;
        if(!data) {
            data=getFormData();
            validation=ValiderPlancher(data)
            //console.log(validation)
        }
        else validation=data;
        //cacher tous les messages d'erreur pour commencer
        $(".lbl-error").attr('hidden','hidden')
        Object.entries(validation).forEach(err=>{
            let name=err[0]
            let valueName=erreurName(err[1])
            if(valueName!="ok")
            {
                //Trouve l'élément qui a comme input avec un certain id, remonte sur son div, puis trouve la classe correspondente
                $($(`#${name}`)[0].parentElement).find(`.${valueName}`).removeAttr("hidden")
                retour=1
            }
        })
        return retour;
    }
    function refreshList(container){
        ajaxGestion.GET((data)=>{
            let oldPlancher=currentPlancher
            builtList(container,data);
            addEvents();
            if((oldPlancher==-1)){
                oldPlancher=listGestion.planchers.map(e=>parseInt(e.idPlancher)).filter(e=>!isNaN(e)).sort((a,b)=>b-a)[0]
            }
            if(oldPlancher!=null){
                $("#planchers").val(oldPlancher);
                $("#planchers").change()
            }
        },console.error,"get")
    }
    var currentPlancher=null;
    refreshList("#"+idFormPlancher)
}
main()
