/** 
 * Copyright (C) 2020 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

const core = require('@actions/core');
const { GitHub } = require('@actions/github');
const { infoRequestMessage, thankYouMessage } = require('./dialogue');

async function run() {
  try {
    const myToken = core.getInput('GITHUB_TOKEN', { required: true });
    const number = core.getInput('issue_number', { required: true });
    const owner = core.getInput('owner_name', { required: true });
    const repo = core.getInput('repo_name', { required: true });
    const username = core.getInput('issue_creator', { required: true });

    // Set custom response to core.getInput('response'); or false
    const customResponse = core.getInput('response_body') || false;
    const issueBody = core.getInput('issue_body') || false;
    const minLength = core.getInput('min_length') || false;
    const customRequest = core.getInput('request_info') || false;
    const octokit = new GitHub(myToken);

  // customResponse thankYouMessage customRequest infoRequestMessage

    let bodyText;
    // if minLength && issueBody -> check length of issueBody
    if ((minLength && issueBody) && (issueBody.length < minLength)) {
      customRequest ? bodyText = customRequest : 
      bodyText = infoRequestMessage;
    } else {
      customResponse ? bodyText = customResponse : 
      bodyText = thankYouMessage;
    }


    // If we receive a custom response from the workflow, set a variable to it, otherwise, set the same variable to the default
    
    

    const reply = `@${username} ${bodyText}`;

    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: number,
      body: reply
    });

    // add issue to project

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();