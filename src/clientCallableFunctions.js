  
  const  testButtonClicked = () => {
    Logger.log("testButtonClicked");
    return "I ran testButtonClicked";
  };

  const  testButtonClicked3 = () => {
    Logger.log("testButtonClicked");
    return "I ran testButtonClicked3";
  };

  const jsonToSpreadsheet =  function(filename, sheetName, spreadsheetID){

    /*  
      let spreadsheetID = "12GfSYyx1oIm2V-ZpDOqA7wBXeEbXLjihPP8Txem5J5Q";
      let sheetName = "SkillTrees";
      let filename = "3D_Printing.json";
    */  
      const files = DriveApp.getFilesByName(filename);
      if (!files.hasNext()) {
          Logger.log('No file found with the name 3D_Printing.json');
          return "No file found with the name " + filename; // Exit the function if no file is found
      }   
      let spreadsheet = SpreadsheetApp.openById(spreadsheetID);
      let sheet = spreadsheet.getSheetByName(sheetName);
      let data = sheet.getDataRange().getValues();
      Logger.log(data);
  
      // Read the JSON file from the local skillTreeJSON folder
      const file = files.next(); // Now safe to call next()      
      const jsonContent = file.getBlob().getDataAsString();
      const jsonData = JSON.parse(jsonContent);
      
      const skillTreeName = jsonData.Title;
      // Write properties of each object in the "Skills" array to the sheet
      const skills = jsonData.Skills;
      skills.forEach(skill => {
          const row = [skillTreeName, skill.desc, skill.level, skill.icon]; // Adjust properties as needed
          sheet.appendRow(row);
      });
      return "I ran jsonToSpreadsheet";
  };


  export  {testButtonClicked, testButtonClicked3, jsonToSpreadsheet};
  