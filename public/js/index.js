const api = require('./api');
const {TtiForm} = require('./ttiForm');

const INTERVAL_TIME = 60000;
var tti_queue = [];
var myInterval = undefined;

function sendRequestForTTI() {
    try {
        var text = document.getElementById('tti-target-text').value;
        text = text.split('\n').join(' ');
        if (text == '' || text == null) {
            alert('Please enter a text to generate an image.');
            return;
        }
        api.requestTextToImage(text).then((data) => {
            var {uuid, expectedTime} = data;
            console.log(`timeout activates after ${expectedTime} seconds`);
            var ttiForm = new TtiForm(uuid, text, expectedTime);
            tti_queue.push(ttiForm);
            ttiForm.addTimeout();
            
            var img_tag = document.getElementById('tti-image');
            img_tag.src = '/assets/loading.gif';
        }).catch((err) => {
            console.log(err);
            alert('Error occured while sending request for TTI');
        });
    } catch(err) {
        console.log(err);
        alert('Error occured while sending request for TTI');
    }
}

function cleanUpQueue() {
    tti_queue = tti_queue.filter((ttiForm) => {
        return ttiForm.status == 'pending';
    });
}

function init() {
    try {
        var button = document.getElementById('tti-ok');
        button.addEventListener('click', sendRequestForTTI);
    } catch(err) {
        alert('error')
        console.log(err);
    }

    myInterval = setInterval(cleanUpQueue, INTERVAL_TIME);
}

window.onload = init;