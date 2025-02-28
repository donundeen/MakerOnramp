class SkillTreeSheet extends global.Sheet {
    constructor() {
        super();
        this.SkillTreeSpreadsheetID = global.SkillTreeSpreadsheetID;
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
        const data = this.getSheetRows(this.sheetName);
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

}

export {SkillTreeSheet};