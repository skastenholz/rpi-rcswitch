var express = require('express');
var app = express();
var execFile = require('child_process').execFile;
var sleep = require('sleep');

app.put('/:groupAddress/:deviceAddress', function(req, res) {
    console.log("Switch ", req.params.groupAddress + " " + req.params.deviceAddress + " on.");
    for (var i = 0; i < 3; i++) {
        send(req.params.groupAddress, req.params.deviceAddress, '1');
        sleep.msleep(300);
    }
    res.status(200).send();
});

app.delete('/:groupAddress/:deviceAddress', function(req, res) {
    console.log("Switch ", req.params.groupAddress + " " + req.params.deviceAddress + " off.");
    for (var i = 0; i < 3; i++) {
        send(req.params.groupAddress, req.params.deviceAddress, '0');
        sleep.msleep(300);
    }
    res.status(200).send();
});

function send(groupAddress, deviceAddress, code) {
    execFile('/opt/rc-switch/rcswitch-pi/send', [groupAddress, deviceAddress, code], function(error, stdout, stderr) {
        if (error) {
            throw error;
        }
        console.log(stdout);
    });
}

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("RC-switch app listening at http://%s:%s", host, port);
});
