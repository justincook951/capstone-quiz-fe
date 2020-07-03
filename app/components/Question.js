import React from 'react'
import Answer from './Answer'
import PropTypes from 'prop-types'
import * as actiontype from '../utils/action_types'
import { shuffleArray } from '../utils/generic_functions'

export default function Question({ 
    inbquestionId, 
    inbquestionText, 
    inbquestionExplanation, 
    inbAnswers,
    nextQuestion,
    nextEnabled,
    onSubmitFunc }
){
    
    const [newestAnswer, changeNewestAnswer] = React.useState(null);
    const [oldestAnswer, changeOldestAnswer] = React.useState(null);
    const [displayExplanation, changeDisplayExplanation] = React.useState(false);
    const [displayAnswers, changeDisplayAnswers] = React.useState(false);
    const [arrayShuffled, changeArrayShuffled] = React.useState(false);
    const [questionId,] = React.useState(inbquestionId);
    const [questionText,] = React.useState(inbquestionText);
    const [questionExplanation,] = React.useState(inbquestionExplanation);
    const randomOrderAnswers = React.useRef(shuffleArray(inbAnswers, arrayShuffled, changeArrayShuffled));
    const checkAnswer = () => {
        changeDisplayAnswers(true);
        changeDisplayExplanation(true);
        let fullQuestionObj = {
            questionId: questionId,
            questionText: questionText,
            questionExplanation: questionExplanation,
            answers: displayAnswers
        }
        if (newestAnswer.isCorrect && oldestAnswer.isCorrect) {
            // User got the answer correct
            onSubmitFunc({ type: actiontype.REMOVE, questionId: questionId });
        }
        else if (newestAnswer.isCorrect || oldestAnswer.isCorrect) {
            // User got the answer half correct - add to question queue 1x
            onSubmitFunc({ type: actiontype.REQUEUE, number: 1, question: fullQuestionObj });
        }
        else if (newestAnswer.answerId === -1) {
            // User chose "I don't know" - add to question queue 2x
            onSubmitFunc({ type: actiontype.REQUEUE, number: 2, question: fullQuestionObj });
        }
        else {
            // User got the answer completely wrong - add to question queue 3x
            onSubmitFunc({ type: actiontype.REQUEUE, number: 3, question: fullQuestionObj });
        }
    }
    const chooseAnswer = (inbAnswer) => {
        /*
            Paths:
            The user tried to do anything *after* they submitted
            The user chose "I don't know"
            The user had selected "I don't know" and is now choosing an answer
            The user selected an answer for the first time (I think it might be this answer)
            The user selected the same answer a second time (I am sure this is the answer)
            The user selected a different answer than the one they chose the first time (It could be one of these two)
            The user selected a third answer
        */
        if (displayAnswers) {
            // The user tried to do anything *after* they submitted - do nothing
            return;
        }
        if (inbAnswer.answerId === -1) {
            // The user chose "I don't know" - set both oldest and newest, to fill bubble
            changeOldestAnswer(inbAnswer);
            changeNewestAnswer(inbAnswer);
        }
        else if (oldestAnswer && oldestAnswer.answerId === -1) {
            // The user had selected "I don't know" and is now choosing an answer - clear "I don't know"
            changeOldestAnswer(null);
            changeNewestAnswer(inbAnswer);
        }
        else if (!newestAnswer) {
            // The user selected an answer for the first time - set half the bubble
            changeNewestAnswer(inbAnswer);
        }
        else if ((newestAnswer && !oldestAnswer && newestAnswer === inbAnswer)
                || (newestAnswer && oldestAnswer === inbAnswer)) {
            // The user selected the same answer twice - completely fill the bubble
            changeOldestAnswer(inbAnswer);
            changeNewestAnswer(inbAnswer);
        }
        else if (newestAnswer && !oldestAnswer && newestAnswer !== inbAnswer) {
            // The user selected a different answer than the one they chose the first time - place newest in oldest and place selection in newest
            changeOldestAnswer(newestAnswer);
            changeNewestAnswer(inbAnswer);
        }
        else if (newestAnswer && oldestAnswer && oldestAnswer !== inbAnswer) {
            // The user already had two answers (or one very sure answer), but clicked a third answer that wasn't "I don't know" OR the other selections
            // Effectively the same as the above - replace the oldest with the newest, and place this selection as the new newest
            changeOldestAnswer(newestAnswer)
            changeNewestAnswer(inbAnswer)
        }
        // If the user clicks the same answer 3 times then we don't have to do anything :)
    }
    const incorrectSrc = '/app/assets/red-x.png';
    const correctSrc = '/app/assets/green-check.png';
    const idkSrc = '/app/assets/question-mark.png';
    const circleRight = "answer-circle-right";
    const circleLeft = "answer-circle-left";
    const circleFull = "answer-circle-full";
    const circleEmpty = "answer-circle-empty";
    return (
        <React.Fragment>
            {questionText}
            <ul className='column'>
                {randomOrderAnswers.current.map((answer) => {
                    let spanClassName = circleEmpty;
                    if (answer === newestAnswer && answer !== oldestAnswer) {
                        spanClassName = circleLeft;
                    }
                    else if (answer === oldestAnswer && answer !== newestAnswer) {
                        spanClassName = circleRight;
                    }
                    else if (answer === oldestAnswer && answer === newestAnswer) {
                        spanClassName = circleFull;
                    }
                    return (
                        <li key={`q-${questionId}-answer-${answer.answerId}`} >

                            <Answer 
                                answerText={answer.answerText}
                                isCorrect={answer.isCorrect}
                                onChoose={() => chooseAnswer(answer)}
                                bubbleClass={spanClassName}
                                displayAnswers={displayAnswers}
                                imgSrc={answer.isCorrect ? correctSrc : incorrectSrc}
                            />
                        </li>
                    )
                })}
                <li>
                    <Answer 
                        answerText="I don't know"
                        isCorrect={false}
                        onChoose={() => chooseAnswer({answerId: -1})}
                        bubbleClass={ newestAnswer && newestAnswer.answerId === -1 ? circleFull : circleEmpty }
                        displayAnswers={displayAnswers}
                        imgSrc={idkSrc}
                    />
                </li>
            </ul>
            {displayExplanation ? <h4>{questionExplanation}</h4>: null }
            <div className="row space-top">
                <button 
                    className="btn btn-style"
                    disabled={!newestAnswer || !oldestAnswer || displayAnswers}
                    onClick={checkAnswer}>Submit</button>
                <button 
                    className="btn btn-style"
                    onClick={() => nextQuestion(Math.random() * 10)}
                    disabled={!nextEnabled} >Next</button>
            </div>
        </React.Fragment>
    )
}

Question.propTypes = {
    inbquestionText: PropTypes.string.isRequired,
    inbquestionExplanation: PropTypes.string.isRequired,
    inbAnswers: PropTypes.array.isRequired,
    nextQuestion: PropTypes.func.isRequired
}