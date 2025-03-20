import {Sheet} from './serverClass_Sheet';


class SkillTreeSheet extends Sheet {
    constructor() {
        super();
        this.myclass = "SkillTreeSheet"; 
        this.spreadsheetID = global.SkillTreeSpreadsheetID;
        this.sheetName = null;
    }

    getAllSkillTreeSheetNames(){
        let sheetNames = false; //PropertiesService.getScriptProperties().getProperty('allSkillTreeSheetNames');
        
        if(sheetNames){
            return JSON.parse(sheetNames);
        }
        sheetNames = this.getAllSheetNames();
        const filteredSheetNames = sheetNames.filter(name => name !== "Notes");
        //PropertiesService.getScriptProperties().setProperty('allSkillTreeSheetNames', JSON.stringify(filteredSheetNames));
        return filteredSheetNames;
    }   

    getAllSkillTreeRows() {
        const data = this.getSheetRows();
        return data;
    }

    getSkillTreeItem(skillTreeItemID){
        const data = this.getSheetRows();
        const item = data.data.filter(row => row.SkillTreeItemID === skillTreeItemID);
        if(item.length > 0){
            return item[0];
        }
        return false;
    }

    updateDocumentationSlideLink(skillTreeItemID, documentationSlideLink){
        this.updateHashRowCells({DocumentationSlidesLink: documentationSlideLink}, 0, {SkillTreeItemID: skillTreeItemID});
    }

    flagImportant(skillTreeName, skillTreeItemID){
        this.sheetName = skillTreeName;
       let newRow = this.updateHashRowCells({DocumentationStatus: "important"}, 0, {SkillTreeName: skillTreeName, SkillTreeItemID: skillTreeItemID});
       return newRow;
    }

    addSkillTreeItem(skillTreeName, level, itemName){

        this.sheetName = skillTreeName;

        let newRow = {
            SkillTreeName: skillTreeName,
            Level: level,
            Title: itemName,
            DocumentationStatus: "created",
            DocumentationSlidesLink: "",
            DocumentationNumSlides: 1
        }
        newRow.SkillTreeItemID = itemName.replace(/ /g, "_");
        newRow.DocumentationSlidesLink = this.createPresentationInResourcesFolder(skillTreeName + " - " + itemName, skillTreeName, itemName, level);

        this.insertHashRow(newRow, 0);

        return newRow;
    }

    createPresentationInResourcesFolder(documentTitle, skillTreeName, itemName, level) {
        const resourcesFolder = DriveApp.getFoldersByName("SkillTreeItemDocumentation").next();

        // Step 1: Create the presentation
        const presentation = SlidesApp.create(documentTitle);
        //Logger.log("1 presentation: " + presentation);
    
        // Step 2: Get the file ID of the created presentation
        const presentationId = presentation.getId();
        //Logger.log("Presentation ID: " + presentationId);
    
        // Step 3: Move the presentation to the resources folder
        const presentationFile = DriveApp.getFileById(presentationId);
        resourcesFolder.addFile(presentationFile); // Move the file to the resources folder
        DriveApp.getRootFolder().removeFile(presentationFile); // Optionally remove it from the root folder
    
        this.addTitleSlide(presentation, skillTreeName, itemName, level);  
        // Log the URL of the presentation
        const documentationSlidesLink = presentation.getUrl();
        //Logger.log("documentationSlidesLink: " + documentationSlidesLink);
        return documentationSlidesLink;
    }

    addTitleSlide(presentation, skillTreeName, title, level){
        const pageWidth = presentation.getPageWidth();
        const pageHeight = presentation.getPageHeight();
        let slides = presentation.getSlides();
        let numberOfSlides = slides.length;

        let titleSlide = slides[0];
        titleSlide.getShapes().forEach(shape => {
            shape.remove();
        });
        // set the title, description, and level on the first slide
        const shape = titleSlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 0, 0, pageWidth, pageHeight);
        shape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
        const textRange = shape.getText();
        textRange.setText(skillTreeName + " \n\n " + title + " \n\n Level " + level);
        // resize the text to fit the shape, being as large as possible
        textRange.getTextStyle().setFontSize(40);
        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
//                    textRange.getTextStyle().setFontSize(100);
        textRange.getTextStyle().setFontFamily("Georgia");
        textRange.getTextStyle().setForegroundColor("#000000");
        textRange.getTextStyle().setBold(true);
    }
}

export {SkillTreeSheet};