import getEmailAddress from './email';

global.getEmailAddress = getEmailAddress;

global.doGet = (resE) => {
    const text = '<b>I heart Apps Script...</b>';
    const output = HtmlService.createHtmlOutput(text);
    output.setTitle(text);
    output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
    output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return output;
};
