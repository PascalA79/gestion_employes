class EditShiftForm{
    constructor(form, inputName, inputShiftStart, inputShiftEnd, selectRole, btnSend, btnCancel){
        this.form = form;
        this.inputName = inputName;
        this.inputShiftStart = inputShiftStart;
        this.inputShiftEnd = inputShiftEnd;
        this.selectRole = selectRole;
        this.btnSend = btnSend;
        this.btnCancel = btnCancel;
        this.oldShift = null;
        this.user = null;

        this.btnCancel.click((e) => {
            e.preventDefault();
            this.empty();
            this.hide();
        })

        this.selectRole.change((e) => {
            this.setRole();
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
        if(this.form.attr("class").includes("collapse"))
            this.form.removeClass("collapse")
    }

    hide(){
        if(!this.form.attr("class").includes("collapse"))
        this.form.addClass("collapse")
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
            maDate.setMinutes(maDate.getMinutes() - maDate.getTimezoneOffset());
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
    }

    addNewShift(user, start, end){
        this.empty();
        this.form.attr("method", "post");
        this.btnSend.val("Créer");
        this.user = user
        this.fillShift(this.getFullName(user), start, end);
        this.show();
    }

    editShift(ws, user){
        this.empty();
        this.form.attr("method", "put");
        this.btnSend.val("Modifier");
        this.user = user;
        this.oldShift = ws;
        this.fillShift(this.getFullName(user), new Date(ws.start), new Date(ws.end), ws.idRoleUtilisateur);
        this.show();
    }

    getFullName(user){
        return `${user.prenom} ${user.nom}`;
    }

}