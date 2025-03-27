import {Sheet} from './serverClass_Sheet';
import {SlideDeck} from './serverClass_SlideDeck';


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

        let slideDeck = new SlideDeck();
        slideDeck.setStorageFolderId(resourcesFolder.getId());
        slideDeck.createNewSlideDeck(documentTitle);
        slideDeck.addDocumentationTitleSlide(skillTreeName, itemName, level);

    }

}

export {SkillTreeSheet};