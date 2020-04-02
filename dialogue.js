// This file contains the text of all the comments the Rivet issue bot makes.
// The {{user}} token is populated by the webhook handler functions to @mention
// the appropriate person in an issue comment thread.

// /webhooks/issues.opened/thanks
const thanks = `@${user} Thanks for opening this issue! We appreciate you helping make our project better. \n\nA member of our team will take a look at this issue shortly.`;

module.exports = thanks;