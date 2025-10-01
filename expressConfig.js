var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());
    app.use(cors());

    // Set CSP for development
    app.use((req, res, next) => {
        res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; img-src * data:; connect-src *");
        next();
    });

    // Serve static files from the built Angular app
    app.use(express.static(__dirname + '/dist/event-planner'));
};