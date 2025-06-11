import { SlideDeck } from "./serverClass_SlideDeck";

const processReviewSkillTrees = () => {
    let skillTreeSheet = new SkillTreeSheet();
    const sheetNames = skillTreeSheet.getAllSkillTreeSheetNames();

    let SkillTreesColumns = ["SkillTreeName", "SkillTreeItemID", "Title", "Level", "Icon", "DocumentationSlidesLink", "DocumentationStatus", "DocumentationLastUpdated", "DocumentationNumSlides"];
    const resourcesFolder = DriveApp.getFoldersByName("SkillTreeItemDocumentation").next();
    const resourcesFolderName = "SkillTreeItemDocumentation";



  //  processSkillTreeSheet("3D Modeling");
//    processSkillTreeSheet("Crafting");

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
        Logger.log("processing skillTreeItem");
        Logger.log(row);

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
            let slideDeck = getDocumentationSlideDeckFromUrl(documentationSlideLink);
            // check if the documentation slide deck exists
            if(slideDeck){
                Logger.log("slideDeck: " + slideDeck.slideDeckName);
                // check if the documentation slide deck has been updated since the last recorded update date
                let documentationSlideDeckLastUpdated = slideDeck.getLastUpdated();
                let fileLastUpdated = slideDeck.lastUpdatedDateString;
                let oldDocumentationLastUpdated = getUsefulDate(row.DocumentationLastUpdated);
                if(fileLastUpdated && oldDocumentationLastUpdated !== fileLastUpdated){
                    Logger.log("documentationSlideDeck date has been updated");
                    Logger.log(fileLastUpdated + "  : " + oldDocumentationLastUpdated);
                    row.DocumentationLastUpdated = fileLastUpdated;
                    doUpdate = true;
                }
                // count the number of slides in the documentation slide deck
                if(!row.DocumentationNumSlides || slideDeck.numberOfSlides !== parseInt(row.DocumentationNumSlides, 10)){
                    Logger.log("updating numberOfSlides: " + slideDeck.numberOfSlides);
                    row.DocumentationNumSlides = slideDeck.numberOfSlides
                    doUpdate = true;
                }
                // if there's more than 1 slide and the documentation status is "created", update it to "started", because some work has been done
                if(row.DocumentationStatus.trim() === ""){
                    row.DocumentationStatus = "created";
                    doUpdate = true;
                }
                if(slideDeck.numberOfSlides > 1 && row.DocumentationStatus.trim() === "created"){
                    row.DocumentationStatus = "started";
                    doUpdate = true;
                }
                if(slideDeck.numberOfSlides === 1 && (row.DocumentationStatus.trim() === "created" || row.DocumentationStatus.trim() === "important" || row.DocumentationStatus.trim() === "started")){
                    // https://developers.google.com/apps-script/reference/slides/slide
                    // we want to make the first slide hold the title, description, and level
                    Logger.log("numberOfSlides === 1 and DocumentationStatus is created, adding title to first slide");
                    slideDeck.createDocumentationTitleSlide(row.SkillTreeName, row.Title, row.Level);
                }
            }else{
                Logger.log("documentationSlideDeck is not there");
            }
        }else{
            Logger.log("documentationSlideLink is not there");
            const documentTitle = row.SkillTreeName + " - " + row.Title;
            let slideDeck = createDocumentationSlideDeck(documentTitle);
            row.DocumentationSlidesLink = slideDeck.slideDeckUrl;
            row.DocumentationStatus = "created";
            row.DocumentationNumSlides = slideDeck.numberOfSlides;
            row.DocumentationLastUpdated = slideDeck.lastUpdatedDateString;
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
        let slideDeck = createPresentationInResourcesFolder(documentTitle);
        return slideDeck;
    }


    function getDocumentationSlideDeckFromId(documentationSlideDeckId){
        // get the documentation slide deck from the documentation slide deck id
        let slideDeck = new SlideDeck();
        slideDeck.setStorageFolder(resourcesFolderName);
        slideDeck.slideDeckId = documentationSlideDeckId;
        let result = slideDeck.loadSlideDeck();
        if(result){
            return slideDeck;
        }
        return false;
    }
    function getDocumentationSlideDeckFromUrl(documentationSlideDeckUrl){
        // get the documentation slide deck from the documentation slide deck id
        let slideDeck = new SlideDeck();
        slideDeck.setStorageFolder(resourcesFolderName);
        slideDeck.slideDeckUrl = documentationSlideDeckUrl;
        let result = slideDeck.loadSlideDeck();
        if(result){
            return slideDeck;
        }
        return false;
    }


    function createPresentationInResourcesFolder(documentTitle) {
        // Step 1: Create the presentation

        let slideDeck = new SlideDeck();
        slideDeck.setStorageFolder(resourcesFolderName);
        slideDeck.slideDeckName = documentTitle;
        let result = slideDeck.createNewSlideDeck();

        if(result){
            return slideDeck;
        }
        return false;
    }
}

export {processReviewSkillTrees};
