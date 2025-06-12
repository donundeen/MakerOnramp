import {Sheet} from './serverClass_Sheet';

class MilestoneSheet extends Sheet {
    constructor() {
        super();
        this.sheetName = "Milestones";
        this.spreadsheetID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    }

    getMilestonesForStudent(studentId) {
        this.loadSheet();
        const data = this.getSheetRows();
        return data.data.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            requirements: this.parseRequirements(row.requirements)
        }));
    }

    parseRequirements(requirementsJson) {
        try {
            return JSON.parse(requirementsJson);
        } catch (e) {
            return [];
        }
    }

    createMilestone(milestoneData) {
        // Ensure requirements are stored as JSON string
        if (typeof milestoneData.requirements === 'object') {
            milestoneData.requirements = JSON.stringify(milestoneData.requirements);
        }
        this.loadSheet();
        return this.insertHashRow(milestoneData, 0);
    }

    updateMilestone(milestoneData) {
        // Ensure requirements are stored as JSON string
        if (typeof milestoneData.requirements === 'object') {
            milestoneData.requirements = JSON.stringify(milestoneData.requirements);
        }
        this.loadSheet();
        return this.updateHashRow(milestoneData, 0, { id: milestoneData.id });
    }

    deleteMilestone(milestoneId) {
        this.loadSheet();
        const data = this.getSheetRows();
        const rowIndex = data.data.findIndex(row => row.id === milestoneId);
        if (rowIndex !== -1) {
            this.sheet.deleteRow(rowIndex + 2); // +2 because of header row and 1-based indexing
            return true;
        }
        return false;
    }
}

// Export the MilestoneSheet class
//export default MilestoneSheet;
export {MilestoneSheet};