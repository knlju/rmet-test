import React, {useEffect, useState} from 'react';
import quizData from '../data/qa.json';
import './Quiz.css';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizData.length).fill(null));

  useEffect(() => {
    const options = shuffleArray([
      ...quizData[currentQuestion].options,
      quizData[currentQuestion].correct_answer
    ]);
    setShuffledOptions(options);
  }, [currentQuestion]);

  const handleAnswerOptionClick = (option) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestion] = option;
    setSelectedAnswers(updatedSelectedAnswers);

    if (option === quizData[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  return (
    <div className='quiz-container'>
      {showScore ? (
        <div>
          <div className='score-section'>
            You scored {score} out of {quizData.length}
          </div>
          <div>
            <h3>Understanding Your Score</h3>
            <p>The average score for this test is in the range of 22 to 30 correct responses. If you scored above 30,
              you may be quite good at understanding someone's mental state based on facial cues. If you scored below
              22, you may find it difficult to understand a person's mental state based on their facial
              expressions.</p>
          </div>
        </div>
      ) : (
        <div className='question-section'>
          <div className='question-count'>
            <span>Question {currentQuestion + 1}</span>/{quizData.length}
          </div>
          <div className='question-text'>What emotion is depicted in the image below?</div>
          <img src={quizData[currentQuestion].image} alt="emotion" className="question-image"/>
          <div className='answer-section'>
            {shuffledOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                className={
                  selectedAnswers[currentQuestion] === option
                    ? option === quizData[currentQuestion].correct_answer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }
                disabled={selectedAnswers[currentQuestion] !== null}
              >
                {option}
              </button>
            ))}
          </div>
          <div className='navigation-buttons'>
            <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button onClick={handleNextQuestion} disabled={selectedAnswers[currentQuestion] === null}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
