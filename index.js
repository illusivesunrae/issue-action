/** 
 * Copyright (C) 2020 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

const core = require('@actions/core');
const { GitHub } = require('@actions/github');
const { thanks } = require('./dialogue');

async function run() {
  try {
    const myToken = core.getInput('GITHUB_TOKEN', { required: true });
    const response = core.getInput('response');

    console.log(response);

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