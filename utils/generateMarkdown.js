// function to display TOC
function generateContent() {
  return `
  ## Table of Contents
  1. [Description](#description)
  2. [Installation](#installation)
  3. [Usage](#usage)
  4. [License](#license)
  5. [Contributing](#contributing)
  6. [Tests](#tests)
  7. [Questions](#questions)
  `;
}

//function to display discription
// function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  licenseBadge = ""
  switch (license) {
    case "MIT":
      licenseBadge += `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`

      break;
    case "GNU":

      licenseBadge += `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
      break;
    case "Apache License":

      licenseBadge += `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
      break;
    case "BSD":

      licenseBadge += `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`
      break;
    case "ISC":

      licenseBadge += `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`
      break;
    case "Artistic License":

      licenseBadge += `[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)`
      break;
    case "Other/No License":

      licenseBadge = ""
      break;
    default:
      licenseBadge = ""
  }
  return licenseBadge
}

//function to display project description
function generateDescription(allInputData) {
  return `
## Description
- ${allInputData.motivation} 
- ${allInputData.problem} 
- ${allInputData.learn}
   `;
}

//functions to display installation steps
function formatSteps(stepsString) {
  const includesComma = stepsString.includes(",");
  var formattedList = ""
  if (includesComma) {
    const stepsArr = stepsString.split(", ");
    let i = 1
    let j = 0
    while (j < stepsArr.length) {
      formattedList += `${i}. ${stepsArr[j]}\n`
      i++
      j++
    }
  } else {
    formattedList = `1. ${stepsString}\n`
  }

  return formattedList
}

function generateInstallation(allInputData) {
  return `
## Installation
To install the project repository, please follow these steps:
${formatSteps(allInputData.installationSteps)}
    `;
}


//functions to display usage data
function checkThenDisplayScreenshot(allInputData) {
  let screenshotInfo = ""
  if (allInputData.confirmScreenshot) {
    screenshotInfo = `![${allInputData.screenshotDescription}](../images/${allInputData.screenshotFileName})`
  } else {
    screenshotInfo = ""
  }
  return screenshotInfo
}

function generateUsage(allInputData) {
  return `
## Usage
${allInputData.instructions}
${checkThenDisplayScreenshot(allInputData)}
    `;
}

// function that returns the license section of README
// If there is no license, that is stated
function renderLicenseSection(license) {
  licenseSection = "## License\n"
  switch (license) {
    case "MIT":
      licenseSection += `#### Distributed under the terms of the [MIT License](https://opensource.org/licenses/MIT).\n`

      break;
    case "GNU":

      licenseSection += `#### Distributed under the terms of the [GNU License](https://www.gnu.org/licenses/gpl-3.0).\n`
      break;
    case "Apache License":

      licenseSection += `#### Distributed under the terms of the [Apache License](https://opensource.org/licenses/Apache-2.0).\n`
      break;
    case "BSD":

      licenseSection += `#### Distributed under the terms of the [BSD License](https://opensource.org/licenses/BSD-3-Clause).\n`
      break;
    case "ISC":

      licenseSection += `#### Distributed under the terms of the [ISC License](https://opensource.org/licenses/ISC).\n`
      break;
    case "Artistic License":

      licenseSection += `#### Distributed under the terms of the [Artistic License](https://opensource.org/licenses/Artistic-2.0).\n`
      break;
    case "Other/No License":

      licenseSection += "#### This project is not licensed.\n"
      break;
    default:
      licenseSection += "#### This project is not licensed.\n"
  }
  return licenseSection
}

//functions to display contributing section
function formatCollaborators(usernameString) {
  const includesComma = usernameString.includes(",");
  var formattedList = ""
  var intro = ""
  if (!usernameString) {
    intro = "There are no additional contributors to credit beyond the repository owner for this project."
    formattedList = ""
  }
  else if (includesComma) {
    const usernamesArr = usernameString.split(", ");
    intro = "This project, as it stands, was made possible by the contributions of the following users:\n"
    let i = 1
    let j = 0
    while (j < usernamesArr.length) {
      formattedList += `- [${usernamesArr[j]}](https://github.com/${usernamesArr[j]})\n`
      i++
      j++
    }
  } else {
    intro = "This project, as it stands, was made possible by the contributions of the following user:\n"
    formattedList = `- [${usernameString}](https://github.com/${usernameString})`
  }

  return intro + formattedList
}

function allowCollaboration(allInputData) {
  let collaborationInstructions = ""
  if (allInputData.confirmCollaboration) {
    collaborationInstructions = 
  `If you would like to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change. Only respectful engagement with this repository will be tolerated to foster an open and welcome environment.
  ### Pull Request Process
  ${allInputData.pullRequest}
  `
  } else {
    collaborationInstructions = ""
  }
  return collaborationInstructions
}

function generateCollaborators(allInputData) {
  return `
## Contributing
${formatCollaborators(allInputData.collaboratorUsernames)}
${allowCollaboration(allInputData)}
`;
}

//functions to display tests section
function checkThenDisplayTest(allInputData) {
  let testInfo = ""
  if (allInputData.tests) {
    testInfo = `Run the following command in terminal to test the functionality of this application:

\`\`\`sh 
${allInputData.tests}
\`\`\`
  `
  } else {
    testInfo = "There are currently no tests created to check the functionality of this application."
  }
  return testInfo
}

function generateTests(allInputData) {
  return `
## Tests
 ${checkThenDisplayTest(allInputData)}
`;
}

//functions to display questions (contact info) section
function otherContact(contactInput) {
  let otherContactDisplay = ""
  if (contactInput) {
    otherContactDisplay = `#### Other: ${contactInput}
    `;
  } else {
    otherContactDisplay = ""
  }
  return otherContactDisplay
}

function generateQuestions(allInputData) {
  return `
## Questions
If you have any questions about this project repository, please feel free to contact its owner.
  #### GitHub: [${allInputData.username}](https://github.com/${allInputData.username})
  #### Email: [${allInputData.email}](mailto:${allInputData.email})
  ${otherContact(allInputData.contact)}
`;
}

//main function to format the entire README file
//function passed to index.js to then write the file with the formatted data
//allInputData collects the inputted data from inquirer prompts, stores in an object with parameters for each piece of info
module.exports = generateMarkdown = allInputData => {
  return `
  # ${allInputData.projectName}

  ${renderLicenseBadge(allInputData.license)}

  ${generateContent()}

  ${generateDescription(allInputData)}

  ${generateInstallation(allInputData)}

  ${generateUsage(allInputData)}
  
  ${renderLicenseSection(allInputData.license)}

  ${generateCollaborators(allInputData)}

  ${generateTests(allInputData)}

  ${generateQuestions(allInputData)}
  `;
};
