const axios = require('axios').default;

// axios.default.baseURL = 'http://34.64.108.168';

async function requestTextToImage(prompt) {
    try {
        const res = await axios.post('/tti', {
            text: prompt,
        });
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {requestTextToImage};