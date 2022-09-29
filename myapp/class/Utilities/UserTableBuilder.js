const DateUtilities = require('./DateUtilities');

module.exports.BuildUserTableData = function BuildUserTableData(roles, quarts, debut, fin){
    const days = DateUtilities.getDaysDate(debut, fin);
    const hours = DateUtilities.getHours({});
    const data = hours.map(h => BuildHourRow(h, days, quarts, roles));
    data.push(BuildDaysRow(days));
    return data;
}

function BuildDaysRow(days){
    return [BuildEmptyCell(), ...days.map(BuildDayCell)];
}

function BuildHourRow(hour, days, quarts, roles){
    const row = [];
    for(day of days){
        const cell = BuildCell(hour, day, quarts, roles);
        if(!!cell) row.push(cell);
    }
    // const row = days.map((d) => BuildCell(hour, d, quarts, roles));
    return [BuildHourCell(hour), ...row];
}

function BuildCell(hour, day, quarts, roles){
    const dateTime = DateUtilities.getDate(day.getFullYear(), day.getMonth() + 1, day.getDate(), hour.getHours(), hour.getMinutes());
    // const dateTime = new Date(hour.getTime() + day.getTime());
    const currentShift = quarts.find((shift) => DateUtilities.isInSpan(dateTime, shift.debut, shift.fin));
    if(!currentShift) return BuildEmptyCell();
    if(currentShift.debut.getTime() == dateTime.getTime() || 
    DateUtilities.isMidnightDate(dateTime)) return BuildShiftCell(currentShift, dateTime, roles);
}

function BuildDayCell(day){
    return {content: DateUtilities.dateToDateString(day)};
}

function BuildShiftCell(quart, dateTime, roles){
    const role = GetRole(quart.idRoleUtilisateur, roles);
    let td = {};
    const sameDay = DateUtilities.areSameDay(quart.debut, quart.fin);
    const strDebut = sameDay ? DateUtilities.dateToHoursString(quart.debut) : DateUtilities.dateToFullDateString(role.debut);
    const strFin   = sameDay ? DateUtilities.dateToHoursString(quart.fin) : DateUtilities.dateToFullDateString(role.fin);
    td.content = `${role.nom}: ${strDebut} - ${strFin}`;
    td.attributes = {rowspan: GetRowSpan(sameDay, quart, dateTime)}
    td.attributes.style = `background-color:${role.couleur}; font-weight:bold;`;
    return td;
}

function GetRowSpan(sameDay, quart, dateTime){
    let start = quart.debut;
    let end = quart.fin;
    if(!sameDay){
        if(DateUtilities.sameDay(start, dateTime)){
            end = DateUtilities.removeHoursDate(quart.fin);
        }else if(DateUtilities.sameDay(end, dateTime)){
            start = DateUtilities.removeHoursDate(quart.fin);
        }
    }
    return 2 * DateUtilities.getDurationH({start: start, end: end});
}

function BuildEmptyCell(){
    return {content: " "};
}

function BuildHourCell(hour){
    return {content: DateUtilities.dateToHoursString(hour)};
}

function GetRole(id ,roles){
    return roles.find(r => r.id == id);
}