const axios = require('axios').default;
const FormData = require('form-data');

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

async function requestImageToImage(prompt, imgFile) {
    const form = new FormData();
    form.append('text', prompt);
    form.append('image', imgFile);
    const res = await axios.post('http://34.64.108.168:5000/api/v2/generate/i2i', form, {
        headers: form.getHeaders ? form.getHeaders() : { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
}


module.exports = {requestTextToImage, requestImageToImage};