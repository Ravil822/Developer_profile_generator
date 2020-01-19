let inquirer = require("inquirer");
let fs = require('fs');
let axios = require("axios");


inquirer.prompt([
    {
        type: "input",
        name: "gitUser",
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
]).then(answers => {
    let color = answers.color
    const queryUrl = `https://api.github.com/users/${answers.gitUser}`;
    const queryUrlStar = `https://api.github.com/users/${answers.gitUser}/repos?per_page=100`;
    axios.get(queryUrl).then(function (res) {
        let name = res.data.name;
        let profileImage = res.data.avatar_url;
        let userCompany = res.data.company;
        let repos = res.data.public_repos;
        let followers = res.data.followers;
        let following = res.data.following;
        let user = res.data.html_url;
        let location = res.data.location;
        let bio = res.data.bio;
        console.log(userCompany);
        console.log(name);
        console.log(profileImage);
        console.log(location)
        console.log(user)    
    })
    console.log(color);
    let stars =  axios.get(queryUrlStar).then(function (resStar) {
        let dat = resStar.data[0].stargazers_count;
    })




});

