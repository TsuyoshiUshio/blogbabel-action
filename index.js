const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const source = core.getInput('source');
  const destination = core.getInput('destination');
  const sourceId = core.getInput('sourceId');
  console.log(`Downloading BlogBabel...`);  
  // TODO Implement the logic here.
  core.setOutput("url", "https://devto.com");
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
