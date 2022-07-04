// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a functions to generate markdown sections for README
function generateDescription(inputData) {
  return `# ${inputData.projectName}

`;
}

module.exports = generateMarkdown => {
  //destructure page data by section
  const { description, contents, installation, usage, license, contributing, tests, questions } = generateMarkdown;

  return `

  `
};
