App URL, Dev version: https://script.google.com/a/macros/lcc.ca/s/AKfycbyZAMbDaSo5YPyWalGh978eaKX9xaFTaI41Pch8azY/dev
IDE: https://script.google.com/home/projects/1AqiHUlWRCwMh3YZTF1kL2bUSyVS-HG6hSirIG2s5U8u7VwswaT7a8tvf/edit 

# TODO Items


TODO:

- ability to doa skill tree item more than once


- make the buttons/calls to action on the skill tree item and other pages more explanatory
-- imagine someone is coming to the page from a link on a label on a computer. What will they need to know to use the page?


- build out skill trees for electronics, 3D modeling, and 3D printing.
-- identify the most important FIRST items we'd ive any student.
-- probably the "safety and basics" items. Make a Quiz for each of these as well. Figure out how to tie to students completion of the quiz to their skill tree item.

- design a card with link to the skill tree page, QR code, tinyurl, and good branding.

- need a search interface that searches the slides AND the spreadsheets

- clean up the way data is passed to the templates - its a mess

- add Projects
- add milestones
-- complex milestone rule system

Would be good to have a page that extracts all the videos from all the documentation slides and puts them in one searchable place. 
User story: you know there's a video,but you can't remember specifically which skill tree item it's in. Searching for it will suck.
- "Skill Tree Documentation Summary" page


# THINGS I LEARNED
You can't add a json file to a GAS project. Just upload it to the root folder of the project in google drive.

when getting data from sheets to send over to the client, use getDataRange().getDisplayValues(), not getDataRange().getValues(), when you have dates in the data
otherwsise the service will return null for teh whole data set


# DONE items

2025/07/21 13:34

- hide skill tree items that are marked hidden - DONE

2025/03/27 16:54
- stood up production version of the site

- how do we get the skill tree items in front of the students?
-- key items with important documentation - have easy links to the documentation visible near the tools
-- this info (QR code, tinyurl), printed with a distintive design, on a card-sized thing.
-- This might be a list of mutiple items, or a link to the skill tree page 
- made a tinyurl link to a google sites page with links to important skill tree items



2025/03/25 16:47
- when a student "starts" a skill tree item:
-- create a new documentation slide deck for that student's skill tree item
-- create the title slide for the new documentation slide deck
-- look at the original documentation slide deck for that skill tree item
-- if the original documentation slide deck has a slide with the text "[My Evidence Slides]", copy all the FOLLOWING slides to the student's new documentation slide deck
- to do this we need to create a new slideDeck class that handles all the slide deck stuff.


2025/03/20 11:41

- add abilty to add skill tree items inteh ui, when in admin mode.
-- I think this will help us create the skill trees we want in a more seemless way. Go back to the google sheets seems to me a mental block that slows things down.
- in skill tree browser:
-- in each level add plus 

- auto-generate QR Codes for each skill tree item
https://davidshimjs.github.io/qrcodejs/ 
https://github.com/davidshimjs/qrcodejs/blob/master/qrcode.js 


2025/03/19 17:33
- Skill Tree Item Page : improvie formatting - dONE
-- show student relation ot the item
--- "started" items
--- link to the student skill tree image page if it's "started"
-- link to "start" item

- StudentSkillTreeItem page : page for that student's work on that skill tree item
-- show the documentation slide deck
-- show the "admin notes"
-- improve formatting

- student page with
-- their "collected" items, w links to their documentation/evidence decks
-- improve formatting

- adminMode vs studentMode

2025/03/19 10:19 
- make skill tree list into a side nav in the browser - DONE


2025/03/06 16:31

- put documentation  from the google sites (from QR codes in passport) into the skill tree item documentation
-- this will make the system immediately useful

- "scan and update" background process
-- scan the student's documentation slides for updates
-- update the SkillTrees spreadsheet:
--- make sure all the columns are there (might be adding new columns)
--- make sure the SkillTreeItemID is there, based on the Title
--- make sure the DocumentationSlidesLink is there
--- update the "last updated" date
--- create the documentation slide deck if it doesn't exist

- check the caching/purgeCache system, might be a bug? - DONE 2025/03/04 16:26

2025/02/28 16:58
- made server-side classes instead of global functions

- to make the documentation we're making useful as quickly as possible, we need to:
-- need direct URL to individual skill tree item documentation - DONE - embedded in the skill tree item page
-- list of skill tree items that have documentation status "publish" - for students to access - DONE - embedded in the skill tree item page


- refactor - DONE
-- make things more object-oriented
-- organized client side, html, css, into reasonable groupings
-- templating system for making html easier to manage
-- name files in sensible ways so they are easy to find
--- server-side vs client-side javascript, for eg.


- get skill trees into google sheets
- addtl skill tree columns
-- link to documentation
-- "admin notes" for us - what are the skill tree items that we should focus on?
-- each skill tree item needs an ID - base it on the Title
- for each skill tree item, auto-create a Google Slide Deck where we will store the skill tree item how-tos and other documentation

-- list each skill tree ( select drop-down) - DONE
-- for each skill tree, show the items, with all items on the same level aligned horizontally - DONE

- Identify logged in User login - DONE


- can we embed the google slide deck in the web page? - YES

2025/02/24 16:45
-- link skill tree item to documentation - DONE
- create connect btw user and skill tree item - DONE
-- create the google sheet for this data - DONE
-- create ability for a user to "collect/start" a skill tree item - DONE
-- create the user documetnation slide deck when they "collect/start" a skill tree item - DONE

2025/02/28 12:57
- purgeCache 
-- need a wayt o make the system use the server side data instead of local storage, when we've changed some of the data
-- DONE - using a dataVersion variable that is updated when the server side data changes

