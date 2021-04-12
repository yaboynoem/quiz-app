import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    startQuiz: null,
    setQuestions: ['newQuestions'],
    checkAnswer: ['correct', 'answerObject'],
    nextQuestion: ['nextQuestionNumber'],
    setGameOver: ['flag']
})

export const QuizTypes = Types
export default Creators