const axios = require('axios').default;


class TtiForm {
    constructor(uuid, text, expectedTime) {
        this.uuid = uuid;
        this.text = text;
        this.expectedTime = Number(expectedTime) + 10;
        this.timeout_interval = this.expectedTime * 1000;
        this.status = 'pending';
    }

    async addTimeout() {
        this.timeout = setTimeout(() => {
            this.sendRequestForResultImage();
        }, this.timeout_interval);
    }

    sendRequestForResultImage() {
        axios.get(`/tti/result?uuid=${this.uuid}`).then((res) => {
            // var data = res.data;
            this.status = 'done';
            var img = document.getElementById('tti-image');
            img.src = `/tti/image?uuid=${this.uuid}`;
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = {TtiForm};