const inquirer = require("inquirer");
const fs = require("fs-extra");
const axios = require("axios");
const htmpPDF = require("html-pdf");



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
        // let name = res.data.name;
        // let profileImage = res.data.avatar_url;
        // let userCompany = res.data.company;
        // let repos = res.data.public_repos;
        // let followers = res.data.followers;
        // let following = res.data.following;
        // let user = res.data.html_url;
        // let location = res.data.location;
        // let bio = res.data.bio;
        
        let stars =  axios.get(queryUrlStar).then(function (resStar) {
            let dat = resStar.data[0].stargazers_count;
            stars = dat;
            
            let html = generateHTML(answers, res, stars);
            htmpPDF.create(html).toFile(`./${res.data.name}.pdf`, function (err, res) {
                if (err) return console.log(err);
            });
        }) 
        
        console.log(`Successfully wrote ${res.data.name}.pdf`);
  
    })
    // console.log(color);

    .catch(function (err) {
        console.log(err);
    });

});

function generateHTML(answers, res, stars){
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css">

    <title></title>
    <style>
        .main-card {
            background: ${answers.color};
        }
        .card-footer{
            background: lightgray;
        }
    </style>
</head>

<body>
<br>
    <div class="container">
        <div class="main-card text-center">
            <br>
            <div class="text-center">
                <img src="${res.data.avatar_url}" class="rounded-circle" alt="user image" style="height:200px">
                <h2>Hi!</h2>
                <h2>My name is ${res.data.name}</h2>
                <h2>Currently @ ${res.data.company}</h2>
                <div class="row justify-content-center">
                    <nav class="nav">
                      <a class="nav-link active" href="https://www.google.com/maps/search/?api=1&query=${res.data.location}"><i class="fas fa-location-arrow fa-lg white-text mr-md- mr- fa-1x"></i>
                        ${res.data.location}</a>
                      <a class="nav-link" href="${res.data.html_url}"><i class="fab fa-github fa-lg white-text mr-md- mr- fa-1x"></i> GitHub</a>
                      <a class="nav-link" href="#"><i class="fas fa-rss fa-lg white-text mr-md- mr- fa-1x"></i> Blog</a>
                    </nav>
                  </div>                
                  <p>${res.data.bio}</p>

            </div>
            <br>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Public repositories</h5>
                                <h4>${res.data.public_repos}</h4>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Followers</h5>
                                <h4>${res.data.followers}</h4>                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">GitHub Stars</h5>
                                <h4>${stars}</h4>                            
                                </div>
                        </div>
                    </div>
                    <br>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Users following</h5>
                                <h4>${res.data.following}</h4>                            
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted">
                copy@right
            </div>
        </div>
    </div>
</body>

</html>`
}

