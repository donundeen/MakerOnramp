    const jsonToSpreadsheet =  function(filename, sheetName, spreadsheetID){

  /*  
    let spreadsheetID = "12GfSYyx1oIm2V-ZpDOqA7wBXeEbXLjihPP8Txem5J5Q";
    let sheetName = "SkillTrees";
  */  
    let spreadsheet = SpreadsheetApp.openById(spreadsheetID);
    let sheet = spreadsheet.getSheetByName(sheetName);
    let data = sheet.getDataRange().getValues();
    Logger.log(data);

    // Read the JSON file from the local skillTreeJSON folder
    const file = DriveApp.getFilesByName('3D_Printing.json').next();
    const jsonContent = file.getBlob().getDataAsString();
    const jsonData = JSON.parse(jsonContent);
    
    const skillTreeName = jsonData.Title;
    // Write properties of each object in the "Skills" array to the sheet
    const skills = jsonData.Skills;
    skills.forEach(skill => {
        const row = [skillTreeName, skill.desc, skill.level, skill.icon]; // Adjust properties as needed
        sheet.appendRow(row);
    });
};

export default jsonToSpreadsheet;