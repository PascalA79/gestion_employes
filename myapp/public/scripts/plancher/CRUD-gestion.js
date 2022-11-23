function main(){
    const ajaxGestion=new Ajax(defaultPath=location.pathname);
    const idFormPlancher="form-gestion";
    function builtList(container,data){
        const dataJSON=JSON.parse(data)
        listGestion=dataJSON;

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
                    stringHTML+=`<option value="ajouter" idplancher="-1">Ajouter</option></select>
                    <label for="newName">Nom du plancher</label>
                    <input id="newName" value=""/>
                    </div>
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
        if(currentPlancher!=-1){
            $("#newName").val(listGestion.planchers.filter((p)=>p.idPlancher==currentPlancher)[0]["nomPlancher"])
            $("#appliquer_plancher").text("Appliquer")
        }
        else{
            $("#appliquer_plancher").text("Ajouter")
            $("#newName").val("")
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
        autoCompleteForm($($("#planchers option:selected")[0]).attr("idPlancher"))
    })
}
function addEvents(){
    $("#annuler_plancher").unbind("click")
    $("#appliquer_plancher").unbind("click")
    $("#annuler_plancher").click(()=>refreshList(idFormPlancher))
    $("#appliquer_plancher").click(()=>{
        let plancher_checked=$("input[type=checkbox]:checked").map((e,elem)=>$(elem).attr("idsuperviseur")).toArray()
        console.log(plancher_checked)
        console.log(listGestion)
        let data={}
        data["planchers"]=plancher_checked;
        data["idPlancher"]=currentPlancher;
        data["nomPlancher"]=$("#newName").val();
        if(currentPlancher!=-1){
            ajaxGestion.PUT(data,()=>{
                refreshList("#"+idFormPlancher)
            },console.error,"update")
        }
        else
        ajaxGestion.POST(data,()=>{
            refreshList("#"+idFormPlancher)
        },console.error,"add")
        })
    };
    function refreshList(container){
        ajaxGestion.GET((data)=>{
            builtList(container,data);
            addEvents();
        },console.error,"get")
    }
    var currentPlancher=null;
    refreshList("#"+idFormPlancher)
}
main()
