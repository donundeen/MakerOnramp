class Sheet {
    constructor() {
        this.spreadsheetID = false ;
        this.sheetName = false;
        this.sheet = null;
        this.myclass = "sheet"; 
        Logger.log(" parent constructor");
        Logger.log(this);
    }

    getAllSheetNames(){
        return SpreadsheetApp.openById(this.spreadsheetID).getSheets().map(sheet => sheet.getName().trim());
    }


    loadSheet(){
        if(!this.sheet){
            Logger.log("loading sheet :  ")
            Logger.log(this.spreadsheetID + " | " + this.sheetName + " | " + this.myclass);
            this.sheet = SpreadsheetApp.openById(this.spreadsheetID).getSheetByName(this.sheetName);
            Logger.log("sheet loaded");
            Logger.log(this.sheet);
        }
    }

        
    dataIntoHashRows(data, keysRow, startRow, filterFunction){
        this.foo = "bar"; // otherwise lint complains about not using "this
        let idKey= {};
        let keyId= {};
        let newData = [];
        
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
        
      
    getSheetRows(filterFunction) {
        this.loadSheet();
        const data = this.sheet.getDataRange().getValues();
        const hashData = this.dataIntoHashRows(data, 0, 1, filterFunction);
        return hashData;
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
    
    
    updateHashRow(data, keysrow, updateKeys){
        let to_continue = this._updateHashRow(data, keysrow, updateKeys);
        return to_continue;
    }
    
    _updateHashRow(data, keysrow, updateKeys){
        this.loadSheet();
        //Logger.log("updating2");
        let insertArray = [];
        let idKey= {};
        let keyId= {};
        
        let range = "A"+(keysrow+1).toString() +":"+(keysrow+1).toString();
    
        let tableMetaData = this.sheet
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
        
        let index = this.findRowNumForQuery(keysrow, keysrow + 1, (row) => {
            //Logger.log("updateKeys");
            let updateKeysKeys = Object.keys(updateKeys);
            //Logger.log(updateKeysKeys);
            for(let i = 0; i < updateKeysKeys.length; i++){
                let key = updateKeysKeys[i];
                let value = updateKeys[key];      
                //Logger.log(key + " : " + value + " : " + row[key]);
                if(row[key] !== value){
                    return false;
                }
            }
            return true;
        });
        
        //  Logger.log("returning ", index);
        if(!index){
            return false; 
        }
        let toDelete = index + 1;
        
        if(index){
           this.sheet.deleteRow(toDelete);
        }
        this.sheet.appendRow(insertArray);
        
        return index; 
    }
    
    
    findRowNumForQuery(keysRow, startRow, queryFunction){
        this.loadSheet();
        let tableData = this.sheet.getDataRange().getValues();
    
        let data = this.dataIntoHashRows(tableData, keysRow, startRow).data;
        
        for (let i = 0; i < data.length; i++) { 
            let res = queryFunction(data[i]);
            if(res === true){
                return i + startRow;
            }
        }
        return false;
    }
    
    insertHashRow(data, keysrow){
        this.loadSheet();
        let insertArray = [];
        let idKey= {};
        let keyId= {};
        
        let range = "A"+(keysrow+1).toString() +":"+(keysrow+1).toString();
    
        let tableMetaData = this.sheet
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
        
        this.sheet.appendRow(insertArray);
    }
    
}

export {Sheet};