import getEmailAddress from './email';

global.getEmailAddress = getEmailAddress;

/*
global.doGet = (resE) => {
    const text = '<b>I heart Apps Script...</b>';
    const output = HtmlService.createHtmlOutput(text);
    output.setTitle(text);
    output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
    output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return output;
};
*/


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
  


function makeThumbnail(file, thumbname, newWidth){
    Logger.log("making thumb ", thumbname);
// commenting out for now, until we install the ImgApp library     
/*
let res = ImgApp.doResize(file.getId(), newWidth);
    imageFolder.createFile(res.blob.setName(thumbname));  
*/
}
  
  
  
  function dataIntoHashRows(data, keysRow, startRow, filterFunction){
    let idKey= {};
    let keyId= {};
    let newData = [];
    Logger.log("data");
  
    for (let k = 0; k < data[keysRow].length; k++) { 
      // key is text, k is number
  
      let key = data[keysRow][k];
      key = key.replace("?","");
      key = key.replace("'","");
      key = key.replace(":","");
      if(key.trim() === ""){
         continue;
      }
      
      idKey[k] = key;
      keyId[key] = k;
    }
      
    for (let i = startRow; i < data.length; i++) { 
      let newRow = {};
      for (let j = 0; j < data[i].length; j++) { 
        if(!idKey[j] || idKey[j].trim() === ""){
          continue; 
        }
        newRow[idKey[j]] = data[i][j];
      }
      newRow._Sheet_Row_ID = i;
      if(!filterFunction || filterFunction(newRow) === true){
        newData.push(newRow);
      }
    }
    
    return {data:newData, keyId: keyId, idKey: idKey};
    
  }
  
  
  
  
  
  /* 
  ============================ UPDATEHASHROW =================================
  update a row in a sheet. Use column names as keys.  
  table: the google sheets object
  data: the row, with column names as keys. Missing columns will be updated to 
  blank, NOT left alone.
  keysrow: which row of the table holds the column names (starts a 0, NOT 1)
  updateKey: object {key: column Name of identifying key of row to update 
  (eg 'NetId'), value : value for that cell in that row (eg 'dhu3')
  ============================================================================
  */
  
  
  function updateHashRow(table, data, keysrow, updateKeys){
  
    let to_continue = _updateHashRow(table, data, keysrow, updateKeys);
    
  }

  function _updateHashRow(table, data, keysrow, updateKeys){
    Logger.log("updating2");
    let insertArray = [];
    let idKey= {};
    let keyId= {};
      
    let range = "A"+(keysrow+1).toString() +":"+(keysrow+1).toString();
  
    let tableMetaData = table
    .getActiveSheet()
    .getRange(range)
    .getValues();  
    
    for (let k = 0; k < tableMetaData[0].length; k++) { 
      let key = tableMetaData[0][k];
      // key is text, k is number
      if(key.trim() === ""){
         continue;
      }
      insertArray.push(""); 
      idKey[k] = key;
      keyId[key] = k;
    }
     
    let datakeys = Object.keys(data);
  
    for(let i = 0; i < datakeys.length; i++){
      let key = datakeys[i];
      let k = keyId[key];
      insertArray[k] = data[key];
    }
    
    let index = findRowNumForQuery(table, keysrow, keysrow + 1, function(row){
      Logger.log("updateKeys");
      let updateKeysKeys = Object.keys(updateKeys);
      Logger.log(updateKeysKeys);
      for(let i = 0; i < updateKeysKeys.length; i++){
        let key = updateKeysKeys[i];
        let value = updateKeys[key];      
        Logger.log(key + " : " + value + " : " + row[key]);
        if(row[key] !== value){
          return false;
        }
      }
      return true;
    });
    
    Logger.log("returning ", index);
    if(!index){
      return false; 
    }
    let toDelete = index + 1;
    
    if(index){
      table.getActiveSheet().deleteRow(toDelete);
    }
    table.getActiveSheet().appendRow(insertArray);
    
    return index;
    
  }
  
  
  function findRowNumForQuery(table, keysRow, startRow, queryFunction){
    let tableData = table.getActiveSheet().getDataRange().getValues();
  
    let data = dataIntoHashRows(tableData, keysRow, startRow).data;
      
    for (let i = 0; i < data.length; i++) { 
      let res = queryFunction(data[i]);
      if(res === true){
        return i + startRow;
      }
    }
    return false;
  }
  
  
  function insertHashRow(table, data, keysrow){
    let insertArray = [];
    let idKey= {};
    let keyId= {};
      
    let range = "A"+(keysrow+1).toString() +":"+(keysrow+1).toString();
  
    let tableMetaData = table
    .getActiveSheet()
    .getRange(range)
    .getValues();  
    
    for (let k = 0; k < tableMetaData[0].length; k++) { 
      let key = tableMetaData[0][k];
      // key is text, k is number
      if(key.trim() === ""){
         continue;
      }
      insertArray.push(""); 
      idKey[k] = key;
      keyId[key] = k;
    }
     
    let datakeys = Object.keys(data);
  
    for(let i = 0; i < datakeys.length; i++){
      let key = datakeys[i];
      let k = keyId[key];
      insertArray[k] = data[key];
    }
    
    table.getActiveSheet().appendRow(insertArray);
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