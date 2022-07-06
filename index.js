// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const promptDescription = () => {
    console.log("Welcome to the README Generator! Before proceding, please add any images you would like to include to the images directory found in this repository. You'll need them later. Now, let's get started!");
    return inquirer
        .prompt([
            {
                type: "input",
                name: "projectName",
                message: "What is the name of your repository? (Required)",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter the name of your respository!'");
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "motivation",
                message: "What was the motivation for creating this repository? Please answer in full sentences. (Required)",
                validate: motivationInput => {
                    if (motivationInput) {
                        return true;
                    } else {
                        console.log('You need to enter an explanation for your repository!');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "problem",
                message: "What problem does your project address? Please answer in full sentences.",
                validate: problemInput => {
                    if (problemInput) {
                        return true;
                    } else {
                        console.log('You need to write about what problem your repository addresses!');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "learn",
                message: "What did you learn from creating this project? Please answer in full sentences. (Required)",
                validate: learnInput => {
                    if (learnInput) {
                        return true;
                    } else {
                        console.log('You need to write about what you learned from creating your repository!');
                        return false;
                    }
                }
            }
        ])
};

const promptInstallationSteps = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "installationSteps",
                message: "What steps are required to install your project? Please enter each step separated by a comma. (Required)",
                validate: nextStepInput => {
                    if (nextStepInput) {
                        return true;
                    } else {
                        console.log('You need to enter the steps to install your project!');
                        return false;
                    }
                }
            }
        ])
};

const promptUsage = () => {
    let fileList = fs.readdirSync("./images");

    return inquirer
        .prompt([
            {
                type: "input",
                name: "instructions",
                message: "Provide brief instructions for use. (Required)",
                validate: instructionsInput => {
                    if (instructionsInput) {
                        return true;
                    } else {
                        console.log('You need to enter the instructions for the use of your repository!');
                        return false;
                    }
                }
            },
            {
                type: "confirm",
                name: "confirmScreenshot",
                message: "Do you have a screenshot in the images directory that you would like to include?",
            },
            {
                type: 'input',
                name: 'screenshotDescription',
                message: 'Please enter a description of the screenshot.',
                when: ({ confirmScreenshot }) => confirmScreenshot
            },
            {
                type: "list",
                choices: fileList,
                name: "screenshotFileName",
                message: "Please select a file.",
                when: ({ confirmScreenshot }) => confirmScreenshot
            },
            {
                type: "input",
                name: "username",
                message: "What is your GitHub username? (Required)",
                validate: usernameInput => {
                    if (usernameInput) {
                        return true;
                    } else {
                        console.log('You need to enter your GitHub username!');
                        return false;
                    }
                }
            },
        ])
};

const promptContributing = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "collaboratorUsernames",
                message: "Please provide the GitHub usernames of any project collaborators, each separated by a comma."
            },
            {
                type: "confirm",
                name: "confirmCollaboration",
                message: "Would you like to invite other users to contribute to your repository?",
                default: false
            }
        ])
};

const promptLicense = () => {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "license",
                message: "Please select the license type that best suites your project.",
                choices: ["MIT", "GNU", "Apache License", "BSD", "ISC", "Artistic License", "Other/No License"]
            }
        ])
};

const promptTests = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "tests",
                message: "Please enter the command users can run to test the functionality of your project if appicable."
            }
        ])
};

const promptQuestions = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "email",
                message: "What is your email address? (Required)",
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log('You need to enter your email address!');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "contact",
                message: "If there is another way you would like to be contacted regarding questions about your repository, please enter those instructions here."
            }
        ])
}

// TODO: Create a function to initialize app
async function init() {
    const { projectName, motivation, learn, problem } = await promptDescription()
    const { installationSteps } = await promptInstallationSteps()
    const { instructions, confirmScreenshot, screenshotDescription, screenshotFileName, username } = await promptUsage()
    const { collaboratorUsernames, confirmCollaboration } = await promptContributing()
    const { license } = await promptLicense()
    const { tests } = await promptTests()
    const { email, contact } = await promptQuestions()

    const allInputData = {
        projectName, motivation, learn, problem, installationSteps, instructions, confirmScreenshot, screenshotDescription, screenshotFileName, username, collaboratorUsernames, confirmCollaboration, license, tests, email, contact
    }

    return allInputData;
}


// Function call to initialize app
init()
.then((allInputData) => {
    const pageREADME = generateMarkdown(allInputData);
    //callback function the writes README file
    fs.writeFileSync('./dist/README.md', pageREADME, err => {
        if (err) throw err;
        console.log('README complete! Check out README.md to see the output!');
    });
});
