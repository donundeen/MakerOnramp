  
const  testButtonClicked = () => {
    //Logger.log("testButtonClicked");
    return "I ran testButtonClicked";
};

const  testButtonClicked3 = () => {
    //Logger.log("testButtonClicked");
    return "I ran testButtonClicked3";
};

const currentTestFunction = () => {
    Logger.log("currentTestFunction addSkillTreeItemForStudent");
    let skillTreeName = "3D Printing";
    let itemName = "Put_on_your_first_3D_Print";
    let studentId = "dundeen@lcc.ca";
    let result = global.addSkillTreeItemForStudent(studentId, skillTreeName, itemName);
//    let result = global.flagImportant(skillTreeName, itemName, studentId) ;
    Logger.log("result");
    Logger.log(result);
    return result;
};
  



export {testButtonClicked, testButtonClicked3, currentTestFunction};