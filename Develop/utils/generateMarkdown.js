// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  console.log(license)
  licenseSection= ""
  switch(license) {
    case "MIT":
       licenseSection += ``
      // code block
      break;
    case "MIT":
      // code block
      break;
    default:
      licenseSection = "There is no license\n"
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



function formatSteps(string) {
  const includesComma = string.includes(",");
  var formattedList=""
  if (includesComma) {
  const stepsArr = string.split(", ");
  let i =1
  let j=0
  while (j < stepsArr.length){
    formattedList+= `${i}. ${stepsArr[j]}\n`
    i++
    j++
  }
} else { 
  formattedList= `1. ${string}\n`
}

return formattedList
}

function formatCollaborators(string1, string2) {
  const includesComma = string1.includes(",");
  var formattedList=""
  if (includesComma) {
    const namesArr = string1.split(", ");
    const usernameArr = string2.split(", ")
    let j=0
    while (j < stepsArr.length){
      formattedList+= `- [${namesArr[j]}] (https://github.com/${usernameArr[j]})\n`
      j++
    }
  } else {
    formattedList = `- [${string1}] (https://github.com/${string2})`
  }
  return formattedList
}

function generateInstallation(allInputData) {
  return `
  ## Installation <a name="installation"></a>\n
  To install the project repository, please follow these steps:\n
  ${formatSteps(allInputData.installationSteps)}
`;
}

function checkThenDisplayScreenshot (allInputData) {
  const screenshotInfo = ""
  if (allInputData.confirmScreenshot) {
    screenshotInfo = `[${screenshotDescription}] ()`
  } else {

  }
  return screenshotInfo
}

function generateUsage(allInputData) {
  return `
  ## Usage <a name="usage"></a>\n
  ${allInputData.instructions}\n


`;
}


module.exports = generateMarkdown = allInputData => {
  //destructure page data by section
  console.log(allInputData);
  // formatSteps(allInputData)
  formatCollaborators(allInputData.collaboratorNames, allInputData.collaboratorUsernames)
 // const { description, contents, installation, usage, license, contributing, tests, questions } = generateMarkdown;
  return `
  # ${allInputData.projectName}

  ${generateContent()}

  ${generateDescription(allInputData)}

  ${generateInstallation(allInputData)}
  



  ${renderLicenseSection(allInputdata.license)}
  `;
};
