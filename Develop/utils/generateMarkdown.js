// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// // TODO: Create a functions to generate markdown sections for README
// function generateContent(allInputData) {
//   return `
//   ## Table of Contents
//   1. [Description] (#description)
//   2. [Installation] (#installation)
//   3. [Usage] (#usage)
//   4. [License] (#license)
//   5. [Contributing] (#contributing)
//   6. [Tests] (#tests)
//   7. [Questions] (#questions)
// `;
// }

// function generateDescription(allInputData) {
//   return `
//   ## Description <a name="description"></a>
//   - ${allInputData.motivation} ${allInputData.problem} 
//   - ${allInputData.learn}
// `;
// }

// function generateInstallation(allInputData) {
//   return `
//   ## Installation <a name="installation"></a>
//   To install the project repository, please follow these steps:
//   - ${allInputData.installationFirstStep}

// `;
// }

// function generateUsage(allInputData) {
//   return `
//   ## Installation <a name="installation"></a>
//   To install the project repository, please follow these steps:
//   - ${allInputData.installationFirstStep}

// `;
// }


module.exports = generateMarkdown = allInputData => {
  //destructure page data by section
  console.log(allInputData);
 // const { description, contents, installation, usage, license, contributing, tests, questions } = generateMarkdown;
  return `
  # ${allInputData.projectName}

  `;
};
