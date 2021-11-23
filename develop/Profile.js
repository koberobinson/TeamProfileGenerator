const inquirer = require("inquirer");
const Manager = require("./employees/manager");
const Engineer = require("./employees/engineeer");
const Intern = require("./employees/intern");
const Employee = require("./employees/employee")
const path = require("path");
const fs = require("fs"); 

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./employees/render");

const employeesArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function createManager() {
  inquirer
      .prompt([
        { 
          type: "input",
          name: "name",
          message: "Enter manager name:"
         },
         {
          type: "input",
          name: "id",
          message: "Enter manager id:"
         },
         {
          type: "input",
          name: "email",
          message: "Enter manager email:"
         },
         {
          type: "input",
          name: "officeNumber",
          message: "Enter manager's office number:"
          }      
      ])
      .then(function(res) {
        employeesArray.push(new Manager(res.name, res.id, res.email, res.officeNumber));
        createEmployee();
       });
}

function createEmployee() {
  inquirer
      .prompt(
        {
          type: "list",
          message: "Add another employee:",
          name: "role",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more employee"]
        }      
      )
      .then(function(answer) {
        switch(answer.role) {
          case "Engineer":
            createEngineer();
            break;
          case "Intern":
            createIntern();
            break;
          default:
            getHTML = render(employeesArray);
            checkDirectorySync(OUTPUT_DIR);
            fs.writeFile(outputPath, getHTML, function(err) {
              if (err) throw err;
            });            
        }
      });
}

function createEngineer() {
  inquirer
    .prompt([
      { 
        type: "input",
        name: "name",
        message: "Enter engineer's name:"
      },
      {
        type: "input",
        name: "id",
        message: "Enter engineer's id:"
      },
      {
        type: "input",
        name: "email",
        message: "Enter engineer's email:"
      },
      {
        type: "input",
        name: "github",
        message: "Enter engineer's github username:"
      }      
    ])
    .then(function(res) {
      employeesArray.push(new Engineer(res.name, res.id, res.email, res.github));
      createEmployee();
    });
}

function createIntern() {
  inquirer
    .prompt([
      { 
        type: "input",
        name: "name",
        message: "Enter intern's name:"
      },
      {
        type: "input",
        name: "id",
        message: "Enter intern's id:"
      },
      {
        type: "input",
        name: "email",
        message: "Enter intern's email:"
      },
      {
        type: "input",
        name: "school",
        message: "Enter intern's school name:"
      }      
    ])
    .then(function(res) {
      employeesArray.push(new Intern(res.name, res.id, res.email, res.school));
      createEmployee();
    });
}


function checkDirectorySync(directory) {  
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}

createManager();