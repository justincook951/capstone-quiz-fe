import React from 'react'
import Answer from './Answer'
import PropTypes from 'prop-types'

export default function Question({ questionText, questionExplanation, questionType, inbAnswers }) {
    const [answers, setAnswers] = React.useState(inbAnswers);
    return (
        <div>
            <ul className='column'>
                {answers.map((answer) => {
                    /*const { answerId, answerText, isCorrect } = answer
                    return (
                        <li key={answer} >
                            <p>{answerText}: is correct: {isCorrect}</p>
                        </li>
                    )*/
                    return (
                        <li key={answer} >
                            <Answer />
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