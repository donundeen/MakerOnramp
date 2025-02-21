import getEmailAddress from './email';
//import jsonToSpreadsheet from './jsontospreadhsheet';
import {jsonToSpreadsheet, listJsonFiles} from './processJSONSkillTrees';
import {dataIntoHashRows, updateHashRow, insertHashRow, getSheetRows} from './crudOperations';  
import {testButtonClicked, testButtonClicked3} from './clientCallableFunctions';
import {getAllSkillTreeSheets, getAllSkillTreeSheetNames, getAllSkillTreeRows} from './skillTreeSheet';
import {getCurrentUser} from './currentUser';

global.getAllSkillTreeSheets = getAllSkillTreeSheets;
global.getAllSkillTreeSheetNames = getAllSkillTreeSheetNames;
global.getAllSkillTreeRows = getAllSkillTreeRows;

global.getEmailAddress = getEmailAddress;
global.jsonToSpreadsheet = jsonToSpreadsheet;
global.testButtonClicked = testButtonClicked;
global.testButtonClicked3 = testButtonClicked3;
global.listJsonFiles = listJsonFiles;
global.dataIntoHashRows = dataIntoHashRows;
global.updateHashRow = updateHashRow;
global.insertHashRow = insertHashRow;
global.getSheetRows = getSheetRows;
global.getCurrentUser = getCurrentUser;

const SkillTreeSpreadsheetID =  "12GfSYyx1oIm2V-ZpDOqA7wBXeEbXLjihPP8Txem5J5Q";
global.SkillTreeSpreadsheetID = SkillTreeSpreadsheetID;

global.doGet = (e) => {
    Logger.log("opening");  
    let page= e.parameter.page;
    if(!page){
      page = 'index';
    }
       return HtmlService
       .createTemplateFromFile(page)
       .evaluate()
       .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

global.include = (filename) => {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}
  
global.testJsonToSpreadsheet = function(){

  let filenames = [
//    "3D_Printing.json",
//    "3D_Modeling.json",
//    "MakerSkillTree - cnc and cam.json",
 //   "MakerSkillTree - coding.json",
//    "MakerSkillTree - computing_basics.json",
//    "MakerSkillTree - crafting.json",
//    "MakerSkillTree - dev_boards.json",
//    "MakerSkillTree - electronics.json",
//    "MakerSkillTree - entrepreneurship.json",
//    "MakerSkillTree - laser_cutting.json",
//    "MakerSkillTree - metalworking.json",
 //   "MakerSkillTree - robotics.json",
 //   "MakerSkillTree - sewing.json",
 //   "MakerSkillTree - woodworking.json"
  ]
  filenames.forEach(filename => {
    let result =  jsonToSpreadsheet(filename, SkillTreeSpreadsheetID );
    Logger.log(result);
  })
}

global.currentTestFunction = function(){
  let result = global.getAllSkillTreeRows("Metalworking");
  Logger.log(result);
  return result;
}

function makeThumbnail(file, thumbname, newWidth){
    Logger.log("making thumb ", thumbname);
// commenting out for now, until we install the ImgApp library     
/*
let res = ImgApp.doResize(file.getId(), newWidth);
    imageFolder.createFile(res.blob.setName(thumbname));  
*/
}

  
  function getFileBlob(filename){
    // https://developers.google.com/apps-script/reference/base/blob
   Logger.log("looking for ", filename);
   let files = DriveApp.getFilesByName(filename);
   while (files.hasNext()) {
     let file = files.next();
     let blob = file.getBlob();
     Logger.log("got blob");
     return  { blob: blob.getBytes(),
               contentType : blob.getContentType()
             };
   } 
   Logger.log("returning false");
   return false;
  }

function makeSkillTreeDisplay(skillTreeData) {
    // Step 1: Group titles by level
    const groupedData = skillTreeData.data.reduce((acc, item) => {
        const level = item.Level;
        if (!acc[level]) {
            acc[level] = [];
        }
        acc[level].push(item.Title);
        return acc;
    }, {});

    // Step 2: Create HTML for display
    const displayContainer = document.getElementById('skillTreeDisplay'); // Ensure you have a container in your HTML
    displayContainer.innerHTML = ''; // Clear previous content

    Object.keys(groupedData).forEach(level => {
        const levelDiv = document.createElement('div');
        levelDiv.className = 'level'; // Add a class for styling

        // Create a title for the level
        const levelTitle = document.createElement('h3');
        levelTitle.innerText = `Level ${level}`;
        levelDiv.appendChild(levelTitle);

        // Create a container for titles arranged horizontally
        const titlesContainer = document.createElement('div');
        titlesContainer.className = 'titles-container'; // Class for styling

        // Create a div for each title
        groupedData[level].forEach(title => {
            const titleDiv = document.createElement('div');
            titleDiv.className = 'title'; // Class for styling
            titleDiv.innerText = title;
            titlesContainer.appendChild(titleDiv);
        });

        levelDiv.appendChild(titlesContainer);
        displayContainer.appendChild(levelDiv);
    });
}