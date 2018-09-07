const mongoose = require("mongoose");
const Agreement = require("./lib/agreements");

const EVENTS = ["pull_request.opened", "pull_request.synchronize"];

mongoose.connect(process.env.MONGODB_URI);

/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.log("Yay, the app was loaded!");

  app.on(EVENTS, check);

  async function check(context) {
    const config = await context.config("cla.yml", {
      require: {
        members: false
      }
    });

    const pr = context.payload.pull_request;

    const compare = context.github.repos.compareCommits(
      context.repo({
        base: pr.base.sha,
        head: pr.head.sha
      })
    );

    const commits = compare.data.commits;
    const authors = commits.map(commit => commit.author.login);
  }
};
