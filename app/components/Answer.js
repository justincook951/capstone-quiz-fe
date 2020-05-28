import React from 'react'
import * as actiontype from '../utils/action_types'

function answerReducer(state, action) {
    if (action.type === actiontype.SUCCESS) {
        return {
            
        }
    }
    else if (action.type === actiontype.FAILURE) {
        return {
            
        }
    }
    else if (action.type === actiontype.ERROR) {
        return {

        }
    }
}

export default function Answer({ answerText, isCorrect }) {
    return (
        <p>{answerText}: {isCorrect ? "correct" : "incorrect"}</p>
    )
}