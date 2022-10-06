import './index.css';
import { useState } from 'react';
import QuizHome from './components/QuizHome';
import QuizContent from './components/QuizContent';

function App() {
  const [showQuestions, setShowQuestions] = useState(false)

  return (
    <div>
      {showQuestions ? <QuizContent /> : <QuizHome setShowQuestions={setShowQuestions} />}
    </div>

  );
}

export default App;
