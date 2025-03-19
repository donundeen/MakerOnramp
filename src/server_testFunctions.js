  
const  testButtonClicked = () => {
    //Logger.log("testButtonClicked");
    return "I ran testButtonClicked";
};

const  testButtonClicked3 = () => {
    //Logger.log("testButtonClicked");
    return "I ran testButtonClicked3";
};

const currentTestFunction = () => {
    Logger.log("currentTestFunction flagImportant");
    let result = global.submitStudentSkillTreeItem("dundeen@lcc.ca", "3D Printing", "Understand_the_basics_of_3D_printer_safety_and_responsibility");
    Logger.log(result);
    return result;
};
  



export {testButtonClicked, testButtonClicked3, currentTestFunction};