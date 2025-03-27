// https://developers.google.com/apps-script/reference/slides/slides-app
// https://developers.google.com/apps-script/reference/slides/presentation 

class SlideDeck {
    constructor(){
        this.storageFolderName = false;
        this.storageFolder = false;
        this.storageFolderId = false;
        this.slideDeckObject = false;
        this.slideDeckName = false;
        this.slideDeckId = false;
        this.slideDeckUrl = false;
        this.slideDeckFile = false;
        this.numberOfSlides = 0;
        this.pageWidth = 0;
        this.pageHeight = 0;
        this.lastUpdated = false;
        this.lastUpdatedDateString = false;
    }

    setStorageFolder(storageFolderName){
        this.storageFolderName = storageFolderName;
        this.storageFolder = DriveApp.getFoldersByName(storageFolderName).next();
        this.storageFolderId = this.storageFolder.getId();
    }

    setStorageFolderId(storageFolderId){
        Logger.log("setting storage folder id: " + storageFolderId);
        this.storageFolder = DriveApp.getFolderById(storageFolderId);
        this.storageFolderId = this.storageFolder.getId();
        this.storageFolderName = this.storageFolder.getName();
        Logger.log("storage folder id: " + this.storageFolderId);
        Logger.log("storage folder name: " + this.storageFolderName);
    }

    loadSlideDeck(){
        if(!this.slideDeckId && this.slideDeckUrl){
            this.slideDeckId = this.getIDFromUrl(this.slideDeckUrl);
        }
        if(this.slideDeckId){
            this.openSlideDeck();
            this.getSlideDeckInfo();
        }
        if(this.slideDeckFile){
            this.getSlideDeckInfo();
            return true;
        }
        return false;
        
    }

    createNewSlideDeck(title){
        if(title){
            this.slideDeckName = title;
        }
        if(!this.slideDeckName){
            return false;
        }
        this.createSlideDeck();
        this.getSlideDeckInfo();
        return true;
    }

    getSlideDeckInfo(){
        this.getDimensions();
        this.getLastUpdated();
        this.getNumberOfSlides();
        // Log the URL of the presentation
        this.slideDeckUrl = this.slideDeckObject.getUrl();
        this.slideDeckName = this.slideDeckObject.getName();
        this.slideDeckId = this.slideDeckObject.getId();
    }



    openSlideDeck(){
        Logger.log("getting file from id: " + this.slideDeckId);
        this.slideDeckFile = DriveApp.getFileById(this.slideDeckId);
        Logger.log("getting documentation slide deck from id: " + this.slideDeckId);
        this.slideDeckObject = SlidesApp.openById(this.slideDeckId);
    }

    createSlideDeck(){
        Logger.log("creating slide deck: " + this.slideDeckName);
        this.slideDeckObject = SlidesApp.create(this.slideDeckName);
        //Logger.log("1 presentation: " + presentation);
    
        // Step 2: Get the file ID of the created presentation
        this.slideDeckId = this.slideDeckObject.getId();
        //Logger.log("Presentation ID: " + presentationId);
    
        // Step 3: Move the presentation to the resources folder
        this.slideDeckFile = DriveApp.getFileById(this.slideDeckId);
        this.slideDeckFile.moveTo(this.storageFolder);
    }

    getIDFromUrl(url){
        Logger.log("parsing url: " + url);
        // links look like https://docs.google.com/open?id=1B84r9s_R2AKPT7r3jkovDl-tFvSR3awBcQzwC0AoA_c or https://docs.google.com/open?id=1B84r9s_R2AKPT7r3jkovDl-tFvSR3awBcQzwC0AoA_c&usp=sharing
        // make a regex to find everything after id= and before & or the end of the string
        const regex = /id=([A-Za-z0-9-_]+)/;
        const match = url.match(regex);
        Logger.log("match: " + match[1]);
        return match[1];
    }        

    getNumberOfSlides(){
        this.numberOfSlides = this.slideDeckObject.getSlides().length;
        return this.numberOfSlides;
    }

