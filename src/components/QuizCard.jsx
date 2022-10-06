import React from 'react';
import he from 'he'

function QuizCard(props) {

// Renders answers, and answer results when showResult is true.
const answerElements = props.shuffledAnswers.map((answer, index) => {
    return (
        <button
            key={index}
            onClick={() => handleSelect(answer, props.question)}
            className={`button ${
                answer === props.userAnswer ? 'selected' : ''
                }
                ${props.showResult && answer === props.correctAnswer ? 'correct' : ''}
                ${
                    props.showResult && 
                    answer === props.userAnswer && 
                    answer !== props.correctAnswer 
                    ? 'incorrect' 
                    : ''}
                ${props.showResult && answer !== props.correctAnswer ? 'dimmed' : ''}
            `}
                disabled={props.showResult}
            >
                {he.decode(answer)}
        </button>
    )
})

// Uses update answer function to update user's answer when clicked.
function handleSelect(answer, currentQuestion) {
    props.updateAnswer(answer, currentQuestion)
}
  return (
    <div className='quiz-container'>
        {/* he.decode -- decode html entities. */}
        <h2 className='test-question'>{he.decode(props.question)}</h2>
          <div className="col">
            {answerElements}
        </div>
    </div>
  )
}

export default QuizCard;
