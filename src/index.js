import {jsonToSpreadsheet, listJsonFiles, runJSONToSpreadsheet} from './server_processJSONSkillTrees';
global.jsonToSpreadsheet = jsonToSpreadsheet;
global.runJSONToSpreadsheet = runJSONToSpreadsheet;
global.listJsonFiles = listJsonFiles;

import {dataIntoHashRows, updateHashRow, insertHashRow, getSheetRows} from './server_crudOperations';  
global.dataIntoHashRows = dataIntoHashRows;
global.updateHashRow = updateHashRow;
global.insertHashRow = insertHashRow;
global.getSheetRows = getSheetRows;

import {getAllSkillTreeSheets, getAllSkillTreeSheetNames, getAllSkillTreeRows} from './server_skillTreeSheet';
global.getAllSkillTreeSheets = getAllSkillTreeSheets; 
global.getAllSkillTreeSheetNames = getAllSkillTreeSheetNames;
global.getAllSkillTreeRows = getAllSkillTreeRows;

import {getSkillTreeItemsForStudent, addSkillTreeItemForStudent} from './server_studentSkillTreeItemSheet';
global.getSkillTreeItemsForStudent = getSkillTreeItemsForStudent; 
global.addSkillTreeItemForStudent = addSkillTreeItemForStudent;

import {getCurrentUser} from './server_currentUser';
global.getCurrentUser = getCurrentUser;

import {testButtonClicked, testButtonClicked3, currentTestFunction} from './server_testFunctions';
global.testButtonClicked = testButtonClicked;
global.testButtonClicked3 = testButtonClicked3;
global.currentTestFunction = currentTestFunction;

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
      page = 'CW_INDEX';
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

