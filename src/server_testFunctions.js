  
const  testButtonClicked = () => {
    Logger.log("testButtonClicked");
    return "I ran testButtonClicked";
};

const  testButtonClicked3 = () => {
    Logger.log("testButtonClicked");
    return "I ran testButtonClicked3";
};

const currentTestFunction = function(){
    let result = global.getSkillTreeItemsForStudent("dundeen@lcc.ca");
    Logger.log(result);
    return result;
};
  


export {testButtonClicked, testButtonClicked3, currentTestFunction};