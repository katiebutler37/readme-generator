// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  licenseBadge = ""
  switch (license) {
    case "MIT":
      licenseBadge += `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
      // code block
      break;
    case "GNU":
      // code block
      licenseBadge += `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
      break;
    case "Apache License":
      // code block
      licenseBadge += `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
      break;
    case "BSD":
      // code block
      licenseBadge += `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`
      break;
    case "ISC":
      // code block
      licenseBadge += `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`
      break;
    case "Artistic License":
      // code block
      licenseBadge += `[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)`
      break;
    case "Other/No License":
      // code block
      licenseBadge = ""
      break;
    default:
      licenseBadge = ""
    // code block
  }
  return licenseBadge
 }

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
// function renderLicenseLink(license) { 
//   licenseLink = ""
//   switch (license) {
//     case "MIT":
//       licenseLink += `(https://opensource.org/licenses/MIT)`
//       // code block
//       break;
//     case "GNU":
//       // code block
//       licenseLink += `(https://www.gnu.org/licenses/gpl-3.0)`
//       break;
//     case "Apache License":
//       // code block
//       licenseLink += `(https://opensource.org/licenses/Apache-2.0)`
//       break;
//     case "BSD":
//       // code block
//       licenseLink += `(https://opensource.org/licenses/BSD-3-Clause)`
//       break;
//     case "ISC":
//       // code block
//       licenseLink += `(https://opensource.org/licenses/ISC)`
//       break;
//     case "Artistic License":
//       // code block
//       licenseLink += `(https://opensource.org/licenses/Artistic-2.0)`
//       break;
//     case "Other/No License":
//       // code block
//       licenseLink = ""
//       break;
//     default:
//       licenseLink = ""
//     // code block
//   }
//   return licenseLink
// }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  licenseSection = "## License <a name='license'></a>\n"
  switch (license) {
    case "MIT":
      licenseSection += `### Distributed under the terms of the [MIT License](https://opensource.org/licenses/MIT)`
      // code block
      break;
    case "GNU":
      // code block
      licenseSection += `### Distributed under the terms of the [GNU License](https://www.gnu.org/licenses/gpl-3.0)`
      break;
    case "Apache License":
      // code block
      licenseSection += `### Distributed under the terms of the [Apache License](https://opensource.org/licenses/Apache-2.0)`
      break;
    case "BSD":
      // code block
      licenseSection += `# Distributed under the terms of the [BSD License](https://opensource.org/licenses/BSD-3-Clause)`
      break;
    case "ISC":
      // code block
      licenseSection += `### Distributed under the terms of the [ISC License](https://opensource.org/licenses/ISC)`
      break;
    case "Artistic License":
      // code block
      licenseSection += `### Distributed under the terms of the [Artistic License](https://opensource.org/licenses/Artistic-2.0)`
      break;
    case "Other/No License":
      // code block
      licenseSection += "### This project is not licensed."
      break;
    default:
      licenseSection += "### This project is not licensed."
    // code block
  }
  return licenseSection
}

// TODO: Create a functions to generate markdown sections for README
function generateContent() {
  return `
  ## Table of Contents
  1. [Description] (#description)
  2. [Installation] (#installation)
  3. [Usage] (#usage)
  4. [License] (#license)
  5. [Contributing] (#contributing)
  6. [Tests] (#tests)
  7. [Questions] (#questions)
`;
}

function generateDescription(allInputData) {
  return `
  ## Description <a name="description"></a>\n
  - ${allInputData.motivation} 
  - ${allInputData.problem} 
  - ${allInputData.learn}
`;
}

// function checkForData(input) {
//   const display = ""
//   if (input == null) {
//     display = ""
// } else {

// }

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

function formatCollaborators(usernameString) {
  const includesComma = usernameString.includes(",");
  var formattedList = ""
  if (!usernameString) {
    formattedList = "No additional collaborators to credit for this repository."
  }
  else if (includesComma) {
    const usernamesArr = usernameString.split(", ");
    let i = 1
    let j = 0
    while (j < usernamesArr.length) {
      formattedList += `- [${usernamesArr[j]}](https://github.com/${usernamesArr[j]})\n`
      i++
      j++
    }
  } else {
    formattedList = `- [${usernameString}](https://github.com/${usernameString})`
  }

  return formattedList
}

// function formatCollaborators(string1, string2) {
//   const includesComma = string1.includes(",");
//   var formattedList = ""
//   if (includesComma) {
//     const namesArr = string1.split(", ");
//     const usernameArr = string2.split(", ")
//     let j = 0
//     while (j < namesArr.length) {
//       formattedList += `- [${namesArr[j]}] (https://github.com/${usernameArr[j]})\n`
//       j++
//     }
//   } else {
//     formattedList = `- [${string1}] (https://github.com/${string2})`
//   }
//   return formattedList
// }

function generateInstallation(allInputData) {
  return `
  ## Installation <a name="installation"></a>\n
  To install the project repository, please follow these steps:\n
  ${formatSteps(allInputData.installationSteps)}
`;
}

function checkThenDisplayScreenshot(allInputData) {
  let screenshotInfo = ""
  if (allInputData.confirmScreenshot) {
    screenshotInfo = `[${allInputData.screenshotDescription}] (/../images/${allInputData.screenshotFileName})`
  } else {
    screenshotInfo = ""
  }
  return screenshotInfo
}

function generateUsage(allInputData) {
  return `
  ## Usage <a name="usage"></a>\n
  ${allInputData.instructions}\n
  ${checkThenDisplayScreenshot(allInputData)}\n
`;
}

function generateCollaborators(allInputData) {
  return `
  ## Contributing <a name="contributing"></a>\n
  ${formatCollaborators(allInputData.collaboratorUsernames)}
`;
}

function generateTests (allInputData) {
  return `
  ## Tests <a name="tests"></a>\n
  Run the following command in terminal to test the functionality of this application:\n
  \```bash 
  ${allInputData.tests} 
  \```
`;
}

function otherContact (contactInput) {
  let otherContactDisplay=""
  if (contactInput) {
    otherContactDisplay = `### Other:\n
    ${contactInput}
    `;
  } else {
    otherContactDisplay=""
  }
  return otherContactDisplay
}

function generateQuestions (allInputData) {
  return `
  ## Questions <a name="questions"></a>\n
  If you have any questions about this project repository, please feel free to contact its author...\n
  ### GitHub:
  [${allInputData.username}](https://github.com/${allInputData.username})\n
  ### Email:
  [${allInputData.email}](mailto:${allInputData.email}.com)\n
  ${otherContact(allInputData.contact)}
`;
}

module.exports = generateMarkdown = allInputData => {
  //destructure page data by section
  console.log(allInputData);
  
  // formatSteps(allInputData)
   
  // const { description, contents, installation, usage, license, contributing, tests, questions } = generateMarkdown;
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
