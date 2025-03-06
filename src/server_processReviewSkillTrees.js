
const processReviewSkillTrees = () => {
    let skillTreeSheet = new SkillTreeSheet();
    const sheetNames = skillTreeSheet.getAllSkillTreeSheetNames();

    let SkillTreesColumns = ["SkillTreeName", "SkillTreeItemID", "Title", "Level", "Icon", "DocumentationSlidesLink", "DocumentationStatus", "DocumentationLastUpdated", "DocumentationNumSlides"];
    const resourcesFolder = DriveApp.getFoldersByName("SkillTreeItemDocumentation").next();


/*
    processSkillTreeSheet("Woodworking");
    processSkillTreeSheet("Crafting");
*/
    // use array iteratores instead of a for loop
    
    sheetNames.forEach(sheetName => {
        processSkillTreeSheet(sheetName);
    });
    

    function processSkillTreeSheet(sheetName){
        Logger.log("processing sheetName: " +sheetName);
        skillTreeSheet.sheetName = sheetName;
        let rows = skillTreeSheet.getSheetRows();

        let columnsUpdated = confirmColumns(rows);
        if(columnsUpdated){
            rows = skillTreeSheet.getSheetRows();
        }
        
        rows.data.forEach(row => {
            processSkillTreeItem(row);
        });
    }

    function confirmColumns(rows){
        const columns = Object.keys(rows.keyId);
        let columnsToAdd = [];
        let columnsUpdated = false;
        // check if all the columns are there
        SkillTreesColumns.forEach(column => {
            if(!columns.includes(column)){
                columnsToAdd.push(column);
            }
        });
        if(columnsToAdd.length > 0){
            // add the columns to the spreadsheet
            skillTreeSheet.addColumns(columnsToAdd, columns.length + 1);
            columnsUpdated = true;
        }        
        return columnsUpdated;
    }

    function processSkillTreeItem(row){
      //  Logger.log("processing skillTreeItem");
        //Logger.log(row);

        /*
-- scan the documentation slides for updates
-- update the SkillTrees spreadsheet:
        */
       let doUpdate = false;

       doUpdate = processDocumentationSlide(row) || doUpdate;
       if(doUpdate){
        Logger.log("doUpdate: ");
        Logger.log(row);
            skillTreeSheet.updateHashRow(row, 0, {"SkillTreeName":row.SkillTreeName, "SkillTreeItemID":row.SkillTreeItemID});
       }
    }



    function processDocumentationSlide(row){
        let documentationSlideLink = row.DocumentationSlidesLink;
        let doUpdate = false;

        documentationSlideLink = documentationSlideLink.trim();
        if(documentationSlideLink && documentationSlideLink.length > 0){
            let documentationSlideId = getDocumentionSlideDeckId(documentationSlideLink);
            let [documentationSlideDeck, documentationFile] = getDocumentationSlideDeck(documentationSlideId);
            // check if the documentation slide deck exists
            if(documentationSlideDeck){
                // check if the documentation slide deck has been updated since the last recorded update date
                let documentationSlideDeckLastUpdated = documentationFile.getLastUpdated();
                let fileLastUpdated = getUsefulDate(documentationSlideDeckLastUpdated);
                let oldDocumentationLastUpdated = getUsefulDate(row.DocumentationLastUpdated);
                if(fileLastUpdated && oldDocumentationLastUpdated !== fileLastUpdated){
                    Logger.log("documentationSlideDeck date has been updated");
                    Logger.log(fileLastUpdated + "  : " + oldDocumentationLastUpdated);
                    row.DocumentationLastUpdated = fileLastUpdated;
                    doUpdate = true;
                }
                // count the number of slides in the documentation slide deck
                let slides = documentationSlideDeck.getSlides();
                let numberOfSlides = slides.length;
                if(!row.DocumentationNumSlides || numberOfSlides !== parseInt(row.DocumentationNumSlides, 10)){
                    Logger.log("updating numberOfSlides: " + numberOfSlides);
                    row.DocumentationNumSlides = numberOfSlides;
                    doUpdate = true;
                }
                // if there's more than 1 slide and the documentation status is "created", update it to "started", because some work has been done
                if(row.DocumentationStatus.trim() === ""){
                    row.DocumentationStatus = "created";
                    doUpdate = true;
                }
                if(numberOfSlides > 1 && row.DocumentationStatus.trim() === "created"){
                    row.DocumentationStatus = "started";
                    doUpdate = true;
                }
            }else{
                Logger.log("documentationSlideDeck is not there");
            }
        }else{
            Logger.log("documentationSlideLink is not there");
            const documentTitle = row.SkillTreeName + " - " + row.Title;
            let documentationSlideDeckLink = createDocumentationSlideDeck(documentTitle);
            row.DocumentationSlidesLink = documentationSlideDeckLink;
            row.DocumentationStatus = "created";
            row.DocumentationNumSlides = 1;
            row.DocumentationLastUpdated = getUsefulDate(new Date());
            doUpdate = true;
        }
        return doUpdate;
    }


    function getUsefulDate(dateObject){
        // get date string including time in formaat YYYY-MM-DD HH:MM:SS
        // use eastern time zone
        dateObject = new Date(dateObject.toLocaleString("en-US", { timeZone: "America/New_York" }));
        Logger.log(dateObject);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const day = dateObject.getDate();
        const hour = dateObject.getHours();
        const minute = dateObject.getMinutes();
        const second = dateObject.getSeconds();
        const dateString = year + "-" + month + "-" + day + " " + hour + ":" + minute;
        Logger.log("dateString: " + dateString);
        return dateString;
    }

    function createDocumentationSlideDeck(documentTitle){
        let documentationSlideDeckLink = createPresentationInResourcesFolder(documentTitle);
        return documentationSlideDeckLink;
    }

    function getDocumentionSlideDeckId(documentationSlideLink){
        // get the documentation slide deck id from the documentation slide link
        let documentationSlideDeckId = parseUrl(documentationSlideLink);
        return documentationSlideDeckId;
    }

    function getDocumentationSlideDeck(documentationSlideDeckId){
        // get the documentation slide deck from the documentation slide deck id
        Logger.log("getting file from id: " + documentationSlideDeckId);
        let documentationFile = DriveApp.getFileById(documentationSlideDeckId);
        Logger.log("getting documentation slide deck from id: " + documentationSlideDeckId);
        let documentationSlideDeck = SlidesApp.openById(documentationSlideDeckId);
        return [documentationSlideDeck, documentationFile];
    }

    function parseUrl(url){
        Logger.log("parsing url: " + url);
        // links look like https://docs.google.com/open?id=1B84r9s_R2AKPT7r3jkovDl-tFvSR3awBcQzwC0AoA_c or https://docs.google.com/open?id=1B84r9s_R2AKPT7r3jkovDl-tFvSR3awBcQzwC0AoA_c&usp=sharing
        // make a regex to find everything after id= and before & or the end of the string
        const regex = /id=(.*)&?/;
        const match = url.match(regex);
        return match[1];
    }

    function createPresentationInResourcesFolder(documentTitle) {
        // Step 1: Create the presentation
        const presentation = SlidesApp.create(documentTitle);
        //Logger.log("1 presentation: " + presentation);
    
        // Step 2: Get the file ID of the created presentation
        const presentationId = presentation.getId();
        //Logger.log("Presentation ID: " + presentationId);
    
        // Step 3: Move the presentation to the resources folder
        const presentationFile = DriveApp.getFileById(presentationId);
        resourcesFolder.addFile(presentationFile); // Move the file to the resources folder
        DriveApp.getRootFolder().removeFile(presentationFile); // Optionally remove it from the root folder
    
        // Log the URL of the presentation
        const documentationSlidesLink = presentation.getUrl();
        //Logger.log("documentationSlidesLink: " + documentationSlidesLink);
        return documentationSlidesLink;
    }


}

export {processReviewSkillTrees};
