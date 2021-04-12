import React from 'react'

//Types
import { Question } from '../Types/QuestionType'

//Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles'

const QuestionCard: React.FC<Question> = ({ 
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNo, 
    totalQuestions 
}) => (
    <Wrapper>
        <p className="number">
            Question: {questionNo} / {totalQuestions}
        </p>

        <p dangerouslySetInnerHTML={{ __html: question }}/>
        <div>
            {answers.map((answer, index) => (
                <ButtonWrapper
                    key={index}
                    correct={userAnswer?.correct_answer === answer}
                    userClicked={userAnswer?.answer === answer}
                >
                    <button disabled={!!userAnswer} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }}/>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
)

export default QuestionCard