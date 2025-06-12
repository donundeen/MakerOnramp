// change this when the server side data changes - forces a reload of all data on client side
// TBD - move into a spreadsheet, admin tool or something...
global.dataVersion = 2;
// adding more comments to test the server side data version

import {processReviewSkillTrees} from './server_processReviewSkillTrees';
global.processReviewSkillTrees = processReviewSkillTrees;


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

import {StudentSkillTreeItemSheet} from './serverClass_StudentSkillTreeItemSheet';
global.StudentSkillTreeItemSheet = StudentSkillTreeItemSheet;

import {SkillTreeSheet} from './serverClass_SkillTreeSheet';
global.SkillTreeSheet = SkillTreeSheet;

import {MilestoneSheet} from './serverClass_MilestoneSheet';
global.MilestoneSheet = MilestoneSheet;



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

global.addSkillTreeItemForStudent = (studentID, skillTreeName, skillTreeItemID) => {
  const studentSkillTreeItemSheet = new StudentSkillTreeItemSheet();
  return studentSkillTreeItemSheet.addSkillTreeItemForStudent(studentID, skillTreeName, skillTreeItemID);
}

global.submitStudentSkillTreeItem = (studentID, skillTreeItemID, skillTreeName) => {
  const studentSkillTreeItemSheet = new StudentSkillTreeItemSheet();
  return studentSkillTreeItemSheet.submitStudentSkillTreeItem(studentID, skillTreeItemID, skillTreeName);
}

global.addSkillTreeItem = (skillTreeName, level, itemName) => {
  const skillTreeSheet = new SkillTreeSheet();
  return skillTreeSheet.addSkillTreeItem(skillTreeName, level, itemName);
}

global.testInsertHashRow = () => {
  global.addSkillTreeItemForStudent("dundeen@lcc.ca", "1", "Skill Tree 1");
}
global.testGetSkillTreeItemsForStudent = () => {
  let result = global.getSkillTreeItemsForStudent("dundeen@lcc.ca");
  //Logger.log(result);
}

global.testAddSkillTreeItem = (skillTreeName, level, itemName) => {
  let result = global.addSkillTreeItem(skillTreeName, level, itemName);
  Logger.log(result);
}


global.getMilestonesForStudent = (studentId) => {
  const milestoneSheet = new MilestoneSheet();
  return milestoneSheet.getMilestonesForStudent(studentId);
}

global.createMilestone = (milestoneData) => {
  const milestoneSheet = new MilestoneSheet();
  return milestoneSheet.createMilestone(milestoneData);
}

global.updateMilestone = (milestoneData) => {
  const milestoneSheet = new MilestoneSheet();
  return milestoneSheet.updateMilestone(milestoneData);
}

global.deleteMilestone = (milestoneId) => {
  const milestoneSheet = new MilestoneSheet();
  return milestoneSheet.deleteMilestone(milestoneId);
}



import {getCurrentUser} from './server_currentUser';
global.getCurrentUser = getCurrentUser;

import {testButtonClicked, testButtonClicked3, currentTestFunction} from './server_testFunctions';
global.testButtonClicked = testButtonClicked;
global.testButtonClicked3 = testButtonClicked3;
global.currentTestFunction = currentTestFunction;


global.urlParams = {};

global.doGet = (e) => {
   //Logger.log("opening");  
    global.urlParams = e.parameter;
    //let sheetNames = PropertiesService.getScriptProperties().getProperty('allSkillTreeSheetNames');
    PropertiesService.getScriptProperties().setProperty('urlParams', JSON.stringify(global.urlParams));  
    let page= e.parameter.page;
    if(!page || page === "html_BrowseSkillTrees"){ // changed this filename to html_SkillTreeBrowser. Remove this part of the logic  in a day or two.
      page = 'html_SkillTreeBrowser'; // html_BrowseSkillTrees
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
    // Logger.log("making thumb ", thumbname);
// commenting out for now, until we install the ImgApp library     
/*
let res = ImgApp.doResize(file.getId(), newWidth);
    imageFolder.createFile(res.blob.setName(thumbname));  
*/
}

  
function getFileBlob(filename){
    // https://developers.google.com/apps-script/reference/base/blob
   // Logger.log("looking for ", filename);
   let files = DriveApp.getFilesByName(filename);
   while (files.hasNext()) {
     let file = files.next();
     let blob = file.getBlob();
     // Logger.log("got blob");
     return  { blob: blob.getBytes(),
               contentType : blob.getContentType()
             };
   } 
   //   Logger.log("returning false");
   return false;
}

function getSlideEmbedUrl(presentationId) {
  return `https://docs.google.com/presentation/d/${presentationId}/embed?start=true&loop=true&delayms=3000`;
}

global.getScriptUrl = () => {
  let url = ScriptApp.getService().getUrl();
  let urlParams = PropertiesService.getScriptProperties().getProperty('urlParams');
  if(urlParams){
    urlParams = JSON.parse(urlParams);
  }else{
    urlParams = {};
  }
  // iterate through the urlParams object to construct the full url
  let fullUrl = url + "?";
  let keys = Object.keys(urlParams);
  for (let i = 0; i < keys.length; i++) {
    // make value url encoded
    let value = encodeURIComponent(urlParams[keys[i]]);
    fullUrl += keys[i] + "=" + value + "&";
  }
  return {url : url, fullUrl : fullUrl, params : urlParams};
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

global.flagImportant = (skillTreeName, skillTreeItemID) => {
  Logger.log("flagging important", skillTreeName, skillTreeItemID);
  let skillTreeSheet = new SkillTreeSheet();
  skillTreeSheet.sheetName = skillTreeName;
  let newRow = skillTreeSheet.flagImportant(skillTreeName, skillTreeItemID);
  Logger.log("newRow");
  Logger.log(newRow);
  return newRow;
}
