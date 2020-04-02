/** 
 * Copyright (C) 2020 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

const core = require('@actions/core');
const { GitHub } = require('@actions/github');
const { thankYouMessage } = require('./dialogue');

async function run() {
  try {
    const myToken = core.getInput('GITHUB_TOKEN', { required: true });
    const number = core.getInput('issue_number', { required: true });
    const owner = core.getInput('owner_name', { required: true });
    const repo = core.getInput('repo_name', { required: true });
    const username = core.getInput('issue_creator', { required: true });

    // Set custom response to core.getInput('response'); or false
    const customResponse = core.getInput('response_body') || false;
    const octokit = new GitHub(myToken);

    // If we receive a custom response from the workflow, set a variable to it, otherwise, set the same variable to the default
    let bodyText;
    customResponse ? bodyText = customResponse : bodyText = thankYouMessage;

    const reply = `@${username} ${bodyText}`;

    console.log(reply);

    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: number,
      body: reply
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

// Import dialogue options overrides
// const newIssue = async (options) => {
//   // Override defaults if custom options exist
//   const defaultOptions = {
//     response: thanks
//   }

//   const settings = {
//     ...defaultOptions,
//     ...options
//   }

//   // Call GitHub API
//   // Check the length of the issue
//   // call GitHub API
//     // if long enough post a thank you response
//     // else if too short, post a comment requesting more info

//   console.log('This ran.');

// /*
//   app.on('issues.opened', async context => {
//     const issueBody = context.payload.issue.body
//     const issueBodylengthThreshold = 140
    
//     if (issueBody.length >= issueBodylengthThreshold) {
//       postThankYouComment(context, dialogue.thanks)
//     } else {
//       postThanksButNeedMoreInfoComment(context, dialogue.emptyBody)
//     }
//   })
//   */

//   // The action should add the issue to the project

// }

// export default newIssue;