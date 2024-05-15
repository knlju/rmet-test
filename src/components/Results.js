import qaArray from '../data/qa.json'

const calculateScore = (answers) =>
  qaArray.reduce(
    (accumulator, currentValue, index) =>
      currentValue.correctAnswer === answers[index]
        ? accumulator + 1
        : accumulator,
    0
  )

const Results = ({ answers }) => {
  const score = calculateScore(answers)
  return (
    <div className="max-w-sm w-full lg:flex mx-auto mt-6">
      <div className="p-10 border border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
          You scored {score} out of {qaArray.length}
        </h2>
        <div className="text-gray-900 font-bold text-xl mb-2">
          Understanding Your Score
        </div>
        <p className="text-gray-700 text-base">
          The average score for this test is in the range of 22 to 30 correct
          responses. If you scored above 30, you may be quite good at
          understanding someone's mental state based on facial cues. If you
          scored below 22, you may find it difficult to understand a person's
          mental state based on their facial expressions.
        </p>
      </div>
    </div>
  )
}

export default Results
