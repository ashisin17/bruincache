# BruinCache
![BruinCache Logo](bruinapp/src/pages/pictures/BruinCacheLogo.png)

## What is BruinCache
A web application with a map of pinned locations with clues that are meant to lead the user to hidden bruincaches sites placed around UCLA. Once the bruincache site is found, users may replace the bruincache that they find and/or write their name in the logbook of people that have previously visited the bruincache site. The web applications will require users to make a profile to log the bruincaches they’ve already found or post their own hidden bruincaches. Users are able to leave reviews for the caches they've found by rating on a star system and typing a review. They are also able to see the reviews from other users. 

## How to run BruinCache on YOUR machine
### Get the CODE
1. Clone the repo into any folder you like
2. `cd` bruinapp
3. install any dependencies your computer is missing
```
git clone https://github.com/ashisin17/bruincache.git
cd ./bruinapp
npm install
```
### Connect to the DATABASE 
#### Firebase Configuration
1. Create a firebase project.
2. Set up your personal firebase account details in firebase.js

#### Reading and Writing
1. Enable permissions for API reads and writes to the database inside your firebase portal
2. The program will automatically connect to your firebase and use it for data storage.

### Run the APP
If you are not already on bruinapp, make sure you cd into the bruinapp directory
Then, simply run: `npm start`
This will open up BruinCache and will prompt you to login through our secure google-sign in. (Since this is catered for UCLA students, please be sure to use the g.ucla.edu email).
Once the server starts (may take a while), login and feel free to use our functionality to explore the AMAZING features of BruinCache!
Here's the link http://localhost:3000/ to enter into your preferred browser in case the app doesn't load.

## Tech Stack
Frontend: react
Backend: node.js, firebase
API: Google Maps API and API's offered by Firebase (sign-in authentication)

## Creators
BruinCache was created by:
Aidan Levy
Ashita Singh
Audrey Emis
Chanakya Gidipally
Meagan Clarke
