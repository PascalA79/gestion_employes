function main(){
    let currentId=-1;

    const ajaxListEmployes=new Ajax(defaultPath=location.pathname);
    const containerListe=".container.table-container-emp";
    function refreshList(container){
        $(container).empty()
        ajaxListEmployes.GET((data)=>{
            builtList(container,data);
            addEvents();
        },console.error,'get')
    }

    function builtList(container,data){
        const dataJSON=JSON.parse(data)
        listEmployes=dataJSON;
        let stringHTML=`<table>
        <thead>
            <tr>
                <td id=ajouter-emp colspan='1'>
                    +
                </td>
                <td colspan='100%'> 
                    <h1>Liste des employés</h1>
                </td>
            </tr>
            <tr>
            <td> 
                Alias
            </td>
            <td> 
                Prenom
            </td>
            <td> 
                Nom
            </td>
            <td> 
                Nom du plancher
            </td>
            <td> 
                Type de l'utilisateur
            </td>
            <td> 
                Âge
            </td>
            <td> 
                Courriel
            </td>
            <td> 
                Téléphone
            </td>
            <td> 
                Actif
            </td>
            <tbody>`
            debugger
        for(let num in dataJSON){
            let user=dataJSON[num];
            stringHTML+=`<tr class="clickable-medium" iduser=${user.id}>
                <td>
                    ${user.alias}
                </td>
                <td>
                    ${user.prenom}
                </td>
                <td>
                    ${user.nom}
                </td>
                <td>
                    ${user.nomPlancher}
                </td>
                <td>
                    ${user.nomTypeUtilisateur}
                </td>
                <td>
                    ${user.age}
                </td>
                <td>
                ${user.courriel}
                </td>
                <td>
                    ${user.telephone}
                </td>
                <td>
                    <input type="checkbox" onclick="return false;" ${user.actif?"checked":""}>
                </td>
            </tr>`;
        }

        stringHTML+="</tbody></table>"
        $(container).append($(stringHTML));
        
    }
    /*  [{id:{name},attr:{name,value}}]  */
    function addValidation(){
        $("#age").attr("min",1)
        $("#age").attr("max",150)
    }
    
    
    
    
    function envoyerMessagesErreur(data){
        const erreurName=(numero)=>{
            switch (numero) {
                case ERREUR_UTILISATEUR.OK:
                    return "ok";
                case ERREUR_UTILISATEUR.MISSING:
                    return "required";
                case ERREUR_UTILISATEUR.INVALID:
                    return "invalid";
                case ERREUR_UTILISATEUR.TOO_SHORT:
                    return "min";
                case ERREUR_UTILISATEUR.TOO_LONG:
                    return "max";
                case ERREUR_UTILISATEUR.DUPLICATE_KEY:
                    return "unique";
                case ERREUR_UTILISATEUR.UNFOUND_KEY:
                    return "unfound";    
                default:
                    return "ok"
            }
        }
        let validation;
        if(!data) {
            data=getFormData();
            validation=ValiderUtilisateur(data)
            console.log(validation)
        }
        else validation=data;
        //cacher tous les messages d'erreur pour commencer
        $(".lbl-error").attr('hidden','hidden')
        Object.entries(validation).forEach(err=>{
            let name=err[0]
            let valueName=erreurName(err[1])
            if(valueName!="ok" && name!="id")
            {
                //Trouve l'élément qui a comme input avec un certain id, remonte sur son div, puis trouve la classe correspondente
                $($(`#${name}`)[0].parentElement).find(`.${valueName}`).removeAttr("hidden")
            }
        })

    }
    addValidation()
    var listEmployes=[]
    refreshList(containerListe)

    // Get the modal
    var modal = document.querySelector(".modal-emp");





    modal.style.display = "none";
    
    function getFormData(){
        let alias=$('#alias').val();
        let prenom=$('#prenom').val();
        let nom=$('#nom').val();
        let idPlancher=parseInt($('#idPlancher').val());
        let idTypeUtilisateur=parseInt($('#idTypeUtilisateur').val());
        let telephone=$('#telephone').val();
        let age=parseInt($('#age').val());
        let courriel=$('#courriel').val();
        let actif=$('#actif').prop('checked')?1:0;
        let id=parseInt(currentId);
        let data=
        { 
            id:isNaN(id)?-1:id,
            alias:alias,
            prenom:prenom,
            nom:nom,
            idPlancher:idPlancher,
            idTypeUtilisateur:idTypeUtilisateur,
            courriel:courriel,
            age:age,
            telephone:telephone,
            actif:actif
            }
        return data
    }
    function addEvents(){
        let closer = document.getElementById("close");
        closer.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
        }
        $("#formEmp input").keyup(()=>envoyerMessagesErreur())
        $("#formEmp input[type=number]").click(()=>envoyerMessagesErreur())
        $("#formEmp select").change(()=>envoyerMessagesErreur())
        $("#formEmp input[type=checkbox]").click(()=>envoyerMessagesErreur())
        
    

        function ajouterEmp(){
            let data=getFormData()
            ajaxListEmployes.POST(data,(info)=>{
                try {
                    let validation=!Object.values(JSON.parse(info)).filter(result=>result!=ERREUR_UTILISATEUR.OK)[0]
            
                    if(validation){
                        refreshList(containerListe)
                        envoyerMessagesErreur()
                    }
                    else 
                    envoyerMessagesErreur(JSON.parse(info))

                } catch (error) {
                    console.error(error)
                }
            },console.error,"add")
            
        }
        function modifierEmp(){
            let data=getFormData()
            ajaxListEmployes.PUT(data,(info)=>{
                try {
                    let validation=!Object.values(JSON.parse(info)).filter(result=>result!=ERREUR_UTILISATEUR.OK)[0]
            
                    if(validation){
                        refreshList(containerListe)
                        envoyerMessagesErreur()
                    }
                    else 
                    envoyerMessagesErreur(JSON.parse(info))

                } catch (error) {
                    console.error(error)
                }
            },console.error,"update")
            
        }
        // Get the button that opens the modal
        var btnAdd = document.getElementById("ajouter-emp");
        // When the user clicks the button, open the modal 
        btnAdd.onclick = function() {
        modal.style.display = "block";
        envoyerMessagesErreur()
        }
        $('#ajouter-emp').click((e)=>{
            $(`#formEmp input[type=text]`).each((e,elem)=>elem.value="")
            $(`#formEmp input[type=tel]`).each((e,elem)=>elem.value="")
            $(`#formEmp input[type=number]`).each((e,elem)=>elem.value=0)
            $("#modal-title-emp").text(`Ajouter un employé`)
            modal.style.display = "block";
            $('#ok-button').text('Ajouter')
            $('#ok-button').unbind( "click" )
            $('#ok-button').click(ajouterEmp)
            envoyerMessagesErreur()

        })
        $(".clickable-medium").click(e=>{
            let idUser=$(e.target).parent('.clickable-medium').attr('iduser');
            currentId=parseInt(idUser)
            let infoEmp=(Object.values(listEmployes).filter((elem)=>elem.id==idUser))[0]
            $("#modal-title-emp").text(`Modifier ${infoEmp.alias}`)
            $("#formEmp input[type=text],#formEmp input[type=number],#formEmp input[type=tel]").each((e,elem)=>{
                $(`#formEmp #${elem.id}`).val(infoEmp[elem.id])
            })
            $("#formEmp select").each((e,elem)=>{$(elem).children().each((e,option)=>{
                if(option.value==infoEmp[elem.id]){
                    option.selected=true;
                }
            })})
            $("#formEmp input[type=checkbox]").each((e,elem)=>{
                elem.checked=infoEmp[elem.id]
            })
            modal.style.display = "block";

            $('#ok-button').text('Modifier')
            $('#ok-button').unbind( "click" )
            $('#ok-button').click(modifierEmp)
            envoyerMessagesErreur()
        })
}
}
/*
document.addEventListener('DOMContentLoaded', () => {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c,i) => slots.has(c)? j=i+1: j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i<0? prev[prev.length-1]: back? prev[i-1] || first: i;
                });
                el.value = clean(el.value).join``;
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value=""));
    }
});*/
main()