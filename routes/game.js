function gameRoutes(app) {

	let goodAnswers = 0;

	let callToAFriendUsed = false;
	let questionToTheCrowdUsed = false;
	let halfOnHalfUsed = false;
	let isGameOver = false;

	const questions = [
		{
			question: 'jaki jest najlepszy język programowania?',
			answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
			correctAnswer: 2
		},
		{
			question: 'Czy pizza jest okrągła',
			answers: ['tak', 'nie', 'nie wiem', 'czwartek'],
			correctAnswer: 0
		},
		{
			question: 'Jakiej naradowości jest Jim Carey',
			answers: ['Amerykanin', 'Belg', 'Kanadyjczyk', 'Anglik'],
			correctAnswer: 2
		},
		{
			question: 'Jakim stanem rządził Arnold Schwarzeneger',
			answers: ['Nevada', 'Utah', 'Floryda', 'California'],
			correctAnswer: 3
		},
	];

	app.get('/question', (req, res) => {

		if (goodAnswers === questions.length) {
			res.json({
				winner: true
			})
		} else if (isGameOver) {
			res.json({
				loser: true
			})
		} else {
			const nextQuestion = questions[goodAnswers];
			const { question, answers } = nextQuestion;

			res.json({
				question, answers
			})
		}

	})

	//zbierania informacji z url po ":"
	app.post('/answer/:index', (req, res) => {

		if (isGameOver) res.json({
			loser: true
		})

		const { index } = req.params;
		const question = questions[goodAnswers]
		const isCorrect = question.correctAnswer === Number(index)

		if (isCorrect) {
			goodAnswers++;
		} else {
			isGameOver = true;
		}

		res.json({
			correct: isCorrect,
			goodAnswers
		})

	})
}

module.exports = gameRoutes;