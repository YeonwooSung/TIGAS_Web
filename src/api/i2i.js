const axios = require('axios').default;
const express = require('express');
const fs = require('fs');
var FormData = require('form-data');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('i2i.html');
});

router.post('/', async (req, res) => {
    try {
        var {text, image} = req.body;
        var form = new FormData();
        form.append('text', text);
        form.append('image', image);
        const response = await axios.post('http://34.64.108.168:5000/api/v2/generate/i2i', form, {
            headers: form.getHeaders(),
        });
        var data = response.data;
        var {uuid, expected_time} = data;
        res.json({
            uuid: uuid,
            expectedTime: expected_time,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            error: err,
        });
    }
});

router.get('/img/:uuid', async (req, res) => {
    var {uuid} = req.params;
    try {
        const response = await axios.get(`http://34.64.108.168:5000/api/v2/generate/i2i/${uuid}/img`);
        var data = response.data;
        return res.send(data);
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            error: err,
        });
    }
});

router.get('/result', async (req,res) => {
    var {uuid} = req.query;
    try {
        const response = await axios.get(`http://34.64.108.168:5000/api/v2/generate/i2i/${uuid}/status`);
        // var data = response.data;
        var status = response.status;
        if (status == 200) {
            var f = fs.readFileSync(`/home/ys60/images/${uuid}.png`);
            // var f = fs.readFileSync(path.join(__dirname, '../../assets/result/test.png'));
            fs.writeFileSync(path.join(__dirname, `../../assets/result/${uuid}.png`), f);
            return res.status(200).json({"status": 'done'});
        }

        // if the API server does not return 200, it means the image is not ready yet.
        res.status(400).json({"status": "not ready"});
    } catch(err) {
        console.log(err);
        res.status(400).json({"status": "error"});
    }
});

router.get('/image', async (req, res) => {
    var {uuid} = req.query;
    res.sendFile(path.join(__dirname, `../../assets/result/${uuid}.png`));
});

exports = module.exports = router;