import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';

async function main() {
    try {
        const password = core.getInput('password');
        //TODO: use github token for authentication
        const token = core.getInput('github-token', { required: true })

        const botUrl = 'https://similar-bot-test.calmhill-ec497646.eastus.azurecontainerapps.io/search/';
        const context = github.context;
        if (!context.payload.issue) {
            throw new Error("No issue found in the context payload. Please check your workflow trigger is 'issues'");
        }
        const issue = context.payload.issue;
        core.debug(`Issue: ${JSON.stringify(issue)}`);
        const response = await axios.post(botUrl, {
            'raw': issue,
            'password': password,
            'verify': true
        });
        core.info('The HTTP request was sent to GitHub issue copilot successfully');

        const prediction: any[][] = response.data.predict;
        core.debug(`Response: ${prediction}`);
        if (!prediction || prediction.length === 0) {
            core.info('No prediction found');
            return;
        }
        let message = 'Here are some similar issues that might help you. Please check if they can solve your problem.\n'
        for (const item of prediction) {
            message += `- #${item[item.length - 1]}\n`
        }
        message = message.trimEnd();

        const octokit = github.getOctokit(token);
        const issueNumber = context.payload.issue.number;
        const { owner, repo } = github.context.repo;
        await octokit.rest.issues.createComment({
            owner,
            repo,
            issue_number: issueNumber,
            body: message
        });
        console.log(`Comment sended to issue #${issueNumber}`);

        const labels = ["Similar-Issue"];
        await octokit.rest.issues.addLabels({
            owner,
            repo,
            issue_number: issueNumber,
            labels
        });
        console.log(`Label added to issue #${issueNumber}`);
    }
    catch (error: any) {
        core.setFailed(error.message);
    }
}

main();  
