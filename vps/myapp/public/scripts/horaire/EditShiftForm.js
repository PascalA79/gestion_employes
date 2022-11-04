class EditShiftForm{
    constructor(form, inputName, inputShiftStart, inputShiftEnd, selectRole, btnSend, btnCancel, btnDelete, errorStart, errorEnd, errorRole, idQuartTravail, idPlancher, idUtilisateur, confirme, confirmMsg, url){
        this.form = form;
        this.inputName = inputName;
        this.inputShiftStart = inputShiftStart;
        this.inputShiftEnd = inputShiftEnd;
        this.selectRole = selectRole;
        this.btnSend = btnSend;
        this.btnCancel = btnCancel;
        this.oldShift = null;
        this.user = null;
        this.errorStart = errorStart;
        this.errorEnd = errorEnd;
        this.errorRole = errorRole;
        this.idQuartTravail = idQuartTravail;
        this.idPlancher = idPlancher;
        this.idUtilisateur = idUtilisateur;
        this.confirme = confirme;
        this.confirmMsg = confirmMsg;
        this.btnDelete = btnDelete;
        this.url = url;

        this.btnCancel.click((e) => {
            e.preventDefault();
            this.empty();
            this.hide();
        })

        this.selectRole.change((e) => {
            this.setRole();
        })

        this.btnDelete.click((e) => {
            e.preventDefault();
            this.deleteShift();
        })
    }
    
    setRole(){        
        const jsonStr = this.selectRole.find(":selected").eq(0).attr("data-role");
        if(!!jsonStr){
            const json = JSON.parse(jsonStr);
            if(!!json){
                this.selectRole.css("background-color", json.couleur);
                this.selectRole.css("color", "black");
                return ;
            }
        }
        this.selectRole.css("background-color", "");
        this.selectRole.css("color", "");
    }

    fillRoles(roles){
        console.log(roles);
        const selectedRole = this.selectRole.val()
        this.selectRole.empty();
        for(let role of roles){
            this.selectRole.append(`<option value=${role.id} ${selectedRole == role.id ? "selected" : ""} style="background-color: ${role.couleur}; color: black;" data-role=${JSON.stringify(role)}>${role.nom}</option>`);
        }
        this.setRole();
    }

    show(){
        $("#edit-shift-modal").modal("show");
    }

    hide(){
        $("#edit-shift-modal").modal("hide");
    }

    fillShift(name, start, end, roleId){
        this.inputName.val(name);
        this.fillDate(this.inputShiftStart, start);
        this.fillDate(this.inputShiftEnd, end);
        this.selectRole.val(roleId);
        this.setRole();
    }

    fillDate(input, date){
        if(!!date){
            let maDate = new Date(date.getTime());
            // maDate.setMinutes(maDate.getMinutes() - maDate.getTimezoneOffset());
            //maDate.setMinutes(maDate.getMinutes() - maDate.getTimezoneOffset());
            input.val(maDate.toISOString().slice(0, 16));
        } else {
            console.log("emptyDate");
            input.val("");
        }
    }

    empty(){
        this.oldShift = null;
        this.user = null;
        this.fillShift("", null, null, -1);
        this.fillErrors({});
        this.fillMsg();
        this.fillHidden({});
    }

    fillHidden({idQuartTravail="", idPlancher="", idUtilisateur="", confirme=""}){
        this.idQuartTravail.val(idQuartTravail);
        this.idPlancher.val(idPlancher);
        this.idUtilisateur.val(idUtilisateur);
        this.confirme.val(confirme);
    }
    
    fillErrors({errorStart="", errorEnd="", errorRole=""}){
        this.fillErrorLabel(this.errorStart, errorStart);
        this.fillErrorLabel(this.errorEnd, errorEnd);
        this.fillErrorLabel(this.errorRole, errorRole);
    }

    fillMsg(message = ""){
        this.fillErrorLabel(this.confirmMsg, message);
    }

    fillErrorLabel(label, errorText){
        label.text(errorText);
        if(!!errorText) label.show();
        else label.hide();
    }

    addNewShift(user, start, end){
        this.empty();
        this.btnSend.val("Ajouter");
        this.user = user;
        this.fillShift(this.getFullName(user), start, end);
        console.log(user);
        this.fillHidden({idUtilisateur: user.id, idPlancher: user.idPlancher});
        this.show();
    }

    addShift(ws, user){
        this.empty();
        this.btnSend.val("Ajouter");
        this.user = user;
        this.fillShift(this.getFullName(user), new Date(ws.debut), new Date(ws.fin), ws.idRoleUtilisateur);
        this.fillHidden(ws);
        this.show();
    }

    editShift(ws, user){
        this.empty();
        console.log(ws);
        this.btnSend.val("Modifier");
        this.user = user;
        this.oldShift = ws;
        this.fillShift(this.getFullName(user), new Date(ws.debut), new Date(ws.fin), ws.idRoleUtilisateur);
        this.fillHidden(ws);
        this.show();
    }

    getFullName(user){
        return `${user.prenom} ${user.nom}`;
    }

    deleteShift(){
        $.ajax({
            url: this.url,
            type: "DELETE",
            data: {idQuartTravail: this.oldShift.idQuartTravail},
            success: () => {location.reload()}
        })
    }
}