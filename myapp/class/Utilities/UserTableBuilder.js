const DateUtilities = require('./DateUtilities');

module.exports.BuildUserTableData = function BuildUserTableData(roles, planchers, quarts, debut, fin, plancherIdUser){
    const days = DateUtilities.getDaysDate(debut, fin);
    const hours = DateUtilities.getHours({});
    const data = hours.map(h => BuildHourRow(h, days, quarts, roles, planchers, plancherIdUser));
    data.push(BuildDaysRow(days));
    return data;
}

function BuildDaysRow(days){
    return [BuildEmptyCell(), ...days.map(BuildDayCell)];
}

function BuildHourRow(hour, days, quarts, roles, planchers, plancherIdUser){
    const row = [];
    for(day of days){
        const cell = BuildCell(hour, day, quarts, roles, planchers, plancherIdUser);
        if(!!cell) row.push(cell);
    }
    // const row = days.map((d) => BuildCell(hour, d, quarts, roles));
    return [BuildHourCell(hour), ...row];
}

function BuildCell(hour, day, quarts, roles, planchers, plancherIdUser){
    const dateTime = DateUtilities.getDate(day.getFullYear(), day.getMonth() + 1, day.getDate(), hour.getHours(), hour.getMinutes());
    // const dateTime = new Date(hour.getTime() + day.getTime());
    const currentShift = quarts.find((shift) => DateUtilities.isInSpanTime(dateTime.getTime(), shift.debut, shift.fin));
    if(!currentShift) return BuildEmptyCell();
    if(currentShift.debut == dateTime.getTime() || 
    DateUtilities.isMidnightDate(dateTime)) return BuildShiftCell(currentShift, dateTime, roles, planchers, plancherIdUser);
}

function BuildDayCell(day){
    return {content: DateUtilities.dateToDateString(day)};
}

function BuildShiftCell(quart, dateTime, roles, planchers, plancherIdUser){
    const role = GetById(quart.idRoleUtilisateur, roles);
    const plancher = GetById(quart.idPlancher, planchers);
    let td = {};
    const sameDay = DateUtilities.areSameDayTime(quart.debut, quart.fin);
    // correctif ?
    const strDebut = sameDay ? DateUtilities.timeToHoursString(quart.debut) : DateUtilities.timeToFullDateString(quart.debut);
    const strFin   = sameDay ? DateUtilities.timeToHoursString(quart.fin) : DateUtilities.timeToFullDateString(quart.fin);
    // const strDebut = sameDay ? DateUtilities.dateToHoursString(quart.debut) : DateUtilities.dateToFullDateString(quart.debut);
    // const strFin   = sameDay ? DateUtilities.dateToHoursString(quart.fin) : DateUtilities.dateToFullDateString(quart.fin);
    td.content = "";
    if(plancherIdUser != plancher.id) td.content = `${plancher.nom} - `
    td.content += `${role.nom}: ${strDebut} - ${strFin}`;
    td.attributes = {rowspan: GetRowSpan(sameDay, quart, dateTime)}
    td.attributes.style = `background-color:${role.couleur}; font-weight:bold;`;
    return td;
}

function GetRowSpan(sameDay, quart, dateTime){
    let start = quart.debut;
    let end = quart.fin;
    if(!sameDay){
        //correctif ?
        if(DateUtilities.areSameDayTime(start, dateTime.getTime())){
            end = DateUtilities.removeHoursDate(quart.fin);
        }else if(DateUtilities.areSameDayTime(end, dateTime.getTime())){
            start = DateUtilities.removeHoursDate(quart.fin);
        }
    }
    return 2 * DateUtilities.getDurationHTime({start: start, end: end});
}

function BuildEmptyCell(){
    return {content: " "};
}

function BuildHourCell(hour){
    return {content: DateUtilities.dateToHoursString(hour)};
}

function GetById(id ,roles){
    return roles.find(r => r.id == id);
}