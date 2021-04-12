import { createStore } from 'redux'
import { reducer as quizReducer } from './Quiz/Reducer'

export const store = createStore(quizReducer)