    getDimensions(){
        this.getPageWidth();
        this.getPageHeight();
        return {
            pageWidth: this.pageWidth,
            pageHeight: this.pageHeight
        };
    }

    getPageWidth(){
        this.pageWidth = this.slideDeckObject.getPageWidth();
        return this.pageWidth;
    }

    getPageHeight(){
        this.pageHeight = this.slideDeckObject.getPageHeight();
        return this.pageHeight;
    }

    getLastUpdated(){
        this.lastUpdated = this.slideDeckFile.getLastUpdated();
        this.lastUpdatedDateString = this.getUsefulDate(this.lastUpdated);
        return this.lastUpdatedDateString;
    }
    
    getUsefulDate(dateObject){
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
    
    createDocumentationTitleSlide(skillTreeName, skillTreeItemName, skillTreeItemLevel){
        let slides = this.slideDeckObject.getSlides();
        let titleSlide = slides[0];
        titleSlide.getShapes().forEach(shape => {
            shape.remove();
        });

        // set the title, description, and level on the first slide
        const shape = titleSlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 0, 0, this.pageWidth, this.pageHeight);
        shape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
        const textRange = shape.getText();
        textRange.setText(skillTreeName + " \n\n " + skillTreeItemName + " \n\n Level " + skillTreeItemLevel);
        // resize the text to fit the shape, being as large as possible
        textRange.getTextStyle().setFontSize(40);
        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
//                    textRange.getTextStyle().setFontSize(100);
        textRange.getTextStyle().setFontFamily("Georgia");
        textRange.getTextStyle().setForegroundColor("#000000");
        textRange.getTextStyle().setBold(true);
    }

    createStudentDocumentationTitleSlide(studentID, skillTreeName, skillTreeItemTitle, skillTreeItemLevel){
        let slides = this.slideDeckObject.getSlides();
        let titleSlide = slides[0];
        titleSlide.getShapes().forEach(shape => {
            shape.remove();
        });

        // set the title, description, and level on the first slide
        const shape = titleSlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 0, 0, this.pageWidth, this.pageHeight);
        shape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
        const textRange = shape.getText();
        textRange.setText("My Evidence Journal for\n" + skillTreeName + " \n " + skillTreeItemTitle + " \n Level " + skillTreeItemLevel + "\n"+studentID) ;
        // resize the text to fit the shape, being as large as possible
        textRange.getTextStyle().setFontSize(40);
        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
//                    textRange.getTextStyle().setFontSize(100);
        textRange.getTextStyle().setFontFamily("Georgia");
        textRange.getTextStyle().setForegroundColor("#000000");
        textRange.getTextStyle().setBold(true);        
    
    }
    
    getSlideWithText(text){
        let slides = this.slideDeckObject.getSlides();
        let found = -1;
        for(let i = 0; i < slides.length; i++){
            let slide = slides[i];
            let shapes = slide.getShapes();
            if(shapes){
                for(let j = 0; j < shapes.length; j++){
                    let shape = shapes[j];
                    let theText = shape.getText();
                    if (theText && theText.asString().includes(text)){
                        Logger.log("slide found at: " + i);
                        found = i;
                    }
                }
            }
        }
        if(found !== -1){
            return [found, slides[found]];
        }
        return [found, false];
    }

    getSlidesAfterSlideWithText(text){
        Logger.log("looking for slides after slide with text: " + text);
        let [index, slide] = this.getSlideWithText(text);
        if (index === -1){
            return false;
        }
        Logger.log("slide found:");
        let slides = this.slideDeckObject.getSlides();
        return slides.slice(index);
    }

    copyEvidenceSlidesFromDeck(deck){
        let slides = deck.getSlidesAfterSlideWithText("[Your Evidence Slides]");
        if (!slides){
            return false;
        }
        Logger.log("appending slides: " + slides.length);
        for(let i = 0; i < slides.length; i++){
            let slide = slides[i];
            Logger.log("appending slide");
            this.slideDeckObject.appendSlide(slide);
        }
        return true;
    }
}

export { SlideDeck };