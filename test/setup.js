let jsdom = require('jsdom');
let Handlebars = require('handlebars');
let { JSDOM } = jsdom;

let { document } = (new JSDOM(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Index</title>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/styles/index.css">
    </head>
    <body>
        <div class="app"></div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.min.js"></script>
            <script type="module" src="/index.js"></script>
        </body>
    </html>
`)).window;

global.document = document;
global.window = document.defaultView;
global.window.Handlebars = Handlebars;
global.navigator = global.window.navigator;
