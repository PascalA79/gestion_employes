class HorairePersoTableBuilder{

    static TimeIncrement = 30 * 60 * 1000;

    constructor(quarts, roles, dates, user, planchers, editShiftForm){
        this.quarts = quarts;
        this.roles = roles;
        this.dates = dates;
        this.user = user;
        this.planchers = planchers;
        this.editShiftForm = editShiftForm;
    }


    BuildTable(){
        const table = $("table");
        const hours = this.GetHours();
        for(h of hours){
            table.append(this.BuildRow(h))
        }
    }

    BuildRow(hour){
        const row = $("tr");
        for(let day of this.dates){
            const cell = this.BuildCell(day + hour);
            if(!!cell)
                row.append(cell);
        }
        return row;
    }

    BuildCell(startTime){
        const quart = this.quarts.find((quart) => quart.debut <= startTime && quart.fin > startTime);
        if(!quart) return;
        if(quart.start == startTime) return this.BuildStartCell(quart);
        return $("td");
    }

    BuildStartCell(quart){
        const role = this.roles.find((role) => role.id == quart.idRoleUtilisateur);
        // const plancher = this.planchers.find((plancher) => plancher.id = quart.idPlancher);
        const content = `${role.nom}: ${GetHourString(quart.debut)} - ${this.GetHours(quart.fin)}`;
        const cell = $("td");
        cell.text(content);
        cell.css("background-color", role.couleur);
        cell.css("font-weight", "bold");
        cell.props("rowspan", this.GetRowSpan(quart));
        cell.click(() => {
            this.editShiftForm.editShift(quart, this.user);
        })
        return cell;
    }

    GetRowSpan(quart){
        return (quart.fin - quart.debut)/HorairePersoTableBuilder.TimeIncrement;
    }

    GetDateString(date){
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
    }

    GetHourString(time){
        const d = new Date(time);
        return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes()}`;
    }

    GetHours(){
        // const increment = 30 * 60 * 1000;
        const max = 24 * 3600 * 1000;
        const lst = [];
        for(let h = 0; h < 48; ++h){
            lst.push(h * HorairePersoTableBuilder.TimeIncrement);
        }
        // for(let h = 0; h < max; h += HorairePersoTableBuilder.TimeIncrement){
        //     lst.push(h);
        // }
        return lst;
    }

    GetDays(){

    }
}