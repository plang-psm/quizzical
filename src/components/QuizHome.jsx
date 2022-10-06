import React from 'react';
import '../index.css';
import blob1 from '../images/blob1.png';
import blob2 from '../images/blob2.png';



function QuizHome(props) {


  return (
    <div>
      <img className='top-home-blob' src={blob2} alt='blob' />
      <div className='home-container'>
        <h2 className='home-title'>Quizzical</h2>
          <p className='home-description'>Test your sports knowledge!</p>
          <button className='accessary-btn' onClick={props.setShowQuestions}>Start</button>
          {/* start-btn button */}
      </div>
      <img className='bottom-home-blob' src={blob1} alt='blob' />
    </div>
  );
}

export default QuizHome;
