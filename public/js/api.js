const axios = require('axios').default;

// axios.default.baseURL = 'http://34.64.108.168';

async function requestTextToImage() {
    try {
        const res = await axios.post('/tti', {
            text: 'A yo what is going on mate?',
        });
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {requestTextToImage};