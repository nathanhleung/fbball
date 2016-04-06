# FBBall
Track the stats of basketball games in a thread in Facebook messenger

## Usage Notes
- Download the latest version of facebook-chat-api (make sure it has get thread info, if not download straight from github)
- Then, in the src/getThreadHistory.js file edit the line (around #54) that says callback(null, resData.payload.actions.map(utils.formatMessage)); and change it to callback(null, resData.payload); to get the raw message
- Set your facebook email and password in process.env.FB_EMAIL and process.env.FB_PASSWORD in order to log in
- Set the thread that you want to track in controllers/main.js

## How It Works
Uses the facebook-chat-api npm module to grab thread history, then filters out non-basketball messages and determines the score of each player in the thread.
