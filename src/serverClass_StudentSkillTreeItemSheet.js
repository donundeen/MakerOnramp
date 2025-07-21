import {Sheet} from './serverClass_Sheet';
import { SlideDeck } from "./serverClass_SlideDeck";



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

    addSkillTreeItemForStudent(studentID, skillTreeName,skillTreeItemID){
        Logger.log("adding skill tree item for student", this);
        this.loadSheet();
        const data = {
            StudentID: studentID,
            SkillTreeItemID: skillTreeItemID,
            SkillTreeName: skillTreeName,
            Status: "started",
            UniqueID: Utilities.getUuid(),
            StartedDate: new Date().toISOString()
        };

        let slideDeck = this.createStudentDocumentationSlide(studentID, skillTreeName, skillTreeItemID);
        data.StudentDocumentationSlidesLink = slideDeck.slideDeckUrl;
        
        // insert the data into the sheet   
        this.insertHashRow(data, 0);

        return data;

    }

    createStudentDocumentationSlide(studentID, skillTreeName, skillTreeItemID){

        const skillTreeItem = this.getFullSkillTreeItem(skillTreeName, skillTreeItemID);
        const skillTreeItemTitle = skillTreeItem.Title;
        const skillTreeItemLevel = skillTreeItem.Level;
        const skillTreeItemDocumentationSlidesLink = skillTreeItem.DocumentationSlidesLink;

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

        let slideDeck = new SlideDeck();
        slideDeck.setStorageFolderId(studentSkillTreeItemDocumentationFolder.getId());
        slideDeck.slideDeckName = studentSkillTreeItemDocumentationName;
        let result = slideDeck.createNewSlideDeck();
        if(!result){
            return false;
        }
        slideDeck.createStudentDocumentationTitleSlide(studentID, skillTreeName, skillTreeItemTitle, skillTreeItemLevel);


        // look for evidence slides in the skillTreeItemDocumentationSlidesLink
        let documentationSlideDeck = new SlideDeck();
        documentationSlideDeck.slideDeckUrl = skillTreeItemDocumentationSlidesLink;
        let docresult = documentationSlideDeck.loadSlideDeck();
        if(docresult){
            slideDeck.copyEvidenceSlidesFromDeck(documentationSlideDeck);
        }
    
        return slideDeck;
    }

    getFullSkillTreeItem(skillTreeName, skillTreeItemID){
        const skillTreeSheet = new SkillTreeSheet();
        skillTreeSheet.sheetName = skillTreeName;
        const skillTreeItem = skillTreeSheet.getSkillTreeItem(skillTreeItemID);
        return skillTreeItem;
    }

    submitStudentSkillTreeItem(studentID, skillTreeName, skillTreeItemID){
        this.loadSheet();
        const updateKeys = {
            StudentID: studentID,
            SkillTreeItemID: skillTreeItemID,
            SkillTreeName: skillTreeName,   
        };
        const data = {  
            Status: "submitted"
        };
        const result = this.updateHashRowCells(data, 0, updateKeys);
        return result;
    }
    
}

export {StudentSkillTreeItemSheet};