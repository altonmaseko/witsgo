#WITSGO BACKEND

This is the backend of our WitsGo application. It manages and serves all the databases that our application uses. It also provides additional functionality to the client application. The various data that the backend manages includes:
- Accessibility Database to allow enhancing of the various navigation and map features, so that it is suitable for people on wheelchairs.
- Rental Services Database which stores all information about the various rental stations on campus, and the status of each station, including how many of the different type of rentals are available.
- Transportation Database to aid in transportation related functionality.
- Map Database which stores information about Wits Campus, so that the map interface can be highly enhanced to include extra Wits related information and be more relavent to students.
- User Database which stores various information about each student, and about relavent University staff such as bus drivers, that partake in the application.
- Various other databases are used.

#To set up locally
- Clone and open the Github in vs code
- Make sure you have node.js and npm installed
- Open the terminal and run npm install
    - This will install all needed libraries
- Create a .env file in the root, and give it these details
  - PORT=3000
  - CONNECTION_URI_LOCAL=mongodb://localhost:27017/witsgo 
  - CONNECTION_URI=mongodb+srv://lucian:lucian-witsgo@hexacluster.sjjuf.mongodb.net/
  - GOOGLE_CLIENT_ID=865366285747-3k8v8mu0h11r3buqjr8jra34lces4uld.apps.googleusercontent.com
  - GOOGLE_CLIENT_SECRET=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
  - SESSION_SECRET=dfpioaesmfpewu-2393r29821x2w2
  - JWT_SECRET=Rw8qtGrggbUteQi5JuTiQ8RIaxxUIQcrc4rqs6kC6pLe8jeR9HHdqkmO0QrjzwUl
  - CLIENT_URL=http://localhost:5000
  - SERVER_URL=http://localhost:3000
  - GOOGLE_MAPS_API_KEY=userYourKey
- You will need to go to your google cloud account, and create a Google Client ID, as well as a Google Client Secret. This will allow google authentication.
- You will also need to create a google maps api key on the same platform.
- CONNECTION_URI connects to the database that we are using.
- After all this is setup, you can open the terminal and run 'npm run dev', in order to have the server running. Then the your locally hosted front end will be able to communicate with this server.
