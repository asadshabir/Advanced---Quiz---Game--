import chalk from "chalk";
import inquirer from "inquirer";

let apiUrl = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"

let getQuiz = async(quiz:string)=>{
    let getQuiz = await fetch(quiz)
    let res = await getQuiz.json()
    return res.results;
}
const data = await getQuiz(apiUrl)
let quizData = async()=>{
    let score = 0 

    let name = await inquirer.prompt(
        [
            {
                name : "userName",
                message : "Enter Your Name :",
                type : "input"
            }
        ]
    )
    for(let i =1 ; i<10; i++){
        const answers = [...data[i].incorrect_answers, data[i].correct_answer]

        const startQuiz = await inquirer.prompt(
            [
                {
                    name: "quizSt",
                    message : data[i].question,
                    type : "list",
                    choices : answers.map((val:any)=>val
                )
                }
            ]
        )
        if (startQuiz.quizSt == data[i].correct_answer ){
            ++score 
        }

        if (startQuiz.quizSt == data[i].correct_answer){
            console.log(chalk.bold.green("Correct Ans"));
         
        }
        else{
            console.log(chalk.bold.red("Incorrect Ans"));
        }
        
       
    }
    console.log(chalk.bold.cyan(`Dear ${chalk.bold.magenta(name.userName)} Your Score is ${chalk.bold.yellow(score)} out of `)+chalk.bold.green(` "9"`));
    
}


quizData()



