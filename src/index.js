import getEmailAddress from './email';
//import jsonToSpreadsheet from './jsontospreadhsheet';
import {testButtonClicked, testButtonClicked3, jsonToSpreadsheet, listJsonFiles, getAllSkillTreeRows} from './clientCallableFunctions';
import {dataIntoHashRows, updateHashRow, insertHashRow, getSheetRows} from './crudOperations';  

global.getEmailAddress = getEmailAddress;
global.jsonToSpreadsheet = jsonToSpreadsheet;
global.testButtonClicked = testButtonClicked;
global.testButtonClicked3 = testButtonClicked3;
global.listJsonFiles = listJsonFiles;
global.dataIntoHashRows = dataIntoHashRows;
global.updateHashRow = updateHashRow;
global.insertHashRow = insertHashRow;
global.getSheetRows = getSheetRows;
global.getAllSkillTreeRows = getAllSkillTreeRows;

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
  let spreadsheetID = "12GfSYyx1oIm2V-ZpDOqA7wBXeEbXLjihPP8Txem5J5Q";
  let sheetName = "3D Printing and Modeling";
  let filename = "3D_Printing.json";
  let result =  jsonToSpreadsheet(filename, spreadsheetID,sheetName );
  Logger.log(result);
  return result;
}

global.currentTestFunction = function(){
  let result = global.getAllSkillTreeRows();
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