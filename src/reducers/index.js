import {combineReducers} from "redux"
import userReducer from './userReducer'


const allReducers = combineReducers({
    
    userReducer,
})

export default allReducers