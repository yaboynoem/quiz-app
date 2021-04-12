import { QuizTypes } from './Actions'
import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { Quiz } from '../../Types/QuizType'

export const startQuiz = (state: Quiz) => ({
    ...state,
    loading: true,
    score: 0,
    number: 0,
    userAnswers: [],
    gameOver: false
})

export const setQuestions = (state: Quiz, {newQuestions}: any) => ({
    ...state,
    questions: newQuestions,
    loading: false
})

export const checkAnswer = (state: Quiz, {correct, answerObject}: any) => ({
    ...state,
    score: correct ? state.score+1 : state.score,
    userAnswers: [...state.userAnswers, answerObject]
})

export const nextQuestion = (state: Quiz, {nextQuestionNumber}: any) => ({
    ...state,
    number: nextQuestionNumber
})

export const setGameOver = (state: Quiz, {flag}: any) => ({
    ...state,
    gameOver: flag
})

export const reducer = createReducer(INITIAL_STATE, {
    [QuizTypes.START_QUIZ]: startQuiz,
    [QuizTypes.SET_QUESTIONS]: setQuestions,
    [QuizTypes.CHECK_ANSWER]: checkAnswer,
    [QuizTypes.NEXT_QUESTION]: nextQuestion,
    [QuizTypes.SET_GAME_OVER]: setGameOver
})

