  
const  testButtonClicked = () => {
    //Logger.log("testButtonClicked");
    return "I ran testButtonClicked";
};

const  testButtonClicked3 = () => {
    //Logger.log("testButtonClicked");
    return "I ran testButtonClicked3";
};

const currentTestFunction = () => {
    let result = global.getAllSkillTreeRows("Entrepreneurship");
    Logger.log(result);
    return result;
};
  



export {testButtonClicked, testButtonClicked3, currentTestFunction};