const codeRules = [
  {
    type: 'warning',
    message: 'Используйте const/let вместо var',
    test: (code) => code.includes('var ') && !code.includes('// eslint-disable-next-line no-var')
  },
  {
    type: 'warning',
    message: 'Не используйте console.log в production',
    test: (code) => code.includes('console.log(') && !code.includes('// eslint-disable-next-line no-console')
  },
  {
    type: 'warning',
    message: 'Не используйте eval() из-за проблем безопасности',
    test: (code) => code.includes('eval(') && !code.includes('// eslint-disable-next-line no-eval')
  },
  {
    type: 'warning',
    message: 'Используйте template literals вместо конкатенации строк',
    test: (code) => /['"]\s*\+\s*[^"']*\s*\+\s*['"]/.test(code) && !code.includes('// eslint-disable-next-line prefer-template')
  },
  {
    type: 'error',
    message: 'Используйте === вместо == для строгого сравнения',
    test: (code) => /(?:[^\w\s=!<>]=|^=)(?!=)/.test(code) && 
           !code.includes('// eslint-disable-next-line eqeqeq')
  },
  {
    type: 'warning',
    message: 'Не оставляйте неиспользуемые переменные',
    test: (code) => {
      const varDeclarations = code.match(/const|let|var\s+(\w+)/g) || [];
      const vars = varDeclarations.map(d => d.replace(/(const|let|var)\s+/, ''));
      return vars.some(v => (code.split(v).length === 2) && !code.includes('// eslint-disable-next-line no-unused-vars'));
    }
  },
  {
    type: 'warning',
    message: 'Используйте Promise.all() при работе с несколькими промисами',
    test: (code) => {
      const hasMultipleAwaits = (code.match(/await\s+/g) || []).length > 1;
      return hasMultipleAwaits && !code.includes('Promise.all') && !code.includes('// eslint-disable-next-line no-await-in-loop');
    }
  },
  {
    type: 'warning',
    message: 'Используйте try/catch при работе с async/await',
    test: (code) => code.includes('async') && code.includes('await') && !code.includes('try {') && !code.includes('// eslint-disable-next-line no-try-catch')
  },
  {
    type: 'warning',
    message: 'Используйте optional chaining (?.) для безопасного доступа к свойствам',
    test: (code) => {
      const hasNestedProps = /\w+\.\w+\.\w+/.test(code);
      const hasNullCheck = /\w+\s*(&&|\?\.)\s*\w+/.test(code);
      return hasNestedProps && !hasNullCheck && !code.includes('// eslint-disable-next-line optional-chaining');
    }
  },
  {
    type: 'warning',
    message: 'Используйте spread оператор (...) вместо Object.assign',
    test: (code) => code.includes('Object.assign') && !code.includes('// eslint-disable-next-line prefer-object-spread')
  },
  {
    type: 'error',
    message: 'Не используйте arguments, применяйте rest параметры (...args)',
    test: (code) => code.includes('arguments') && !code.includes('...') && !code.includes('// eslint-disable-next-line prefer-rest-params')
  },
  {
    type: 'warning',
    message: 'Используйте async/await вместо цепочек .then()',
    test: (code) => code.includes('.then(') && !code.includes('async') && !code.includes('// eslint-disable-next-line no-promise-executor-return')
  }
];

export default codeRules;