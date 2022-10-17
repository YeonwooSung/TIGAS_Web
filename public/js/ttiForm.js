const axios = require('axios').default;


class TtiForm {
    constructor(uuid, text, expectedTime) {
        this.uuid = uuid;
        this.text = text;
        this.expectedTime = Number(expectedTime) + 5;
        this.timeout_interval = this.expectedTime * 1000;
        this.status = 'pending';
        this.retry_interval = 10000;
        this.retry_interval_sec = 10;
        this.max_retry = 3;
        this.retry_count = 0;
    }

    async addTimeout() {
        setTimeout(this.timeout_interval)
    }

    async setTimeout(timeout) {
        this.timeout = setTimeout(() => {
            this.sendRequestForResultImage();
        }, timeout);
    }

    sendRequestForResultImage() {
        axios.get(`/tti/result?uuid=${this.uuid}`).then((res) => {
            // var data = res.data;
            this.status = 'done';
            var img = document.getElementById('tti-image');
            img.src = `/tti/image?uuid=${this.uuid}`;
        }).catch((err) => {
            // console.log(err);
            if (this.retry_count < this.max_retry) {
                alert(`Image not generated yet.. Retry after ${this.retry_interval_sec} seconds.`);
                this.retry_count += 1;
                this.setTimeout(this.retry_interval);
                this.retry_interval += 2000;
                this.retry_interval_sec += 2;
            } else {
                this.status = 'failed';
                alert(`Exceeded max retry count. Please try again later.`);
            }
        });
    }
}

module.exports = {TtiForm};