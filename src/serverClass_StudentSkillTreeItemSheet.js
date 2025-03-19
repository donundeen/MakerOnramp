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
        Logger.log("adding skill tree item for student", this);
        this.loadSheet();
        const data = {
            StudentID: studentID,
            SkillTreeItemID: skillTreeItemID,
            SkillTreeName: skillTreeName,
            Status: "started"
        };

        const studentDocumentationSlidesLink = this.createStudentDocumentationSlide(studentID, skillTreeName, skillTreeItemID);
        data.StudentDocumentationSlidesLink = studentDocumentationSlidesLink;
        
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
        const slideDeck = SlidesApp.create(studentSkillTreeItemDocumentationName);

        let pageWidth = slideDeck.getPageWidth();
        let pageHeight = slideDeck.getPageHeight();

        const slides = slideDeck.getSlides();
        // eventually give the doc a default titike, with students name, student email, and the skill tree item name
        let firstSlide = slides[0];
        // lear it out
        firstSlide.getShapes().forEach(shape => {
            shape.remove();
        });

        // set the title, description, and level on the first slide
        const shape = firstSlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 0, 0, pageWidth, pageHeight);
        shape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
        const textRange = shape.getText();
        textRange.setText("My Evidence Journal for\n" + skillTreeName + " \n " + skillTreeItemTitle + " \n Level " + skillTreeItemLevel + "\n"+studentID) ;
        // resize the text to fit the shape, being as large as possible
        textRange.getTextStyle().setFontSize(40);
        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
//                    textRange.getTextStyle().setFontSize(100);
        textRange.getTextStyle().setFontFamily("Georgia");
        textRange.getTextStyle().setForegroundColor("#000000");
        textRange.getTextStyle().setBold(true);        
    
        studentSkillTreeItemDocumentationFolder.addFile(DriveApp.getFileById(slideDeck.getId()));
    
        const studentDocumentationSlidesLink = slideDeck.getUrl();
        return studentDocumentationSlidesLink;
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