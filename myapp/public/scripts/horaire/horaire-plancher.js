const editShiftForm = new EditShiftForm(
    $("#edit-shift-form"),
    $("#inputUsername"), 
    $("#inputShiftStart"), 
    $("#inputShiftEnd"), 
    $("#selectRole"),
    $("#btnSend"),
    $("#btnCancel"),
    $("#errorStart"),
    $("#errorEnd"),
    $("#errorRole"),
    $("#idQuartTravail"),
    $("#idPlancher"),
    $("#idUtilisateur"),
    $("#confirme"),
    $("#confirmMsg"),
);

editShiftForm.fillRoles(allRoles);

if(editShiftData.showModal){
    editShiftForm.fillShift(editShiftData.workShift);
    editShiftForm.fillErrors(editShiftData.shiftErrors);
}

function AddShiftHandlers(){
    const shiftCells = $(".work-shift-cell");
    console.log(shiftCells);
    if(shiftCells.length > 0){
        for (let i = 0; i < shiftCells.length; ++i){
            const cell = shiftCells.eq(i);
            const workShift = cell.data("ws");
            const user = cell.parent().children().eq(0).data("user");
            cell.dblclick((e) => {
                editShiftForm.editShift(workShift, user);
            })
        }
    }
}

function AddEmptyCellHandlers(){
    const rows = $(".table-container-plancher tr:not(:last-child)");
    for(let j = 0; j < rows.length; ++j){
        const row = rows.eq(j);
        const user = row.children().eq(0).data("user");
        const emptyCells = row.children("td:not(.work-shift-cell, :first-child)");
        for(let i = 0; i < emptyCells.length; ++i){
            const cell = emptyCells.eq(i);
            const start = new Date(cell.data("hour"));
            const end = new Date(start.getTime() + 0.5 * 3600 * 1000);
            cell.dblclick((e) => {
                editShiftForm.addNewShift(user, start, end);
            })
        }
    }   
}

AddShiftHandlers();
AddEmptyCellHandlers();