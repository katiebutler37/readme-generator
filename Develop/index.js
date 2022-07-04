// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

let data = [];

// TODO: Create an array of questions for user input
const promptDescription = () => {
    console.log("Welcome to the README Generator! Before proceding, please add any images you would like to include to the images directory found in this repository. You'll need them later. Now, let's get started!");
    return inquirer
        .prompt([
            {
                type: "input",
                name: "name",
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
                message: "What was the motivation for creating this repository? (Required)",
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
                //won't make required in case user has already elaborated to cover this question in the motivation question
                type: "input",
                name: "problem",
                message: "What problem does your project address?",
                default: ""
            },
            {
                type: "input",
                name: "learn",
                message: "What did you learn from creating this project? (Required)",
                validate: learnInput => {
                    if (learnInput) {
                        return true;
                    } else {
                        console.log('You need to write about what you learned from creating your repository!');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "installationFirstStep",
                message: "What is the first step required to install your project? (Required)",
                validate: firstStepInput => {
                    if (firstStepInput) {
                        return true;
                    } else {
                        console.log('You need to enter the first step to install your project!');
                        return false;
                    }
                }
            },
            {
                type: "confirm",
                name: "confirmAddSteps",
                message: "Are there more steps to install your project?",
                default: false,
            }
        ])
};

const promptInstallationNextSteps = data => {

    // If there's no 'next steps' array property, create one
    if (!data.nextSteps) {
        data.nextSteps = [];
    }
    return inquirer
        .prompt([
            {
                type: "input",
                name: "installationNextStep",
                message: "What is the next step required to install your project? (Required)",
                validate: nextStepInput => {
                    if (nextStepInput) {
                        return true;
                    } else {
                        console.log('You need to enter the next step to install your project!');
                        return false;
                    }
                }
            },
            {
                type: "confirm",
                name: "confirmAddStep",
                message: "Are there more steps to install your project?",
                default: false
            },
        ])
        .then(installationNextStepsData => {
            data.nextSteps.push(installationNextStepsData);
            if (installationNextStepsData.confirmAddStep) {
                return promptInstallationNextSteps(data);
            } else {
                promptUsage(data);
            }
        })
};

const promptUsage = data => {
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
            }
        ]);
};

const promptContributing = data => {
    console.log(data);
   // If there's no 'contributors' array property, create one
   if (!data.contributors) {
    data.contributors = [];
}
    return inquirer
        .prompt([
            {
                type: "input",
                name: "collaboratorName",
                message: "Please provide the name of one project collaborator.",
            },
            {
                type: "input",
                name: "collaboratorLink",
                message: "Please provide the link to their GitHub Profile.",
                validate: collaboratorLinkInput => {
                    if (collaboratorLinkInput) {
                        return true;
                    } else {
                        console.log('You need to enter the link to their github profile!');
                        return false;
                    }
                },
                when: ({ collaboratorName }) => collaboratorName
            },
            {
                type: "confirm",
                name: "confirmAddCollaborator",
                message: "Are there more collaborators to credit for your project?",
                default: false
            },
        ])
        .then(contributingData => {
            data.contributors.push(contributingData);
            if (contributingData.confirmAddCollaborator) {
                return promptContributing(data);
            } else {
                //promptTests(data);
            }
        })
}



// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile('README.md', generateMarkdown(), err => {
        if (err) throw err;
    });
}

// TODO: Create a function to initialize app
function init() {
    promptDescription()
        .then(descriptionData => {
            data.push(descriptionData);
            if (descriptionData.confirmAddSteps) {
                promptInstallationNextSteps(data);
            } else {
                promptUsage(data)
                    .then(usageData => {
                        data.push(usageData);
                        promptContributing(data);
                    })
                    //.then(promptLicense)
                //.then(promptTests)
                //.then(promptQuestions)
            }
        })
        // .then((data) => {
        //     // Use user feedback for... whatever!!
        // })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}

// Function call to initialize app
init();
