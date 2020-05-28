import React from 'react'
import Answer from './Answer'
import PropTypes from 'prop-types'

export default function Question({ questionId, questionText, questionExplanation, questionType, inbAnswers }) {
    const [answers, setAnswers] = React.useState(inbAnswers);
    return (
        <div>
            {questionText}
            <ul className='column'>
                {answers.map((answer) => {
                    return (
                        <li key={answer.answerId} >
                            <Answer 
                                answerText={answer.answerText}
                                isCorrect={answer.isCorrect}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

Question.propTypes = {
    questionText: PropTypes.string.isRequired,
    questionExplanation: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
    inbAnswers: PropTypes.array.isRequired
}