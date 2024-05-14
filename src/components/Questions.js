import qaArray from '../data/qa.json'
import { useState } from 'react'

function shuffle(array) {
  let currentIndex = array.length

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
}

qaArray.forEach((qa) => shuffle(qa.options))

const Questions = ({ finishQuestions, answers, addAnswer }) => {
  const [index, setIndex] = useState(0)

  const qaCurr = qaArray[index]

  const handleAnswerClick = (option) => addAnswer(option)

  const handleNextQuestionClick = () => {
    if (!questionAnswer) return
    setIndex((prev) => prev + 1)
  }

  const questionAnswer = answers?.[index]

  return (
    <div className="max-w-xl rounded overflow-hidden shadow-lg mx-auto mt-6">
      <img className="w-full" src={qaCurr.image} alt="Eyes" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-3">
          What emotion is depicted in the image above?
        </div>
        <div className="flex gap-1 justify-center flex-wrap">
          {qaCurr.options.map((option) => {
            let className =
              'bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-[125px]'
            if (questionAnswer) {
              if (option === qaCurr.correctAnswer) {
                className =
                  'bg-green-700 text-white font-bold py-2 px-4 rounded shadow w-[125px]'
              } else if (questionAnswer === option) {
                className =
                  'bg-red-700 text-white font-bold py-2 px-4 rounded shadow w-[125px]'
              } else {
                className =
                  'opacity-50 bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-[125px]'
              }
            }
            return (
              <button
                className={className}
                disabled={!!questionAnswer}
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            )
          })}
        </div>
        <div className="pt-4 flex justify-end">
          {index + 1 === qaArray.length ? (
            <button
              className="bg-gray-100 text-black-700 font-bold py-2 px-4 rounded-r"
              onClick={finishQuestions}
            >
              Show results
            </button>
          ) : (
            <button
              className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
              disabled={!questionAnswer}
              onClick={handleNextQuestionClick}
            >
              Next question
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Questions
