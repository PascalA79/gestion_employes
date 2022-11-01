class TableBuilder{
    static BuildPlancherTableData(day, users, roles){
        const hours = DateUtilities.getHours(DateUtilities.getObj(day));
        const data = [];
        for(user of users){
            data.push(BuildUserRowData(hours, day, user, roles));
        }
        data.push(BuildHoursRow(hours));
        return data
    }
    
    static BuildHoursRow(hours){
        const rowData = hours.map(BuildHourCell);
        return [BuildEmptyCell(), ...rowData];
    }
    
    static BuildUserRowData(hours, day, user, roles){
        const rowData = [];
        if(!user.quarts)user.quarts=[]
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
    
    static BuildHourCell(hour){
        return {content: DateUtilities.dateToHoursString(hour)};
    }
    
    static BuildUserCell(user, day){
        const cell = {};
        cell.content= `${user.prenom} ${user.nom}`
        cell.id = user.id
        cell.attributes = {class: "clickable-dark tuile-sm"};
        cell.attributes.onClick = `window.location.href = '/horaire-perso?id=${user.id}&date=${DateUtilities.dateToDateString(day)}'`;
        return cell;
    }
    
    static BuildEmptyCell(){
        return {content: " "};
    }
    
    static BuildShiftCell(workShift, roles){
        const shiftCell = {};
        const role = GetRole(workShift.idRoleUtilisateur, roles);
        shiftCell.id = workShift.id
        // shiftCell.attributes = {colspan: 2 * DateUtilities.getDurationH(workShift)};
        shiftCell.attributes = BuildShiftAttributes(workShift, role)
        // shiftCell.contentAttributes = BuildShiftAttributes(workShift, role)
        shiftCell.content = GetShiftText(workShift, role)
        return shiftCell;
    }
    
    
    static BuildShiftAttributes(workShift, role){
        const attributes = {};
        attributes.colspan = 2 * DateUtilities.getDurationH(workShift);
        attributes.style = `background-color: ${role.couleur}; font-weight: bold;`;
        attributes.class = "work-shift-cell";
        attributes['data-ws'] = workShift;
        // attributes.class = "tuile-sm";
        return attributes;
    }
    
    static GetRole(id ,roles){
        return roles.find(r => r.id == id);
    }
    
    static GetShiftText(workShift, role){
        if(DateUtilities.areSameDay(workShift.start, workShift.end))
            return `${role.nom}: ${DateUtilities.dateToHoursString(workShift.start)} - ${DateUtilities.dateToHoursString(workShift.end)}`
        return `${role.nom}: ${DateUtilities.dateToFullDateString(workShift.start)} - ${DateUtilities.dateToFullDateString(workShift.end)}`
    }
        
}