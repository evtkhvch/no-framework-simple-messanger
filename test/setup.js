const { JSDOM } = require('jsdom');
const path = require('path');
const fs = require('fs');

const html = fs.readFileSync(path.join(__dirname, '../src/index.html')).toString();
const { document } = new JSDOM(html).window;

global.document = document;
global.window = document.defaultView;
global.navigator = global.window.navigator;
