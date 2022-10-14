const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const response = await axios.post('http://34.64.108.168:5000/api/v1/generate/tti', {
            text: req.body.text,
        });
        var data = response.data;
        var {uuid, prompt, queue, status} = data;
        res.json({
            uuid: uuid,
            expectedTime: prompt,
            queue: queue,
            status: status,
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({
            error: err,
        });
    }
});

exports = module.exports = router;