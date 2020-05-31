import React from 'react'
import * as actiontype from '../utils/action_types'

export default function Answer({ 
    answerText, 
    isCorrect, 
    onChoose, 
    bubbleClass, 
    displayAnswers = true,
    imgSrc }) 
{
    return (
        <div className="answer" onClick={onChoose}>
            <span className={bubbleClass}></span>
            { displayAnswers 
                ? <img src={imgSrc} className='icon-small' alt=""/> 
                : null }
            <p>{answerText}</p>
        </div>
    )
}