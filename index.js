////////////////// IMPORT DEPENDANCIES //////////////////
const fs = require("fs")
const inquirer = require("inquirer")
////////////////// CREATE CLASSES //////////////////
class Employee{//Base employee class that allows users to create employees based off of this structure
    constructor(name,id,email){
        this.name=name
        this.id=id
        this.email=email
    }
    getName(){
        return this.name
    }
    getId(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    getRole(){
        return "Employee"
    }
}
class Manager extends Employee{
    constructor (name,id,email,officeNumber){
        super(name,id,email)//Super calls the parent class's constructor
        this.officeNumber=officeNumber
    }
    getRole(){
        return "Manager"
    }
}
class Engineer extends Employee{
    constructor (name,id,email,github){
        super(name,id,email)
        this.github=github
    }
    getGithub(){
        return this.github
    }
    getRole(){
        return "Engineer"
    }
}
class Intern extends Employee {
    constructor (name,id,email,school){
        super(name,id,email)
        this.school=school
    }
    getSchool(){
        return this.school
    }
    getRole(){
        return "Intern"
    }
}
////////////////// VARIABLES //////////////////
//The beginning part of the HTML
var HTMLHead=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="./simplestyle.css" rel="stylesheet">
    <title>Team Profile Generator!</title>
</head>
<body style="height:100%">
    <div class="container"style="height: 5%;">
        <header class="d-flex flex-wrap justify-content-center mb-4 border-bottom" >
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                <span class="fs-4">Team Profile Generator!</span>
              </a>
        </header>
    </div>
    <div class="b-example-divider ">
        <div class="container">
            <div style="height:80px"></div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
`
//The ending part of the html
var HTMLTail = `
            </div>
        </div>
    </body>
</html>
`
var CollectedInfo=[]
////////////////// QUESTIONAIRE //////////////////
inquirer
    .prompt([//Questions for the manager
        {
            name:"ManagerName",
            message:"Team manager's name: "
        },
        {
            type:"number",
            name:"ManagerNumber",
            message:"Manager's numbers: "
        },
        {
            name:"ManagerEmail",
            message:"Manager's Email: "
        },
        {
            type:"number",
            name:"OfficeNumber",
            message:"Office number: "
        }
    ])
    .then((answers)=>{//once answered, the answers are added to the end of the table
        CollectedInfo.push(new Manager(answers.ManagerName,answers.ManagerNumber,answers.ManagerEmail,answers.OfficeNumber))
        function AskQuestions(){//A function for asking intern/engineer questions. Should the user want to add more, this function is simple recalled
            inquirer
                .prompt([
                    {
                        type:"list",
                        name:"TypeOfEmployee",
                        message:"What is the role of the employee? (Select finish to end loop)",
                        choices:[
                            "Engineer",
                            "Intern",
                            "Finish"
                        ]
                    }
                ])
                .then((responses)=>{
                    if (responses.TypeOfEmployee=="Engineer"){
                        console.log("Engineer selected")
                        inquirer
                            .prompt([
                                {
                                    name:"EngineerName",
                                    message:"What is the engineer's name? "
                                },
                                {
                                    name: "EngineerId",
                                    message:"What is the engineer's employee id? "
                                },
                                {
                                    name: "EngineerEmail",
                                    message:"What is the engineer's email? "
                                },
                                {
                                    name:"EngineerGithub",
                                    message:"What is the engineer's github? "
                                }
                            ])
                            .then((answers2)=>{
                                CollectedInfo.push(new Engineer(answers2.EngineerName,answers2.EngineerId,answers2.EngineerEmail,answers2.EngineerGithub))
                                AskQuestions()//recall question after inserting data at the end of array
                            })
                            .catch((err)=>{
                                console.log(err)
                            })
                    }else if(responses.TypeOfEmployee=="Intern"){
                        console.log("Intern selected")
                        inquirer
                            .prompt([
                                {
                                    name:"InternName",
                                    message:"What is the intern's name? "
                                },
                                {
                                    name: "InternId",
                                    message:"What is the intern's employee id? "
                                },
                                {
                                    name: "InternEmail",
                                    message:"What is the intern's email? "
                                },
                                {
                                    name:"InternSchool",
                                    message:"What is the intern's school of graduation? "
                                }
                            ])
                            .then((answers2)=>{
                                CollectedInfo.push(new Intern(answers2.InternName,answers2.InternId,answers2.InternEmail,answers2.InternSchool))
                                AskQuestions()
                            })
                            .catch((err)=>{
                                console.log(err)
                            })
                    }else{
                        //Once user has inputed finish, it will loop through all entries given and create a body html string with the inserted info
                        var HTMLBody=``
                        for (var x=0;x<CollectedInfo.length;x++){
                            HTMLBody=HTMLBody+`
                                <div class="col">
                                    <div class="card shadow-sm">
                                        <div style="height:80px" class="d-flex justify-content-between bg-primary text-white fw-bold fs-6">
                                            <div class="p-4">${(CollectedInfo[x].getRole()=="Manager")? "???" : (CollectedInfo[x].getRole()=="Engineer") ? "???????":"????"}</div>
                                            <div class="p-4">${CollectedInfo[x].getName()}</div>
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text py-2">ID: ${CollectedInfo[x].getId()}</p>
                                            <p class="card-text py-2">Email: <a href="mailto: ${CollectedInfo[x].getEmail()}">${CollectedInfo[x].getEmail()}</a></p>
                                            ${(CollectedInfo[x].officeNumber)? `<p class='card-text py-2'>Office Number: ${CollectedInfo[x].officeNumber}</p>`:""}
                                            ${(CollectedInfo[x].github)? `<p class='card-text py-2'>Github: <a href="https://${CollectedInfo[x].getGithub()}" target="_blank">${CollectedInfo[x].getGithub()}</a></p>`:""}
                                            ${(CollectedInfo[x].school)? `<p class='card-text py-2'>School of graduation: ${CollectedInfo[x].getSchool()}</p>`:""}
                                        </div>
                                    </div>
                                </div>
                            `
                        }
                        //once the loop is finish, it will stitch together the head, body, and tail of the HTML
                        var FinishedHtml=HTMLHead+HTMLBody+HTMLTail
                        //finally, the FinishedHTML is written to an HTML document called EmployeeChart.html within Distribution
                        fs.writeFile("./Distribution/EmployeeChart.html",FinishedHtml,(err)=>{
                            err ? console.error(err) : console.log(`HTML CREATED`)
                        })
                    }
                })
                .catch((err)=>{
                    console.error(err)
                })
        }
        AskQuestions()
    })
    .catch((err)=>{s
        console.error(err)
    });
////////////////// EXPORT PROJECT //////////////////
module.exports.Employee=Employee
module.exports.Manager=Manager
module.exports.Engineer=Engineer
module.exports.Intern=Intern