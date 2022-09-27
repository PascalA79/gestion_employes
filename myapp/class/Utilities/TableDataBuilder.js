module.exports.BuildPlancherTableData = 
    function BuildPlancherTableData(day, users, roles){
        const hours = getHours(getObj(day));
        const data = [];
        for(user of users){
            data.push(BuildUserRowData(hours, user, roles));
        }
    
        return data
    }
    
    function BuildUserRowData(hours, user, roles){
        const rowData = [];
        rowData.push(BuildUserCell(user));
        const shifts = user.quarts.map(q => 
            {return {...q, start: getDateObj(q.start), end: getDateObj(q.end)}});
        for (h of hours){
            const currentShift = shifts.find((s) => isInSpan(h, s.start, s.end));
            if(!currentShift) rowData.push(BuildEmptyCell());
            else if (currentShift.start.getTime() == h.getTime()) rowData.push(BuildShiftCell(currentShift, roles));
        }
        return rowData;
    }
    
    function BuildUserCell(user){
        const cell = {};
        cell.content= `${user.firstName} ${user.lastName}`
        cell.id = user.id
        return cell;
    }
    
    function BuildEmptyCell(){
        return {content: " "};
    }
    
    function BuildShiftCell(workShift, roles){
        const shiftCell = {};
        shiftCell.id = workShift.id
        shiftCell.attributes = BuildShiftAttributes(workShift, roles)
        return shiftCell;
    }
    
    function BuildShiftAttributes(workShift, roles){
        const attributes = {};
        const role = GetRole(workShift.role, roles);
        attributes.colspan = 2 * getDurationH(workShift);
        attributes.style = `background-color: ${role.color}; font-weight: bold;`;
        return attributes;
    }
    
    function GetRole(id ,roles){
        return roles.find(r => r.id == id);
    }
    