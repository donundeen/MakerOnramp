// change this when the server side data changes - forces a reload of all data on client side
// TBD - move into a spreadsheet, admin tool or something...
global.dataVersion = 0;

const SkillTreeSpreadsheetID =  "12GfSYyx1oIm2V-ZpDOqA7wBXeEbXLjihPP8Txem5J5Q";
global.SkillTreeSpreadsheetID = SkillTreeSpreadsheetID;

const StudentSkillTreeItemSpreadsheetID = "1mWXAAge-BXtLS6JKesWHL2bmXzn0HMk5NKEhsi8HRro";
global.StudentSkillTreeItemSpreadsheetID = StudentSkillTreeItemSpreadsheetID;

const StudentFilesFolderID = "1v_QKeoMEWNniwoevSglOpfYN0wukjoNm";
global.StudentFilesFolderID = StudentFilesFolderID;

import {jsonToSpreadsheet, listJsonFiles, runJSONToSpreadsheet} from './server_processJSONSkillTrees';
global.jsonToSpreadsheet = jsonToSpreadsheet;
global.runJSONToSpreadsheet = runJSONToSpreadsheet;
global.listJsonFiles = listJsonFiles;

import {Sheet} from './serverClass_Sheet';
global.Sheet = Sheet;

import {StudentSkillTreeItemSheet} from './serverClass_StudentSkillTreeItemSheet';
global.StudentSkillTreeItemSheet = StudentSkillTreeItemSheet;

import {SkillTreeSheet} from './serverClass_SkillTreeSheet';
global.SkillTreeSheet = SkillTreeSheet;


// Exposing class methods as global functions for client side use
global.getAllSkillTreeSheetNames = () =>{
  const skillTreeSheet = new SkillTreeSheet();
  return skillTreeSheet.getAllSkillTreeSheetNames();
}

global.getAllSkillTreeRows = (sheetName) => {
  const skillTreeSheet = new SkillTreeSheet();
  skillTreeSheet.sheetName = sheetName;
  return skillTreeSheet.getAllSkillTreeRows();
}

global.getSkillTreeItemsForStudent = (studentID) => {
  const studentSkillTreeItemSheet = new StudentSkillTreeItemSheet();
  return studentSkillTreeItemSheet.getSkillTreeItemsForStudent(studentID);
}

global.addSkillTreeItemForStudent = (studentID, skillTreeItemID, skillTreeName) => {
  const studentSkillTreeItemSheet = new StudentSkillTreeItemSheet();
  return studentSkillTreeItemSheet.addSkillTreeItemForStudent(studentID, skillTreeItemID, skillTreeName);
}

global.testInsertHashRow = () => {
  global.addSkillTreeItemForStudent("dundeen@lcc.ca", "1", "Skill Tree 1");
}
global.testGetSkillTreeItemsForStudent = () => {
  let result = global.getSkillTreeItemsForStudent("dundeen@lcc.ca");
  Logger.log(result);
}

/*
import {dataIntoHashRows, updateHashRow, insertHashRow, getSheetRows} from './server_crudOperations';  
global.dataIntoHashRows = dataIntoHashRows;
global.updateHashRow = updateHashRow;
global.insertHashRow = insertHashRow;
global.getSheetRows = getSheetRows;

import {getAllSkillTreeSheets, getAllSkillTreeSheetNames, getAllSkillTreeRows, getSkillTreeItem} from './server_skillTreeSheet';
global.getAllSkillTreeSheets = getAllSkillTreeSheets; 
global.getAllSkillTreeSheetNames = getAllSkillTreeSheetNames;
global.getAllSkillTreeRows = getAllSkillTreeRows;
global.getSkillTreeItem = getSkillTreeItem;

import {getSkillTreeItemsForStudent, addSkillTreeItemForStudent} from './server_studentSkillTreeItemSheet';
global.getSkillTreeItemsForStudent = getSkillTreeItemsForStudent; 
global.addSkillTreeItemForStudent = addSkillTreeItemForStudent;
*/

import {getCurrentUser} from './server_currentUser';
global.getCurrentUser = getCurrentUser;

import {testButtonClicked, testButtonClicked3, currentTestFunction} from './server_testFunctions';
global.testButtonClicked = testButtonClicked;
global.testButtonClicked3 = testButtonClicked3;
global.currentTestFunction = currentTestFunction;





global.urlParams = {};

global.doGet = (e) => {
    Logger.log("opening");  
    global.urlParams = e.parameter;
    //let sheetNames = PropertiesService.getScriptProperties().getProperty('allSkillTreeSheetNames');
    PropertiesService.getScriptProperties().setProperty('urlParams', JSON.stringify(global.urlParams));  
    let page= e.parameter.page;
    if(!page){
      page = 'html_BrowseSkillTrees';
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
global.includeTemplated = (filename) => {
  return HtmlService.createTemplateFromFile(filename)
  .evaluate()
  .getContent();
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

function getSlideEmbedUrl(presentationId) {
  return `https://docs.google.com/presentation/d/${presentationId}/embed?start=true&loop=true&delayms=3000`;
}


global.getScriptUrl = () => {
  let url = ScriptApp.getService().getUrl();
  let urlParams = PropertiesService.getScriptProperties().getProperty('urlParams');
  return {url : url, params : JSON.parse(urlParams)};
}

global.navigateToPage = (params) => {
  const page = params.page || 'index';
  
  return HtmlService
    .createTemplateFromFile(page)
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}



global.getEveryPageLoadData = () => {
  return {
    dataVersion : global.dataVersion,
    currentUrl : global.getScriptUrl(),
    currentUser : global.getCurrentUser()
  }
}