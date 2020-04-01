/** 
 * Copyright (C) 2020 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

const { newIssue } = require('./issue-handlers/index');

newIssue(options);

// Able to handle labels provided by user's action setup
// Can either close or comment based on user's specification