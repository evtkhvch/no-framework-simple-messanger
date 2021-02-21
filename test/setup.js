const { JSDOM } = require('jsdom');
const path = require('path');
const Handlebars = require('handlebars');
const fs = require('fs');

const html = fs.readFileSync(path.join(__dirname, '../dist/src/index.html')).toString();
const { document } = (new JSDOM(html)).window;

global.document = document;
global.window = document.defaultView;
global.window.Handlebars = Handlebars;
global.navigator = global.window.navigator;
