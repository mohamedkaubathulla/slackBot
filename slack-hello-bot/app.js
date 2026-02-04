require('dotenv').config();
const { App } = require('@slack/bolt');
const db = require('./db');

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
    return respond('Please provide a task name');
  }
  db.run(
    'INSERT INTO tasks (title) VALUES (?)',
    [task],
    (err) => {
      if (err) {
        respond('Failed to add task');
      } else {
        respond(`Task added: *${task}*`);
      }
    }
  );
});

app.command('/get-all-tasks', async ({ ack, respond }) => {
  await ack();
  db.all('SELECT * FROM tasks ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      respond('Failed to fetch tasks');
    } else if (rows.length === 0) {
      respond('No tasks found');
    } else {
      const list = rows
        .map((t, i) => `${i + 1}. ${t.title}`)
        .join('\n');

      respond(`*Todo List:*\n${list}`);
    }
  });
});
