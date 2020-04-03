/** 
 * Copyright (C) 2020 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

const core = require('@actions/core');
const { GitHub } = require('@actions/github');
const { infoRequestMessage, thankYouMessage } = require('./dialogue');

async function run() {
  try {
    // Variables specified within action.yml, and passed by workflow yml

    // This token is provided by Actions
    const myToken = core.getInput('GITHUB_TOKEN', { required: true });

    // Required variables
    const number = core.getInput('issue_number', { required: true });
    const owner = core.getInput('owner_name', { required: true });
    const repo = core.getInput('repo_name', { required: true });
    const username = core.getInput('issue_creator', { required: true });

    // Optional variables
    const customRequest = core.getInput('request_info') || false;
    const customResponse = core.getInput('response_body') || false;
    const issueBody = core.getInput('issue_body') || false;
    const issueID = core.getInput('issue_id') || false;
    const minLength = core.getInput('min_length') || false;
    const projectColumn = core.getInput('project_column') || false;

    // Create a new instance of octokit rest API
    // https://octokit.github.io/rest.js/v17/
    const octokit = new GitHub(myToken);


    let bodyText;
    // If workflow establishes minimum length for issue body
    if ((minLength && issueBody) && (issueBody.length < minLength)) {
      // If a custom message has been provided for short issues - use; otherwise, use default
      customRequest ? bodyText = customRequest : 
      bodyText = infoRequestMessage;
    } else {
      // If a custom message has been provided - use; otherwise, use default
      customResponse ? bodyText = customResponse : 
      bodyText = thankYouMessage;
    }

    // Concatenate issue creator username and comment text
    const reply = `@${username} ${bodyText}`;

    // Create new comment
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: number,
      body: reply
    });

    // If a project column and issue id are provided, add issue to project
    if (projectColumn && issueID) {
      await octokit.projects.createCard({
        project_id: 1,
        column_id: projectColumn,
        content_id: issueID,
        content_type: "Issue"
      });
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();