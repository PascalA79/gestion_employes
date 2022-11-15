

const ajaxListEmployes=new Ajax(defaultPath=location.pathname);
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
            <td colspan='7'> 
                <h1>Liste des employés</h1>
            </td>
            <td id=ajouter-emp colspan='2'>
                +
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
                <input type="checkbox" disabled ${user.actif?"checked":""}>
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



function envoyerMessagesErreur(){

    let data=getFormData();
    if(!isFinite(data.alias)) $("#alias + .lbl-error").attr('hidden','hidden');
    else $("#alias + .lbl-error").removeAttr('hidden');
    if(!isNaN(parseInt(data.age))) $("#age + .lbl-error").attr('hidden','hidden');
    else $("#age + .lbl-error").removeAttr('hidden');
    if([0,1].includes(data.actif)) $("#actif + .lbl-error").attr('hidden','hidden');
    else $("#actif + .lbl-error").removeAttr('hidden');
    if(!isFinite(data.courriel)) $("#courriel + .lbl-error").attr('hidden','hidden');
    else $("#courriel + .lbl-error").removeAttr('hidden');
    if(!isFinite(data.idPlancher)) $("#idPlancher + .lbl-error").attr('hidden','hidden');
    else $("#idPlancher + .lbl-error").removeAttr('hidden');
    if(!isFinite(data.idTypeUtilisateur)) $("#idTypeUtilisateur + .lbl-error").attr('hidden','hidden');
    else $("#idTypeUtilisateur + .lbl-error").removeAttr('hidden');
    if(!isFinite(data.nom)) $("#nom + .lbl-error").attr('hidden','hidden');
    else $("#nom + .lbl-error").removeAttr('hidden');
    if(!isFinite(data.prenom)) $("#prenom + .lbl-error").attr('hidden','hidden');
    else $("#prenom + .lbl-error").removeAttr('hidden');
    if(!isNaN(parseInt(data.telephone))) $("#telephone + .lbl-error").attr('hidden','hidden');
    else $("#telephone + .lbl-error").removeAttr('hidden');
}
addValidation()
var listEmployes=[]
refreshList('.container.table-container-emp')

// Get the modal
var modal = document.querySelector(".modal-emp");





modal.style.display = "none";
function getFormData(){
    let alias=$('#alias').val();
    let prenom=$('#prenom').val();
    let nom=$('#nom').val();
    let idPlancher=$('#nomPlancher').val()
    let idTypeUtilisateur=$('#nomTypeUtilisateur').val();
    let telephone=$('#telephone').val();
    let age=$('#age').val();
    let courriel=$('#courriel').val();
    let actif=$('#actif').prop('checked')?1:0;
    let data=
    { 
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
      $("#formEmp input").keyup(envoyerMessagesErreur)
      $("#formEmp select").change(envoyerMessagesErreur)
      $("#formEmp input[type=checkbox]").click(envoyerMessagesErreur)
      
   

    function ajouterEmp(){
        let data=getFormData()
        ajaxListEmployes.POST(data,console.log,console.error,"add")
    }
    function modifierEmp(){
        let data=getFormData()
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
        $(`#formEmp input[type=number]`).each((e,elem)=>elem.value=0)
        $("#modal-title-emp").text(`Ajouter un employé`)
        modal.style.display = "block";
        $('#ok-button').text('Ajouter')
        $('#ok-button').click(ajouterEmp)
        envoyerMessagesErreur()

    })
    $(".clickable-medium").click(e=>{
        let idUser=$(e.target).parent('.clickable-medium').attr('iduser');
        
        let infoEmp=(Object.values(listEmployes).filter((elem)=>elem.id==idUser))[0]
        $("#modal-title-emp").text(`Modifier ${infoEmp.alias}`)
        $("#formEmp input[type=text],#formEmp input[type=number]").each((e,elem)=>{
            $(`#formEmp #${elem.id}`).val(infoEmp[elem.id])
        })
        $("#formEmp select").each((e,elem)=>{$(elem).children().each((e,option)=>{

            if(option.text==infoEmp[elem.id]){
                option.selected=true;
            }
        })})
        $("#formEmp input[type=checkbox]").each((e,elem)=>{
            elem.checked=infoEmp[elem.id]
        })
        modal.style.display = "block";

        $('#ok-button').text('Modifier')
        $('#ok-button').click(modifierEmp)
        envoyerMessagesErreur()
    })
}