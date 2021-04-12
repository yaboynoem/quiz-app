import React from 'react'
import { fetchQuizQuestions, Difficulty } from './API'
import { connect, ConnectedProps } from 'react-redux'

//Containers
import QuestionCard from './Containers/QuestionCard'

//Types
import { QuestionsAPI } from './Types/QuestionsAPIType'
import { Answer } from './Types/AnswerType'
import { Quiz } from './Types/QuizType'

//Styles
import { GlobalStyle, Wrapper } from './App.styles'

//Actions
import QuizActions from './Stores/Quiz/Actions'

const TOTAL_QUESTIONS = 10

const mapState = (state: Quiz) => ({
  loading: state.loading,
  gameOver: state.gameOver,
  score: state.score,
  questions: state.questions,
  number: state.number,
  userAnswers: state.userAnswers
})

const mapDispatch = {
  startQuiz: () => (QuizActions.startQuiz()),
  setQuestions: (newQuestions: QuestionsAPI[]) => (QuizActions.setQuestions(newQuestions)),
  checkAnswer: (correct: boolean, answerObject: Answer) => (QuizActions.checkAnswer(correct, answerObject)),
  nextQuestion: (nextQuestionNumber: number) => (QuizActions.nextQuestion(nextQuestionNumber)),
  setGameOver: (flag: boolean) => (QuizActions.setGameOver(flag))
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

class App extends React.Component<Props> {

  onStartQuiz = async () => {
    const { startQuiz, setQuestions } = this.props

    startQuiz()

    //Do error handling
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )
    
    setQuestions(newQuestions)
  }

  onCheckAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { gameOver, questions, number, checkAnswer } = this.props 

    if(!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[number].correct_answer === answer
      
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correct_answer: questions[number].correct_answer
      }

      checkAnswer(correct, answerObject)
    }
  }

  onNextQuestion = () => {
    const { number, nextQuestion, setGameOver } = this.props
    
    const nextQuestionNumber = number + 1

    if(nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      nextQuestion(nextQuestionNumber)
    }
  }

  render() {
    const { gameOver, questions, number, score, userAnswers, loading } = this.props
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <h1>REACT QUIZ</h1>
          { (gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
            <button className="start" onClick={this.onStartQuiz}>
              Start
            </button>
          )}
          { !gameOver && <p className="score">Score: {score}</p> }
          { loading && <p>Loading Questions...</p> }
          { !loading && !gameOver && (
            <QuestionCard 
              questionNo={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined }
              callback={this.onCheckAnswer}
            />
          )}
          { !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={this.onNextQuestion}>
              Next Question
            </button>
          ) : null}
        </Wrapper>
      </>
    ) 
  }
}

export default connector(App);
