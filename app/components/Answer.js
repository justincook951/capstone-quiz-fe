import React from 'react'
import * as actiontype from '../utils/action_types'

export default function Answer({ answerText, isCorrect }) {
    return (
        <p>{answerText}: {isCorrect ? "correct" : "incorrect"}</p>
    )
}