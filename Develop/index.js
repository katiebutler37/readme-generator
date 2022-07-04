// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

let inputData = [];

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

const promptInstallationNextSteps = inputData => {

    // If there's no 'next steps' array property, create one
    if (!inputData.nextSteps) {
        inputData.nextSteps = [];
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
            inputData.nextSteps.push(installationNextStepsData);
            if (installationNextStepsData.confirmAddStep) {
                return promptInstallationNextSteps(inputData);
            } else {
                promptUsage(inputData)
                    // .then(usageData => {
                    //     inputData.push(usageData);
                    //     promptContributing(inputData)
                        // .then(contributingData => {
                        //     inputData.contributors.push(contributingData);
                        //     //creates error because this isn't defined yet
                        //     if (contributingData.confirmAddCollaborator) {
                        //         return promptContributing(inputData);
                        //     } else {
                        //         promptLicense(inputData)
                        //             .then(licenseData => {
                        //                 inputData.push(licenseData);
                        //                 promptTests(inputData)
                        //                     .then(testsData => {
                        //                         inputData.push(testsData);
                        //                         promptQuestions(inputData)
                        //                             .then(questionsData => {
                        //                                 inputData.push(questionsData);
                        //                             })
                        //                     })

                        //             })
                        //     }
                        // })
                    // })
                //     //will need to add the rest of the chain after usage until you find a way to clean this up and avoid repition
            }
        })
};

const promptUsage = inputData => {
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
            {
                type: "input",
                name: "githubLink",
                message: "Please enter the link to your GitHub profile. (Required)",
                validate: profileLinkInput => {
                    if (profileLinkInput) {
                        return true;
                    } else {
                        console.log('You need to enter the link to your GitHub profile!');
                        return false;
                    }
                }
            },
            {
                type: "confirm",
                name: "confirmCollaborators",
                message: "Are there any other contributors you would like to credit on your README?",
                default: false
            }
        ])
        .then(usageData => {
            inputData.push(usageData);
            if (usageData.confirmCollaborators) {
                return promptContributing(inputData);
            } else {
                promptLicense(inputData)
                    .then(licenseData => {
                        inputData.push(licenseData);
                        promptTests(inputData)
                            .then(testsData => {
                                inputData.push(testsData);
                                promptQuestions(inputData)
                                    .then(questionsData => {
                                        inputData.push(questionsData);
                                    })
                            })

                    })
                }
            })
};

const promptContributing = inputData => {
    // If there's no 'contributors' array property, create one
    if (!inputData.contributors) {
        inputData.contributors = [];
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
            inputData.contributors.push(contributingData);
            if (contributingData.confirmAddCollaborator) {
                return promptContributing(inputData);
            } else {
                promptLicense(inputData)
                    .then(licenseData => {
                        inputData.push(licenseData);
                        promptTests(inputData)
                            .then(testsData => {
                                inputData.push(testsData);
                                promptQuestions(inputData)
                                    .then(questionsData => {
                                        inputData.push(questionsData);
                                    })
                            })

                    })
                //same thing here needing to add the rest of the chain of stuff. if i eliminate the else here, will it hop back to the standard order outlined below when it exits the function -tried this and it seems like no?
            }
        })
};

const promptLicense = inputData => {
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

const promptTests = inputData => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "tests",
                message: "Please enter the command users can run to test the functionality of your project if appicable."
            }
        ])
};

const promptQuestions = inputData => {
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
            inputData.push(descriptionData)
            if (descriptionData.confirmAddSteps) {
                promptInstallationNextSteps(inputData);
            } else {
                promptUsage(inputData)
                    // .then(usageData => {
                    //     inputData.push(usageData)
                    //     if (usageData.confirmCollaborators) {
                    //         return promptContributing(inputData);
                    //     } else {
                    //         promptLicense(inputData)
                    //             .then(licenseData => {
                    //                 inputData.push(licenseData);
                    //                 promptTests(inputData)
                    //                     .then(testsData => {
                    //                         inputData.push(testsData);
                    //                         promptQuestions(inputData)
                    //                             .then(questionsData => {
                    //                                 inputData.push(questionsData);
                    //                             })
                    //                     })

                    //             })
                    //     }
                    // })
            }
        })
        //do i need to add to the end of each path?
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
