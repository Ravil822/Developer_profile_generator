let inquirer = require("inquirer");
let fs = require('fs');
let axios = require("axios");


inquirer.prompt([
    {
        type: "input",
        name: "userName",
        message: "Please, enter a GitHub username"
    },
    {
        type: "list",
        message: "What color do you like as background color?",
        name: "color",
        choices: [
          "blue",
          "yellow",
          "green"
        ]
    }
]);