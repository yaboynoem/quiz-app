import { QuestionsAPI } from './QuestionsAPIType'
import { Answer } from './AnswerType'

export type Quiz = {
    loading: boolean,
    questions: QuestionsAPI[],
    number: number,
    userAnswers: Answer[],
    score: number,
    gameOver: boolean
}