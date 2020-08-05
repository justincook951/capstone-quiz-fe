import React from 'react'
import * as actiontype from '../utils/action_types'
import { updateAnswer } from '../utils/api'

export default function AnswerEditor({ answer }) 
{
    const [initialAnswerText,] = React.useState(answer.answerText)
    const [id,] = React.useState(answer.id);
    const [questionId,] = React.useState(answer.questionId)
    const [editMode, setEditMode] = React.useState(false);
    const [answerText, setAnswerText] = React.useState(answer.answerText);
    const [isCorrect, setIsCorrect] = React.useState(answer.isCorrect);
    const callDeleteAnswer = (id) => {
        console.log(id)
    }

    const callSaveQuestion = () => {
        var answer = {
            id: id,
            answerText:answerText,
            isCorrect: isCorrect,
            questionId: questionId
        }
        updateAnswer(answer)
            .then(() => window.location.reload());
    }

    return (
        <li 
            key={id}
            className="edit-link-rows"
        >
            
            {editMode
                ?
                    <div>
                        <div className="text-input">
                        <label htmlFor="answerText" className="reqd">Provide the question text below: </label>
                        <input 
                            className="input-fill" 
                            type="text" 
                            name="answerText" 
                            placeholder="The text for this answer" 
                            defaultValue={answerText}
                            id="answerText"
                            onChange={(e) => setAnswerText(e.target.value)}
                        />
                        <label htmlFor="isCorrect">Correct answer?</label>
                        <input
                            type="checkbox"
                            name="isCorrect"
                            checked={isCorrect}
                            id="isCorrect"
                            onChange={() => setIsCorrect(!isCorrect)}
                        />
                        <br/>
                        <span onClick={() => callSaveQuestion()}>Save</span>
                        <span onClick={() => {
                            setAnswerText(initialAnswerText)
                            setEditMode(false)
                        }}>Cancel</span>
                </div>
                    </div>
                : 
                    <div>
                        <span onClick={() => setEditMode(true)}>Edit </span>
                        <span onClick={() => callDeleteAnswer(id)}>Delete </span>
                        <p>{answerText}: ({id}) - {isCorrect ? "Correct" : "Incorrect"}</p>
                    </div>
            }
        </li>
    )
}

