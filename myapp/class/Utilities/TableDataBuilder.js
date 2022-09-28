const DateUtilities = require('./DateUtilities');
module.exports.BuildPlancherTableData = 
    function BuildPlancherTableData(day, users, roles){
        const hours = DateUtilities.getHours(DateUtilities.getObj(day));
        const data = [];
        for(user of users){
            data.push(BuildUserRowData(hours, day, user, roles));
        }
        data.push(BuildHoursRow(hours));
        return data
    }
    
    function BuildHoursRow(hours){
        const rowData = hours.map(BuildHourCell);
        return [BuildEmptyCell(), ...rowData];
    }

    function BuildUserRowData(hours, day, user, roles){
        const rowData = [];
        rowData.push(BuildUserCell(user, day));
        const shifts = user.quarts.map(q => 
            {return {...q, start: DateUtilities.getDateObj(q.start), end: DateUtilities.getDateObj(q.end)}});
        for (h of hours){
            const currentShift = shifts.find((s) => DateUtilities.isInSpan(h, s.start, s.end));
            if(!currentShift) rowData.push(BuildEmptyCell());
            else if (currentShift.start.getTime() == h.getTime()) rowData.push(BuildShiftCell(currentShift, roles));
        }
        return rowData;
    }

    function BuildHourCell(hour){
        return {content: DateUtilities.dateToHoursString(hour)};
    }
    
    function BuildUserCell(user, day){
        const cell = {};
        cell.content= `${user.prenom} ${user.nom}`
        cell.id = user.id
        cell.attributes = {class: "clickable-dark tuile-sm"};
        cell.attributes.onClick = `window.location.href = '/horaire-perso?id=${user.id}&date=${DateUtilities.dateToDateString(day)}'`;
        return cell;
    }
    
    function BuildEmptyCell(){
        return {content: " "};
    }
    
    function BuildShiftCell(workShift, roles){
        const shiftCell = {};
        const role = GetRole(workShift.idRoleUtilisateur, roles);
        shiftCell.id = workShift.id
        // shiftCell.attributes = {colspan: 2 * DateUtilities.getDurationH(workShift)};
        shiftCell.attributes = BuildShiftAttributes(workShift, role)
        // shiftCell.contentAttributes = BuildShiftAttributes(workShift, role)
        shiftCell.content = GetShiftText(workShift, role)
        return shiftCell;
    }

    
    function BuildShiftAttributes(workShift, role){
        const attributes = {};
        attributes.colspan = 2 * DateUtilities.getDurationH(workShift);
        attributes.style = `background-color: ${role.couleur}; font-weight: bold;`;
        // attributes.class = "tuile-sm";
        return attributes;
    }
    
    function GetRole(id ,roles){
        return roles.find(r => r.id == id);
    }

    function GetShiftText(workShift, role){
        if(DateUtilities.areSameDay(workShift.start, workShift.end))
            return `${role.nom}: ${DateUtilities.dateToHoursString(workShift.start)} - ${DateUtilities.dateToHoursString(workShift.end)}`
        return `${role.nom}: ${DateUtilities.dateToFullDateString(workShift.start)} - ${DateUtilities.dateToFullDateString(workShift.end)}`
    }
    