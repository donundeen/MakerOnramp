const getStudentSkillTreeItemSheet = function(){
    const sheetName = "StudentSkillTreeItem";
    const sheet = SpreadsheetApp.openById(global.StudentSkillTreeItemSpreadsheetID).getSheetByName(sheetName);
    return sheet;
}

const getSkillTreeItemsForStudent = (studentID) => {
    const sheetName = "StudentSkillTreeItem";
    Logger.log("getSkillTreeItemsForStudent"+ studentID);
    let data = global.getSheetRows(global.StudentSkillTreeItemSpreadsheetID, sheetName);

    return data;
};

const addSkillTreeItemForStudent = (studentID, skillTreeItemID, skillTreeName) => {
    const sheet = getStudentSkillTreeItemSheet();
    const data = {
        StudentID: studentID,
        SkillTreeItemID: skillTreeItemID,
        SkillTreeName: skillTreeName,
        Status: "Started"
    };
    global.insertHashRow(sheet, data,0);

    const studentSkillTreeItemDocumentationName = studentID + "_" + skillTreeName + "_" + skillTreeItemID;
    // create a slide deck in the studentFiles/studentID/skillTreeItemDocumentationName folder
    const studentFilesFolder = DriveApp.getFolderById(global.StudentFilesFolderID);

    // 
    // only create the folder if it doesn't exist with that name
    let studentSkillTreeItemDocumentationFolder = null;
    let folderIterator = studentFilesFolder.getFoldersByName(studentID);
    if(folderIterator.hasNext()){
        studentSkillTreeItemDocumentationFolder = folderIterator.next();
    }else{
        studentSkillTreeItemDocumentationFolder = studentFilesFolder.createFolder(studentID);
    }
    const slideDeck = SlidesApp.create(studentSkillTreeItemDocumentationName);

    // eventually give the doc a default titike, with students name, student email, and the skill tree item name

    studentSkillTreeItemDocumentationFolder.addFile(DriveApp.getFileById(slideDeck.getId()));

    return data;
}


export {getSkillTreeItemsForStudent, addSkillTreeItemForStudent};