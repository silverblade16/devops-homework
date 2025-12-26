import React, { useState } from 'react';
import Header from '../components/common/Header';
import CodeEditor from '../components/common/CodeEditor';
import ReviewResults from '../components/results/ReviewResults.jsx';
import { codeReviewService } from '../api/service.js';

const OverviewPage = () => {
  const [code, setCode] = useState('');
  const [reviewResponse, setReviewResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Пожалуйста, введите код для анализа');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setReviewResponse(null);

    try {
      const response = await codeReviewService.sendCodeForReview(code);
      setReviewResponse(JSON.stringify(response));
    } catch (err) {
      setError(err.message || 'Произошла ошибка при анализе кода');
    } finally {
      setIsLoading(false);
    }
  };

  const parseReviewResponse = (response) => {
    try {
      const parsedData = JSON.parse(response);
      return {
        issues: parsedData.issues,
        rawResponse: parsedData.content,
      };
    } catch (e) {
      console.error("Failed to parse response:", e);
      return {
        score: 0,
        issues: [{ type: "error", message: "Ошибка анализа ответа сервера" }],
        rawResponse: response
      };
    }
  };

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-900 text-gray-100'>
      <Header title="Code Review" />
     
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="mb-8">
          <CodeEditor
            code={code}
            setCode={setCode}
            isLoading={isLoading}
          />
         
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Анализируем...' : 'Отправить на ревью'}
          </button>
         
          {error && (
            <div className="mt-2 text-red-400 text-sm">{error}</div>
          )}
        </form>
        {reviewResponse && (
          <ReviewResults reviewResult={parseReviewResponse(reviewResponse)} />
        )}
      </div>
    </div>
  );
};

export default OverviewPage;