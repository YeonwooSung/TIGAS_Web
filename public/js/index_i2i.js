const api = require('./api');
const {I2iForm} = require('./i2iForm');


const INTERVAL_TIME = 60000;
var i2i_queue = [];
var myInterval = undefined;


function sendRequestForI2I() {
    try {
        const prompt = document.getElementById('i2i-target-text').value;
        let selectedFile = document.getElementById('i2i-user-image').files;

        if (prompt == '' || prompt == null) {
            alert('Please enter a text to generate an image.');
            return;
        }
        if (selectedFile == null || selectedFile.length == 0) {
            alert('Please select an image to generate a text.');
            return;
        }
        selectedFile = selectedFile[0];

        // send request to server (Multipart/form-data {text, image})
        api.requestImageToImage(prompt, selectedFile).then((data) => {
            var {uuid, expected_time} = data;
            console.log(`timeout activates after ${expected_time} seconds`);
            var i2iForm = new I2iForm(uuid, prompt, expected_time);
            i2i_queue.push(i2iForm);
            i2iForm.addTimeout();
            
            var img_tag = document.getElementById('i2i-image');
            img_tag.src = '/assets/loading.gif';
        }).catch((err) => {
            console.log(err);
            alert('Error occured while sending request for I2I');
        });
    } catch(err) {
        console.log(err);
    }
}

function cleanUpQueue() {
    i2i_queue = i2i_queue.filter((i2iForm) => {
        return i2iForm.status == 'pending';
    });
}

function init() {
    try {
        var button = document.getElementById('i2i-ok');
        button.addEventListener('click', sendRequestForI2I);
    } catch(err) {
        alert('error')
        console.log(err);
    }

    myInterval = setInterval(cleanUpQueue, INTERVAL_TIME);
}

window.onload = init;
