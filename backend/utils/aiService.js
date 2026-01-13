const axios = require('axios');


const FASTAPI_URL = 'https://reviewscheck-webapp-demo.azurewebsites.net/predict';

const analyzeReview = async (text) => {
    try {
        const response = await axios.post(FASTAPI_URL, {
            text: text,
            method: 'bert_only' 
        });

        return response.data;
    } catch (error) {
        console.error(`Erreur AI Service: ${error.message}`.red);
        return null;
    }
};

module.exports = { analyzeReview };