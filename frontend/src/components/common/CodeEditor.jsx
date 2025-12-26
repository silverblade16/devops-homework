import React from 'react';

const CodeEditor = ({ code, setCode, isLoading }) => {
  return (
    <div className="mb-4">
      <label htmlFor="code" className="block text-sm font-medium mb-2">
        Вставьте ваш код:
      </label>
      <textarea
        id="code"
        rows={12}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="// Вставьте ваш код здесь..."
        disabled={isLoading}
      />
    </div>
  );
};

export default CodeEditor;