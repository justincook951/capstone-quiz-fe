import React from 'react'
import Answer from './Answer'
import PropTypes from 'prop-types'

export default function Question({ 
    questionId, 
    questionText, 
    questionExplanation, 
    questionType, 
    inbAnswers,
    previousQuestion,
    nextQuestion,
    previousEnabled,
    nextEnabled }) {
    const checkAnswer = () => {
        console.log("Answer checked")
    }
    return (
        <div className="testArea">
            <li key={questionId}>
                {questionText}
                <ul className='column'>
                    {inbAnswers.map((answer) => {
                        return (
                            <li key={`q-${questionId}-answer-${answer.answerId}`} >
                                <Answer 
                                    answerText={answer.answerText}
                                    isCorrect={answer.isCorrect}
                                />
                            </li>
                        )
                    })}
                    <li key={`idk-${questionId}`}>
                        <Answer 
                            answerText="I don't know"
                            isCorrect={false}
                        />
                    </li>
                </ul>
            </li>
            <div className="row space-top">
                <button 
                    className="btn btn-style"
                    onClick={checkAnswer}>Submit</button>
                <button 
                    className="btn btn-style"
                    onClick={previousQuestion} 
                    disabled={!previousEnabled} >Previous</button>
                <button 
                    className="btn btn-style"
                    onClick={nextQuestion}
                    disabled={!nextEnabled} >Next</button>
            </div>
        </div>
    )
}

Question.propTypes = {
    questionText: PropTypes.string.isRequired,
    questionExplanation: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
    inbAnswers: PropTypes.array.isRequired
}