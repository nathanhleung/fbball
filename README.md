# FBBall
Track the stats of basketball games in a thread in Facebook messenger

## [facebook-chat-api](https://www.npmjs.com/package/facebook-chat-api) Notes
This requires an edited version of facebook-chat-api (the custom version is already in package.json, here are the details of the change).
- Download the latest version of facebook-chat-api (make sure it has get thread info, if not download straight from github)
- Then, in the src/getThreadHistory.js file edit the line (around #54) that says callback(null, resData.payload.actions.map(utils.formatMessage)); and change it to callback(null, resData.payload); to get the raw message
- Set your facebook email and password in process.env.FB_EMAIL and process.env.FB_PASSWORD in order to log in
- Set the thread that you want to track in controllers/main.js

## How It Works
Uses the facebook-chat-api npm module to grab thread history, then filters out non-basketball messages and determines the score of each player in the thread.

### Security
Because of the way facebook-chat-api logs into facebook, your account can sometimes be blocked if your server is in a commonly assigned IP range (like Heroku servers). If that occurs, just re-log into facebook and you should be fine.

## Screenshots
### The Web App:
![screenshot](http://i.imgur.com/lIa7cF5.png?3)

### The Messenger Group Chat:
![messenger app](http://i.imgur.com/DYlLW39.png?1)
