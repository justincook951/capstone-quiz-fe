import React from 'react'
import * as actiontype from '../utils/action_types'
import { updateAnswer, deleteAnswer } from '../utils/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash, faCheck, faBan } from '@fortawesome/free-solid-svg-icons'

export default function AnswerEditor({ answer }) 
{
    const [initialAnswerText,] = React.useState(answer.answerText)
    const [id,] = React.useState(answer.id);
    const [questionId,] = React.useState(answer.questionId)
    const [editMode, setEditMode] = React.useState(false);
    const [answerText, setAnswerText] = React.useState(answer.answerText);
    const [isCorrect, setIsCorrect] = React.useState(answer.isCorrect);
    const callDeleteAnswer = (id) => {
        deleteAnswer(id)
        .then(() => window.location.reload())
        .catch((error) => dispatch({type: actiontype.ERROR, error: error, loading: false}));
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
                        <span onClick={() => callSaveQuestion()}><FontAwesomeIcon icon={faCheck} className="icon-hover"/> </span>
                        <span onClick={() => {
                            setAnswerText(initialAnswerText)
                            setEditMode(false)
                        }}><FontAwesomeIcon icon={faBan} className="icon-hover"/></span>
                </div>
                    </div>
                : 
                    <div>
                        <span onClick={() => setEditMode(true)}><FontAwesomeIcon icon={faPencilAlt} className="icon-hover"/> </span>
                        <span onClick={() => callDeleteAnswer(id)}><FontAwesomeIcon icon={faTrash} className="icon-hover"/> </span>
                        <p>{answerText}: ({id}) - {isCorrect ? "Correct" : "Incorrect"}</p>
                    </div>
            }
        </li>
    )
}

