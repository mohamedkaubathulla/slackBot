Slack Todo Bot (MongoDB + Node.js)

This project is a Slack Bot built using Node.js and Slack Bolt, backed by MongoDB 
It allows users to add tasks and fetch all tasks directly from Slack using slash commands.


Features

- Slack bot using **Socket Mode**
- MongoDB for persistent task storage
- REST APIs for task management
- Slack commands integrated with backend APIs

Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Slack Bolt SDK
- Axios
- dotenv

Project Structure

slack-hello-bot/ │ ├── app.js          
Slack bot logic ├── server.js       
Express server & APIs ├── db.js          MongoDB connection ├── .env            Environment variables ├── package.json └── README.md

Setup & Installation

Clone the repository
```bash
git clone <your-repo-url>
cd slack-hello-bot

2.Install dependencies

npm install

Environment Variables

Create a .env file in the root directory and add:

SLACK_BOT_TOKEN=xoxb-xxxxxxxx
SLACK_APP_TOKEN=xapp-xxxxxxxx
SLACK_SIGNING_SECRET=xxxxxxxx

MONGO_URI=mongodb://localhost:27017/todoDB
PORT=5000

Running the Application

Terminal 1 – Start Backend Server

node server.js

Expected output:

MongoDB connected
Server running on port 5000

Terminal 2 – Start Slack Bot

node app.js

Expected output:

Slack bot is running (Socket Mode)


Backend APIs

Add Task

POST /add-task

Request body:

{
  "task": "Buy milk"
}

Get All Tasks

GET /get-all-tasks

Response:

[
  {
    "_id": "...",
    "title": "Buy milk",
    "createdAt": "..."
  }
]

Slack Commands

/add-task <task_name>

Adds a new task to MongoDB.

Example:

/add-task Buy milk

/get-all-tasks

Fetches and displays all tasks from MongoDB.

Flow Explanation

1. User enters a Slack command
2. Slack bot receives the command
3. Bot calls backend REST API
4. Backend interacts with MongoDB
5. Response is sent back to Slack


