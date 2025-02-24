import getEmailAddress from './email';
//import jsonToSpreadsheet from './jsontospreadhsheet';
import {jsonToSpreadsheet, listJsonFiles} from './processJSONSkillTrees';
import {dataIntoHashRows, updateHashRow, insertHashRow, getSheetRows} from './crudOperations';  
import {testButtonClicked, testButtonClicked3} from './clientCallableFunctions';
import {getAllSkillTreeSheets, getAllSkillTreeSheetNames, getAllSkillTreeRows} from './skillTreeSheet';
import {getSkillTreeItemsForStudent, addSkillTreeItemForStudent} from './studentSkillTreeItemSheet';
import {getCurrentUser} from './currentUser';

global.getAllSkillTreeSheets = getAllSkillTreeSheets;
global.getAllSkillTreeSheetNames = getAllSkillTreeSheetNames;
global.getAllSkillTreeRows = getAllSkillTreeRows;
global.getSkillTreeItemsForStudent = getSkillTreeItemsForStudent; 
global.addSkillTreeItemForStudent = addSkillTreeItemForStudent;

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

const StudentSkillTreeItemSpreadsheetID = "1mWXAAge-BXtLS6JKesWHL2bmXzn0HMk5NKEhsi8HRro";
global.StudentSkillTreeItemSpreadsheetID = StudentSkillTreeItemSpreadsheetID;

const StudentFilesFolderID = "1v_QKeoMEWNniwoevSglOpfYN0wukjoNm";
global.StudentFilesFolderID = StudentFilesFolderID;


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
  let result = global.getSkillTreeItemsForStudent("dundeen@lcc.ca");
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

function getSlideEmbedUrl(presentationId) {
  return `https://docs.google.com/presentation/d/${presentationId}/embed?start=true&loop=true&delayms=3000`;
}


global.getScriptUrl = () => {
  let url = ScriptApp.getService().getUrl();
  return url;
}

global.navigateToPage = (params) => {
  const page = params.page || 'index';
  
  return HtmlService
    .createTemplateFromFile(page)
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}


global.incrementCounter = () => {
  let scriptCounter = PropertiesService.getScriptProperties().getProperty('counter');
  if(!scriptCounter){
    scriptCounter = 0;
  }
  Logger.log("scriptCounter", scriptCounter);
  scriptCounter++;
  PropertiesService.getScriptProperties().setProperty('counter', scriptCounter);

  let userCounter = PropertiesService.getUserProperties().getProperty('counter');
  if(!userCounter){
    userCounter = 0;
  }
  Logger.log("userCounter", userCounter);
  userCounter++;
  PropertiesService.getUserProperties().setProperty('counter', userCounter);

  return { 
    foo: "bar",
    scriptCounter: scriptCounter, 
    userCounter: userCounter 
  };
}
