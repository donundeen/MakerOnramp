/*
functions for accessing the skill tree google sheet
*/

const getSkillTreeSheet = function(sheetID, sheetName){
    const sheet = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName);
    return sheet;
}

const getAllSkillTreeSheets = function(){
    let sheets = SpreadsheetApp.openById(global.SkillTreeSpreadsheetID).getSheets();
    return sheets;
}
const getAllSkillTreeSheetNames = function(){
    let sheetNames = PropertiesService.getScriptProperties().getProperty('allSkillTreeSheetNames');
    if(sheetNames){
        return JSON.parse(sheetNames);
    }
    const sheets = getAllSkillTreeSheets();
    sheetNames = sheets.map(sheet => sheet.getName().trim());
    const filteredSheetNames = sheetNames.filter(name => name !== "Notes");
    PropertiesService.getScriptProperties().setProperty('allSkillTreeSheetNames', JSON.stringify(filteredSheetNames));
    return filteredSheetNames;
}

const getAllSkillTreeRows = function(sheetName) {
    const data = global.getSheetRows(global.SkillTreeSpreadsheetID, sheetName);
    return data;
}

export {getAllSkillTreeSheets, getAllSkillTreeSheetNames, getAllSkillTreeRows};
