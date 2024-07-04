// src/index.ts  
import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';

async function main() {
    try {
        const password = core.getInput('password');
        //TODO: use github token for authentication
        const botUrl = 'https://similar-bot-test.calmhill-ec497646.eastus.azurecontainerapps.io/search/';
        const context = github.context;
        if (context.payload.issue) {
            const issue = context.payload.issue;
            const issueJsonString = JSON.stringify(issue);
            core.debug(`Issue: ${issueJsonString}`);
            const body = {
                'raw': issueJsonString, 
                'password': password, 
                'verify': true
            }
            const headers = { 
                'Content-Type': 'application/json' 
            };
            const response = await axios.post(botUrl, JSON.stringify(body), { headers: headers });
            core.info(`Response: ${response.data}`);
            core.info('HTTP request sent successfully');
        }
        else {
            core.setFailed("No issue found in the context payload. Please check your workflow trigger is 'issues'");
        }
    }
    catch (error: any) {
        core.setFailed(error.message);
    }
}

main();  
