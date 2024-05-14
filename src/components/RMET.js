import Questions from './Questions'
import { useState } from 'react'
import Results from './Results'

function RMET() {
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState([])
  const finishQuestions = () => setShowResults(true)
  const addAnswer = (answer) => setAnswers((prev) => [...prev, answer])

  return (
    <div>
      <header className="bg-sky-900 text-white text-xl border-gray-900 px-4 lg:px-6 py-5 dark:bg-gray-800">
        <h1>Reading the Mind in the Eyes Test, RMET</h1>
      </header>
      {showResults ? (
        <Results answers={answers} />
      ) : (
        <Questions
          finishQuestions={finishQuestions}
          answers={answers}
          addAnswer={addAnswer}
        />
      )}
    </div>
  )
}

export default RMET
