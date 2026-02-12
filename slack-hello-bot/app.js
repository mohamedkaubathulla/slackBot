require('dotenv').config();
const { App } = require('@slack/bolt');
const axios = require('axios');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

app.event('app_mention', async ({ event, say }) => {
  await say('Hello World 👋');
});

(async () => {
  await app.start();
  console.log('⚡ Slack bot is running (Socket Mode)');
})();

app.command('/add-task', async ({ command, ack, respond }) => {
  await ack();

  const task = command.text;

  if (!task) {
    return respond(' Please provide a task name');
  }

  try {
    const res = await axios.post(
      'http://localhost:5000/add-task',
      { task }
    );

    respond(` ${res.data.message}\n Task: *${res.data.task.title}*`);
  } catch (err) {
    respond(' Failed to add task');
  }
});


app.command('/get-all-tasks', async ({ ack, respond }) => {
  await ack();

  try {
    const res = await axios.get(
      'http://localhost:5000/get-all-tasks'
    );

    const tasks = res.data;

    if (tasks.length === 0) {
      return respond(' No tasks found');
    }

    const list = tasks
      .map((t, i) => `${i + 1}. ${t.title}`)
      .join('\n');

    respond(` *Todo List*\n${list}`);
  } catch (err) {
    respond(' Failed to fetch tasks');
  }
});
