let Questions = [];
const ques = document.getElementById("ques")

async function fetchQuestions() {
	try {
		const response = await
		fetch('https://opentdb.com/api.php?amount=10&category=26&difficulty=easy');
		if (!response.ok) {
			throw new Error(`Something went wrong!!
		Unable to fecth the data`);
		}
		const data = await response.json();
		Questions = data.results;
	}
	catch (error) {
		console.log(error);
		ques.innerHTML = `<h5 style='color: yellow'>
		${error}</h5>`;
	}
}
fetchQuestions();

let currQuestion = 0
let score = 0

if (Questions.length === 0) {
	ques.innerHTML = `<h5>Loading your quiz</h5>`
}

function loadQues() {
    const opt = document.getElementById("opt");
    let currentQuestion = Questions[currQuestion].question;
    if (currentQuestion.indexOf('"') > -1) {
        currentQuestion = currentQuestion.replace(/"/g, '\"');
    }
    if (currentQuestion.indexOf() > -1) {
        currentQuestion = currentQuestion.replace(/&#039;/g, '\'');
    }
    ques.innerText = currentQuestion;
    opt.innerHTML = ""
    const correctAnswer = Questions[currQuestion].correct_answer;
    console.log(Questions);
    const incorrectAnswers = Questions[currQuestion].incorrect_answers;
    const options = [correctAnswer, ...incorrectAnswers];
    options.sort(() => Math.random() - 0.5);
    options.forEach((option) => {
        if (option.indexOf('"') > -1) {
            option = option.replace(/"/g, '\"');
        }
        if (option.indexOf() > -1) {
            option = option.replace(/'/g, '\'');
        }
        const choicesdiv = document.createElement("div");
        const choiceButton = document.createElement("button"); // Create a button element
        choiceButton.type = "button"; // Set button type
        choiceButton.textContent = option; // Set button text content
        choiceButton.addEventListener("click", function() { // Add event listener to button
            checkAns(option); // Pass the option to checkAns function
        });
        choicesdiv.appendChild(choiceButton); // Append button to choicesdiv
        opt.appendChild(choicesdiv); // Append choicesdiv to opt container
    });
}


setTimeout(() => {
	loadQues();
	if (Questions.length === 0) {
		ques.innerHTML = `<h5 style='color: red'>Unable 
		to fetch data, Please try again!!</h5>`
	}
}, 2000)


function loadScore() {
	const totalScore = document.getElementById("score");
	totalScore.textContent = `You scored ${score} out 
	of ${Questions.length}`;
	totalScore.innerHTML += "<h3>All Answers</h3>"
	Questions.forEach((el, index) => {
		totalScore.innerHTML += `<p>${index + 1}.
		${el.correct_answer}</p>`
	})
}


function nextQuestion() {
	if (currQuestion < Questions.length - 1) {
		currQuestion++;
		loadQues();
	} else {
		document.getElementById("opt").remove()
		document.getElementById("ques").remove()
		document.getElementById("btn").remove()
		loadScore();
	}
}

function checkAns(option) {
    const selectedAns = option;

    if (selectedAns === Questions[currQuestion].correct_answer) {
        score++;
    }

    nextQuestion();
}

