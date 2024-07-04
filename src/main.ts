// src/index.ts  
import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';

async function main() {
    try {
        const password = core.getInput('password');
        //TODO: use github token for authentication
        const botUrl = '';
        const context = github.context;
        if (context.payload.issue) {
            const issue = context.payload.issue;
            core.info(`Issue title: ${issue.title}`);
            core.info(`Issue number: ${issue.number}`);
            core.info(`Issue body: ${issue.body}`);
            const body = {
                'raw': issue.body, 
                'password': password, 
                'verify': true
            }
            await axios.post(botUrl, body);
            core.info('HTTP request sent successfully');
        }
        else {
            core.setFailed("No issue found in the context payload. Please check your workflow trigger is 'issue'");
        }
    }
    catch (error: any) {
        core.setFailed(error.message);
    }
}

main();  
