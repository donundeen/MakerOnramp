/*
This is the main server side file for the Skill Tree project.
It is used to expose server side functions to the client side.
It is also used to store the dataVersion, which is used to force a reload of all data on the client side.
*/

// change this when the server side data changes - forces a reload of all data on client side
// TBD - move into a spreadsheet, admin tool or something...
global.dataVersion = 2;

// set up global variables
global.SkillTreeSpreadsheetID = "12GfSYyx1oIm2V-ZpDOqA7wBXeEbXLjihPP8Txem5J5Q";
global.StudentSkillTreeItemSpreadsheetID = "1mWXAAge-BXtLS6JKesWHL2bmXzn0HMk5NKEhsi8HRro";
global.StudentFilesFolderID = "1v_QKeoMEWNniwoevSglOpfYN0wukjoNm";
global.MilestoneSpreadsheetID = "1WeYGNt2Yp25JyhEjUBxtWhp06VVFh0evr-SYF9Pbg8U";

global.urlParams = {}; // this is used to store the url parameters for the current page



// import server side functions from other files
// this function reviews all the skill trees and updates the items as necessary.
// this ould involve creating new slide decks, created IDs, etc.
import {processReviewSkillTrees} from './server_processReviewSkillTrees';
global.processReviewSkillTrees = processReviewSkillTrees;

// this function converts a JSON file to a spreadsheet. 
// having done it once, we are unlikely to do it again.
import {jsonToSpreadsheet, listJsonFiles, runJSONToSpreadsheet} from './server_processJSONSkillTrees';
global.jsonToSpreadsheet = jsonToSpreadsheet;
global.runJSONToSpreadsheet = runJSONToSpreadsheet;
global.listJsonFiles = listJsonFiles;

// import the class for the skill tree sheet
// this class does all the server-side things related to 
// the skill tree itself, and its items..
import {SkillTreeSheet} from './serverClass_SkillTreeSheet';
global.SkillTreeSheet = SkillTreeSheet;

// import the class for the student skill tree item sheet
// this class does all the server-side things related to 
// students collecting and modifying their implemenation of a skill tree item.
import {StudentSkillTreeItemSheet} from './serverClass_StudentSkillTreeItemSheet';
global.StudentSkillTreeItemSheet = StudentSkillTreeItemSheet;

// milestones represent goals that a student can work towards by collecting skill tree items. 
// this sheet is used to manage the milestones, and to track the progress of the student towards them.
// the description of the requirements to reach a milestone may be complicated.
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

// this function is used to flag an item as important.
global.flagImportant = (skillTreeName, skillTreeItemID) => {
  Logger.log("flagging important", skillTreeName, skillTreeItemID);
  let skillTreeSheet = new SkillTreeSheet();
  skillTreeSheet.sheetName = skillTreeName;
  let newRow = skillTreeSheet.flagImportant(skillTreeName, skillTreeItemID);
  Logger.log("newRow");
  Logger.log(newRow);
  return newRow;
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

global.getMilestones = () => {
  const milestoneSheet = new MilestoneSheet();
  return milestoneSheet.getMilestones();
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

// implementing some test functions that could be used for any purpose. 
// usually they are run from the google apps script IDE, but they could be run from the client side.
import {testButtonClicked, testButtonClicked3, currentTestFunction} from './server_testFunctions';
global.testButtonClicked = testButtonClicked;
global.testButtonClicked3 = testButtonClicked3;
global.currentTestFunction = currentTestFunction;




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


// the function is used to include a file in the html output.
// it is used to include the html files for the pages.
global.include = (filename) => {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

// the function is used to include a template in the html output.
// it is used to include the html files for the pages.
global.includeTemplated = (filename) => {
  return HtmlService.createTemplateFromFile(filename)
  .evaluate()
  .getContent();
}

// not in use yet, but this function can be used to create a thumbnail of a file.
function makeThumbnail(file, thumbname, newWidth){
    // Logger.log("making thumb ", thumbname);
// commenting out for now, until we install the ImgApp library     
/*
let res = ImgApp.doResize(file.getId(), newWidth);
    imageFolder.createFile(res.blob.setName(thumbname));  
*/
}

// this function is used to get the blob of a file.
// it is used to get the blob of a file for the client side.
// this way you can have images in google drive, and show them in a web page 
// by including the BLOB data in the img tag.
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

// this function is used to get the embed url of a google slide presentation.
// it is used to get the embed url of a google slide presentation for the client side.
// this way you can have google slides in google drive, and show them in a web page 
// by including the embed url in the iframe tag.
function getSlideEmbedUrl(presentationId) {
  return `https://docs.google.com/presentation/d/${presentationId}/embed?start=true&loop=true&delayms=3000`;
}

// this function is used to get the script url.
// we need it for navigation, because the client side javascript only know the url of the iframe that it's in,
// and that's generated by google apps script, and useless for navigation.
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


// this function is used to get the data that is needed at every page load.
// this includes the dataVersion, the current url, and the current user.
// generally you get this before you get anything else, and you never cache it.
global.getEveryPageLoadData = () => {
  return {
    dataVersion : global.dataVersion,
    currentUrl : global.getScriptUrl(),
    currentUser : global.getCurrentUser()
  }
}

