const ReactDOMServer = require('react-dom/server');
import React, { Component, PropTypes } from 'react';
import Index from './Index.js';

// class Index extends Component {
//     render() {
//         return ( <div id='app'></div> );
//     }
// }

module.exports = function() {
    var domain = 'http://localhost:5000'
    const html = ReactDOMServer.renderToString(<Index domain={domain}/>);
    return html;
}