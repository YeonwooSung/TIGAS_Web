const api = require('./api');


function sendRequest() {
    api.requestTextToImage().then((data) => {
        var {uuid, expectedTime, queue, status} = data;
        //TODO
    });
}

function init() {
    try {
        var button = document.getElementById('tti-ok');
        button.addEventListener('click', sendRequest);
    } catch(err) {
        alert('error')
        console.log(err);
    }
}

window.onload = init;