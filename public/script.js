const question = document.querySelector('#question');
const gameBoard = document.querySelector('#game-board');
const h2 = document.querySelector('h2')
const tipDiv = document.querySelector('#tip')

function fillQuestionElements(data) {
	if (data.winner === true) {
		gameBoard.style.display = "none"
		h2.innerText = "Wygrałeś"
		return
	}

	if (data.loser === true) {
		gameBoard.style.display = "none"
		h2.innerText = "Nie poszło tym razem. Przegrałeś"
		return
	}

	question.innerText = data.question;
	for (const i in data.answers) {
		const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
		answerEl.innerText = data.answers[i]
	}
}

function showNextQuestion() {
	fetch('/question', { method: 'GET' })
		.then(r => r.json())
		.then(data => {
			fillQuestionElements(data)
		})
}

showNextQuestion()

function sendAnswer(answerIndex) {
	fetch(`/answer/${answerIndex}`, { method: 'POST' })
		.then(r => r.json())
		.then(data => {
			handleAnswerFeedback(data);
		})
}

const goodAnswersSpan = document.querySelector('#good-answers')

function handleAnswerFeedback(data) {
	goodAnswersSpan.innerText = data.goodAnswers
	showNextQuestion()
}

const buttons = document.querySelectorAll('.answer-btn');

for (const button of buttons) {
	button.addEventListener('click', (e) => {
		const answerIndex = e.currentTarget.dataset.answer;
		sendAnswer(answerIndex)
	})
}

function handleFriendsAnswer(data) {
	tipDiv.innerText = data.text
}

function callToAFriend() {
	fetch('/help/friend', {
		method: 'GET',
	})
		.then(r => r.json())
		.then(data => {
			handleFriendsAnswer(data)
		})
}

document.querySelector('#callToAFriend').addEventListener('click', callToAFriend)