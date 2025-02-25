# FabLab Skill Tree App Software Design

# Views/Pages & Operations

## Browse Skill Trees

* Select Skill tree to view  
* View skill tree items organized by level  
* Display of Title, point value  
* Color/UI coding for status of skill tree item in general (published, documented) and in relation to student (started, ready for approval, complete, etc)  
* Link to skill tree item details

## Skill Tree Item Details

* one skill tree item shown  
* display skill tree name, title, level, point value  
* display student status in relation to skill tree item (started, submitted for approval, complete)  
* embed google slide documentation  
* links for student actions:  
  * collect  
* Link to student’s “My Skill Tree Item Details” page

## Browse Projects

* List of Projects  
* Show title, short summary, point value  
* link to project details page

## Project Details

* show project title, description, point value  
* potentially related skill tree items   
* Link for student to “start” this project  
* embed google slide documentation  
* display student status in relation to the project (started, submitted for approval, complete)  
* link to student’s “My Project Details” page

## Browse Milestones

* Show list of all milestones  
* Display title, short description, point value  
* show student’s progress towards each milestone, indicate if “complete”  
* ability to sort/filter by student progress  
* link to Milestone Details page

## Milestone Details

* Display title, description, point value  
* show student’s progress towards this milestone  
  * what they’ve done, what they still need to do  
  * links to related projects/skill tree item details pages  
* embed google slide documentation  
* link to students “my milestone details” page

## Browse Rewards

* List of all rewards  
* show title, short description, point requirement  
* indicate which ones students have cached in, and how many times  
* show which ones students have enough points for  
* link to “reward details” page

## Reward Details

* Title, description, point requirement  
* link to student “my reward details” page  
* embed google slide documentation  
* indicate if student has used this reward/number of times

## My Summary

* Show student name, email, ID number  
* ability to edit name, ID number  
* total number of points earned/spent/remaining  
* reward points claimed/cashed in  
* summary of  
  * number/status of skill tree items  
  * number/status of projects  
  * number of milestones by status  
  * number of rewards claimed  
  * number/status of projects

## My Skill Tree Items

* View all skill tree items connected by this student  
* organize by skill tree name  
* display: Skill tree name, skill tree item title, short description, level status, point value  
* UI elements to indicate status (started, for approval, complete)  
* sort/filter   
* link to My skill Tree Item Details page

## My Skill Tree Item Details

* Skill Tree Name, Item title, description, level, status, points  
* button to “uncollect”  
* embed Skill Tree Item Documentation  
* embed MY skill tree item evidence documentation \-Editable google slide deck  
* Button for “Submit for approval”

## My Projects

* List of all projects connected to student  
* Title, short description, status, points  
* UI elements to indicate status  
* link to “My Project Details” page

## My Project Details

* project title, description, points, status  
* related skill tree cards  
  * ability to search my connected skill tree cards and connect them to this project  
  * eg (I used “laser cut a box” as part of this project  
* related Project cards  
  * ability o search my connected projects and connect them to this project  
* ability to “uncollect”  
* button to “submit for approval”  
* embed project documentation   
* embed MY project documentation (editable)

## My Milestones

* Show title, short description, points  
* Note: a student doesn’t need to “collect” a milestone, any progress towards any milestone make it appear here  
* student can “watch” a milestone, which just means they are making concerted effort towards it  
* List of all milestones student is making progress towards  
* indicate if milestone is completed  
* filter/sort by progress level, “watching”, etc  
* indicate progress as a percentage, or n/m items complete  
* link to “my milestone details” page

## My Milestone Details

* title, short description, points  
* progress level,   
* related student project and skill tree items   
  * if those items are started, for approval, completed  
* Embed Milestone documentation slideshow  
* Emebed MY milestone evidence documentation slideshow

## My Rewards

* Title, short description, point cost  
* List of all rewards the student has claimed  
* summary of total points earned/rewards claimed/rewards cashed in/points remaining  
* indicate which ones the student has cashed in

## My Reward Details

* Title, description, point cost  
* indicate if student has cashed it in  
* if they haven’t cashed it in, they can “return” it

## Admin Skill Tree Items

* List of skill tree items, per skill tree  
* ability to delete item  
* sort  
* link to “admin skill tree item details”  
* link to “new skill tree item”  
* 

## Admin Skill Tree Item Details

create/edit skill tree item:

* Title,  
* short description  
* description  
* level  
* points

## Review Student Skill Tree Items

* review/approve skill tree items that are “for approval”  
* link to student’s documentation google slides  
* Link to set status to “approved” or “started” (ie not approved)  
* Teacher notes  
* Embed Skill Tree Item Documentation  
* Embed student documentation

## Review Student Projects

* Review student projects that are status “for approval”  
* embed project documentation  
* embed student MY project documentation  
* link to approve or send back to “started”  
* ability for teacher to make comments (comments in slide doc?)

## Review Student Milestones

* Review student milestones for which all requirements have been met  
* link to students “My milestone details” page  
* Can set status to “approved” after review  
* No need for students to submit “for review” since milestone achievement is automatic. Just needs teacher eyes on it to confirm all the prerequisites are legitimate

## Admin Student Rewards

* See all student claimed rewards  
* ability to mark them as “cashed in”

## Admin Projects

* List Projects  
* title, description, points  
* link to Admin Project Details/New Project

## Admin Project Details

* edit/create a project  
* title, description, points

## Admin Milestones

* List all milestones  
* Delete a milestone  
* link to “Admin Milestone Details” page

## Admin Milestone Details

* edit/create milestone  
* title, description, points  
* embed documentation slides, editable  
* Creating Requirements rules (see below)

## Admin Rewards

* List all rewards  
* Title, description, points  
* delete reward

## Admin Reward Details

* Edit/create reward  
* title, description, points required

# Milestone Requirements System

* X number of \[unique/non-unique\] Skill Tree Items from \[list of skill tree items\]   
* X points of  \[unique/non-unique\] Skill Tree Items from \[list\]  
* X number of  \[unique/non-unique\] projects from \[list of projects\]  
* X points of  \[unique/non-unique\] projects from \[list\]  
* X number of  \[unique/non-unique\] milestones from \[list of milestones\]  
* X points of  \[unique/non-unique\] milestones from \[list\]

## SkillTree Item List:

* manually created, OR  
* ALL Skill Tree Items-\>Filter(Skill Tree Name\[s\], Level \<\>= Level number\], Points \<\>= some number\])

