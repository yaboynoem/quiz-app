export type QuestionAPI = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type QuestionsAPI = QuestionAPI & { answers: string[] }
