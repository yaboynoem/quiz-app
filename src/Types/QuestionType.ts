import { Answer } from './AnswerType'

export type Question = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: Answer | undefined;
    questionNo: number;
    totalQuestions: number;
}