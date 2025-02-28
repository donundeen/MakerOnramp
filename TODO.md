# TODO Items

- make a tracker that can show the last update time for each skill tree item document

- put documentation  from the google sites (from QR codes in passport) into the skill tree item documentation
-- this will make the system immediately useful



- student page with
-- their "collected" items, w links to their documentation/evidence decks

- add Projects
- add milestones



# THINGS I LEARNED
You can't add a json file to a GAS project. Just upload it to the root folder of the project in google drive.



# DONE items

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

