  
  const  testButtonClicked = () => {
    Logger.log("testButtonClicked");
    return "I ran testButtonClicked";
  };

  const  testButtonClicked3 = () => {
    Logger.log("testButtonClicked");
    return "I ran testButtonClicked3";
  };

const getAllSkillTreeRows = function() {
  const spreadsheetID = "12GfSYyx1oIm2V-ZpDOqA7wBXeEbXLjihPP8Txem5J5Q";
  const sheetName = "SkillTrees";
  const data = global.getSheetRows(spreadsheetID, sheetName);
  return data;
}




const jsonToSpreadsheet =  function(filename, spreadsheetID ){

/*  
    let spreadsheetID = "12GfSYyx1oIm2V-ZpDOqA7wBXeEbXLjihPP8Txem5J5Q";
    let sheetName = "SkillTrees";
    let filename = "3D_Printing.json";
*/  
    const sheetheaders = ["SkillTreeName", "SkillTreeID", "Title", "Level", "Icon","DocumentationSlidesLink","Documentation Status"];


    // load the JSON file, cancel if doesn't exist
    // load the JSON file from the local skillTreeJSON folder
    const skillTreeJSONFolder = DriveApp.getFoldersByName("skillTreeJSON").next();
    const files = skillTreeJSONFolder.getFilesByName(filename);
    if (!files.hasNext()) {
        Logger.log('No file found with the name 3D_Printing.json');
        return "No file found with the name " + filename; // Exit the function if no file is found
    }   
    // Read the JSON file from the local skillTreeJSON folder
    const file = files.next(); // Now safe to call next()      
    const jsonContent = file.getBlob().getDataAsString();
    const jsonData = JSON.parse(jsonContent);
    
    const skillTreeName = jsonData.Title;    

    // open the spreadsheet
    let spreadsheet = SpreadsheetApp.openById(spreadsheetID);

    // load the sheet. create it if it doesn't exist
    let sheet = spreadsheet.getSheetByName(skillTreeName);
    if (!sheet) {
            sheet = spreadsheet.insertSheet(skillTreeName);
    }

    // write the headers to the sheet
    sheet.appendRow(sheetheaders);

    const resourcesFolder = DriveApp.getFoldersByName("SkillTreeItemDocumentation").next();

   
    // Write properties of each object in the "Skills" array to the sheet
    const skills = jsonData.Skills;
    skills.forEach(skill => {
        let id = skill.desc.replace(/ /g, "_");
        Logger.log("id: " + id);
        // if there's already a row in the sheet with this id, skip it
        const rows = sheet.getDataRange().getValues();
        const existingRow = rows.find(row => row[1] === id);
        if (existingRow) {
            Logger.log("Skipping row with id " + id + " because it already exists");
        } else {
            let documentTitle = skillTreeName + " - " + skill.desc;
            let documentationSlidesLink = "";
            // see if a google slide exists for this documentTitle in the Resources folder
            let documentationStatus = "created";
            Logger.log("documentTitle: " + documentTitle);
            const slides = resourcesFolder.getFilesByName(documentTitle); 
            if (slides.hasNext()) {
                const slide = slides.next();
                documentationSlidesLink = slide.getUrl();
            }
            else {
                Logger.log("no slide found");
                // otherwise, create a google slide
                documentationSlidesLink = createPresentationInResourcesFolder(documentTitle, resourcesFolder);
            }
            const row = [skillTreeName, id, skill.desc, skill.level, skill.icon, documentationSlidesLink, documentationStatus]; // Adjust properties as needed
            Logger.log("row: " + row);
            sheet.appendRow(row);
        }
    });
    return "I ran jsonToSpreadsheet";
};

const listJsonFiles = function() {
    Logger.log("listing json files");
    const files = DriveApp.getFilesByType('application/json');
    while (files.hasNext()) {
        const file = files.next();
        Logger.log('File Name: ' + file.getName() + ', File ID: ' + file.getId());
    }
};
    

function createPresentationInResourcesFolder(documentTitle, resourcesFolder) {
    // Step 1: Create the presentation
    const presentation = SlidesApp.create(documentTitle);
    Logger.log("1 presentation: " + presentation);

    // Step 2: Get the file ID of the created presentation
    const presentationId = presentation.getId();
    Logger.log("Presentation ID: " + presentationId);

    // Step 3: Move the presentation to the resources folder
    const presentationFile = DriveApp.getFileById(presentationId);
    resourcesFolder.addFile(presentationFile); // Move the file to the resources folder
    DriveApp.getRootFolder().removeFile(presentationFile); // Optionally remove it from the root folder

    // Log the URL of the presentation
    const documentationSlidesLink = presentation.getUrl();
    Logger.log("documentationSlidesLink: " + documentationSlidesLink);
    return documentationSlidesLink;
}

  export  {testButtonClicked, testButtonClicked3, jsonToSpreadsheet, listJsonFiles, getAllSkillTreeRows};
  