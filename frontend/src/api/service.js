const API_URL = 'http://localhost:5000/api';
import axios from 'axios';

export const codeReviewService = {
  async sendCodeForReview(code) {
    try {
      const response = await axios.post(`${API_URL}/code-review`, { code }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        throw new Error(errorData.error || 'Ошибка при отправке кода на проверку');
      }
      
      console.error('API Error:', error);
      throw error;
    }
  }
};