  
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
    let skillTreeName = "Robotics";
    let level = 1;
    let itemName = "test add skill tree item";
    let result = global.testAddSkillTreeItem(skillTreeName, level, itemName) ;
      
    Logger.log(result);
    return result;
};
  



export {testButtonClicked, testButtonClicked3, currentTestFunction};