
import codeRules from '../models/codeRules.js';


function checkCodeAgainstRules(code) {
  const issues = [];
  codeRules.forEach(rule => {
      if (rule.test(code)) {
          issues.push({
              type: rule.type,
              message: rule.message
          });
      }
  });
  return issues;
}

const processCodeReview = (req, res) => {
  try {
      const { code } = req.body;
      
      if (!code) {
          return res.status(400).json({ error: 'Code is required' });
      }
      const ruleIssues = checkCodeAgainstRules(code);

      setTimeout(() => {
          let responseContent = '';
          if (ruleIssues.length > 0) {
              responseContent += ruleIssues.map(issue =>`⚠️ ${issue.message}`).join('\n');
          }
          const response = {
                content: responseContent,
                issues: ruleIssues,
          }
          res.json(response);
      }, 500);
      
  } catch (error) {
      console.error('Ошибка при CodeReview', error);
      res.status(500).json({ error: 'Ошибка CodeReview' });
  }
};

export default {
  processCodeReview,
};