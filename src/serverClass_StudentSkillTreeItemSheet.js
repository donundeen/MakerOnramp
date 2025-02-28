import {Sheet} from './serverClass_Sheet';


class StudentSkillTreeItemSheet extends Sheet {
    constructor() {
        super();
        //Logger.log("constructor");
        //Logger.log(this);
        this.myclass = "StudentSkillTreeItemSheet";
        this.spreadsheetID = global.StudentSkillTreeItemSpreadsheetID;
        this.sheetName = "StudentSkillTreeItems";
        this.StudentFilesFolderID = global.StudentFilesFolderID;
    }

    getSkillTreeItemsForStudent(studentID){
        this.loadSheet();
        const data = this.getSheetRows();
        const items = data.data.filter(row => row.StudentID === studentID);
        return items;
    }

    addSkillTreeItemForStudent(studentID, skillTreeItemID, skillTreeName){
        console.log("adding skill tree item for student", this);
        this.loadSheet();
        const data = {
            StudentID: studentID,
            SkillTreeItemID: skillTreeItemID,
            SkillTreeName: skillTreeName,
            Status: "Started"
        };
        this.insertHashRow(data, 0);

        const studentSkillTreeItemDocumentationName = studentID + "_" + skillTreeName + "_" + skillTreeItemID;
        // create a slide deck in the studentFiles/studentID/skillTreeItemDocumentationName folder
        const studentFilesFolder = DriveApp.getFolderById(this.StudentFilesFolderID);
    
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
}

export {StudentSkillTreeItemSheet};