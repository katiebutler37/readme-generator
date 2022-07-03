// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const promptDescription = () => {
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
                        console.log("Please enter the name of your respository!'")
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
                type: "confirm",
                name: "contents",
                message: "Would you like to include a table of contents for your README?",
                default: false
            },
            {
                type: "input",
                name: "installation-step-1",
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
                name: "confirmAddStep",
                message: "Are there more steps to install your project?",
                default: false,
            }
        ])
        .then(desciptionData => {
            data.push(desciptionData);
            if (descriptionData.confirmAddStep) {
                return promptInstallationNextSteps(data);
              } else {
                return data;
              }
        })
    };

const promptInstallationNextSteps = data => {
    // If there's no 'next steps' array property, create one
    if (!data.nextSteps) {
        data.nextSteps = [];
      }
    return inquirer
    .prompt([
        {},
        {
            type: "confirm",
            name: "add-step",
            message: "Are there more steps to install your project?",
            default: false
        },
    ])
}    

    promptDescription()
    .then((answers) => {
        // Use user feedback for... whatever!!
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile('README.md', generateMarkdown(), err => {
        if (err) throw err;
      });
}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
