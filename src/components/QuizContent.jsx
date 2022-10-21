import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import QuizCard from './QuizCard';
import blob1 from '../images/blob1.png'
import blob2 from '../images/blob2.png'

function QuizContent() {
  const [newQuiz, setNewQuiz] = useState([]);
  const [warning, setWarning] = useState();
  const [showResult, setShowResult] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);


// Fetch the data from opentb API.
useEffect(() => {
    async function getQuiz() {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple'
      );
      const data = await res.json();
      // Set data and format data to our object.
        setNewQuiz(data.results.map((quiz) => {
            return {
                id: nanoid(),
                question: quiz.question,
                shuffledAnswers: shuffle([...quiz.incorrect_answers, quiz.correct_answer]),
                correctAnswer: quiz.correct_answer,
                userAnswer: ''
            }
        }))
    }
    if(newQuiz.length === 0) {
        getQuiz();
    }
  },[newQuiz]);

// Renders the quiz.
  const quizElements = newQuiz.map((quiz, index) => {
    return (
      <QuizCard
        key={index}
        question={quiz.question}
        shuffledAnswers={quiz.shuffledAnswers}
        userAnswer={quiz.userAnswer}
        correctAnswer={quiz.correctAnswer}
        showResult={showResult}
        updateAnswer={updateAnswer}
      />
    )
  })

// Function that shuffles all the answers.
  function shuffle(answers) {
    let i = answers.length;
      while(--i > 0) {
        // Sets j to a random number index (j) which will then be swapped with the current index (i).
        let j = Math.floor(Math.random() * (i+1));
        // Stores the temproaray random number index (j).
        let temp = answers[j];
        // Sets the random index (j) number to the current index (i) number.
        answers[j] = answers[i];
        // Sets the current index (i) number to random index (j) number.
        answers[i] = temp;
      }
      return answers;
  }

// Updates the users answer
function updateAnswer(answer, currentQuestion) {
    setNewQuiz(newQuiz.map((quiz) => {
        return quiz.question === currentQuestion ? {...quiz, userAnswer: answer} : quiz;
    }))
}

// Checks for missing answers and checks the answers.
function checkAnswers() {
    const missingAnswers = newQuiz.some((quiz) => quiz.userAnswer === '');
    setWarning(missingAnswers);

    if (!missingAnswers) {
        newQuiz.forEach((quiz) => {
            if(quiz.userAnswer === quiz.correctAnswer) {
                setNumCorrect((prevCorrect) => prevCorrect + 1)
            }
        })
        setShowResult(true)
    }
}

// Resets the game when play again is clicked.
function playAgain() {
    setNewQuiz([])
    setShowResult(false);
    setNumCorrect(0);
}

  return (
        <div className='test-page'>
      <img className='top-test-blob' src={blob2} alt='blob' />
      <div className='test-container'>
      <div className='content-container'>
        {quizElements}
      <br />
    </div>
      </div>
      <img className='bottom-test-blob' src={blob1} alt='blob' />

{/* Displays a warning message, check answers button or the results of the quiz + play again. */}
    {warning && (
            <p className='warning'>You missed some questions.</p>
        )}

    {newQuiz.length > 0 && !showResult ? (
            <div className="check-answer-btn">
                <button className='accessary-btn' onClick={checkAnswers} >Check answers</button>
            </div>
        ) : null
        }

    {showResult && (
        <div className="result-container">
            <p>You scored {numCorrect} / {newQuiz.length} correct answers</p>
            <button className='accessary-btn' onClick={playAgain} >Play Again</button>
        </div>
    )
    }


    </div>
  );
}

export default QuizContent;


