const question = document.querySelector('#question')

function fillQuestionElements(data) {
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

const buttons = document.querySelectorAll('button');

for (const button of buttons) {
	button.addEventListener('click', (e) => {
		const answerIndex = e.currentTarget.dataset.answer;
		sendAnswer(answerIndex)
	})
}