## Project List

* manually created, OR  
* ALL Projects-\>Filter(Project Name\[s\], Points \<\>= some number\])

## Milestone List

* manually created, OR  
* ALL Milestones-\>Filter(Milestone Name\[s\], Points \<\>= some number\])

## Requirement Grouping

\[R1 and R2 and R3 …\] OR \[R1 and R4 and R5\] OR \[etc\]

# Objects

## SkillTreeItemList

* SkillTreeItems\[\]  
* load()  
* filter()  
* summarize()  
* display(template)

## SkillTreeItem

* Data (sheet row elements)  
  * SheetName  
  * SkillTreeItemID  
  * Title  
  * ShortDescription  
  * Points  
  * DocumentationSlides Link  
  * IconImage  
  * Status(created, priority, published)  
* Key: SheetName+SkillTreeItemID  
* display(template)  
* create()  
* update()  
* delete()

## ProjectList

* Projects\[\]  
* load()  
* filter()  
* summarize()  
* display(template)

## Project

* Data (sheet row elements)  
  * ProjectID  
  * Title  
  * ShortDescription  
  * DocumentationLink  
  * Points  
  * Status (created, priority, published)  
* Key: ProjectID  
* display(template)  
* create()  
* update()  
* delete()

## MilestoneList

* Milestones\[\]  
* load()  
* filter()  
* summarize()  
* display(template)

## Milestone

* Data (sheet row elements)  
  * MilestoneID  
  * Title  
  * ShortDescription  
  * DocumentationLink  
  * Points  
  * Status(created, priority, published)  
* RequirementsObject  
* display(template)  
* create()  
* update()  
* delete()

## RequirementsObject

* EvaluateProgress(StudentProjectList, StudentSkillTreeItemList, StudentMilestoneList)  
* this part be complicated…

## RewardList

* Rewards\[\]  
* load()  
* filter()  
* summarize()  
* display(template)

## Reward

* Data (sheet row elements)  
  * RewardID  
  * Title  
  * ShortDescription  
  * DocumentationLink  
  * Point Cost  
  * Status (created, priority, published)  
* display(template)  
* create()  
* update()  
* delete()

## StudentList

* Students\[\]  
* load()  
* filter()  
* summarize()  
* display(template)

## Student

* Data (sheet row elements)  
  * StudentID (email)  
  * StudentName  
  * StudentNumber  
  * Image  
* display(template)  
* load()  
* create()  
* update()  
* delete()

## StudentSkillTreeItemList

* StudentSkillTreeItems\[\]  
* load()  
* filter()  
* summarize()  
* display(template)

## StudentSkillTreeItem

* Data (sheet row items)  
  * StudentID  
  * SkillTreeName  
  * SkillTreeItemID  
  * Status(started, submitted, approved)  
  * EvidenceDocumentationLink  
* display(template)  
* load()  
* create()  
* update()  
* delete()

## StudentProjectList

* load()  
* filter()  
* summarize()  
* display(template)

## StudentProject

* Data (sheet row items)  
  * StudentID  
  * ProjectID  
  * Status(started, submitted, approved)  
  * EvidenceDocumentationLink  
  * RelatedSkillTreeItemIDs\[\]  
  * RelatedProjectIDs\[\]  
* display(template)  
* load()  
* create()  
* update()  
* delete()

## StudentMilestoneList

* load()  
* filter()  
* summarize()  
* display(template)

## StudentMilestone

* Data (sheet row items)  
  * StudentID  
  * MilestoneID  
  * EvidenceDocumentationLink  
  * Status(started, submitted, approved)  
* display(template)  
* evaluateProgress(StudentSkillTreeItemList, StudentProjectList)  
* load()  
* create()  
* update()  
* delete()

## StudentRewardList

* load()  
* filter()  
* summarize()  
* display(template)

## StudentReward

* Data (sheet row items)  
  * StudentID  
  * RewardID  
  * EvidenceDocumentationLink  
  * Status(claimed, spent)  
* display(template)  
* load()  
* create()  
* update()  
* delete()

