const calculateScore = (data) => {
  let score = 100
  if (data.issues.length === 0) {
    score = 100
  } else if (data.issues.length <=3 ) {
    score = 80
  } else {
    score = 70
  }
  return score
}

const ReviewResults = ({ reviewResult }) => {
  let score = calculateScore(reviewResult);
  if (!reviewResult) return null;
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Результаты Code Review</h2>
      
      {reviewResult.score !== null && (
        <div className="mb-4">
          <span className="font-medium">Оценка кода:</span>{' '}
          <span className={`font-bold ${
            score > 80 ? 'text-green-400' : 
            score > 70 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {score}/100
          </span>
        </div>
      )}
      
      <div>
        <h3 className="font-medium mb-2">Рекоммендации: {reviewResult.issues.length < 1?'Все хорошо!':''}</h3>
        <ul className="space-y-2">
          {reviewResult.issues.map((issue, index) => (
            <li 
              key={index} 
              className={`p-2 rounded ${
                issue.type === 'error' ? 'bg-red-900/50' :
                issue.type === 'warning' ? 'bg-yellow-900/50' : 'bg-green-900/50'
              }`}
            >
              {issue.line && <span className="text-gray-400">Строка {issue.line}: </span>}
              {issue.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewResults;