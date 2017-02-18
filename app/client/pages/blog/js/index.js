import React, { Component } from 'react';
import '../css/index.scss';
import { render } from 'react-dom';

// if(module.hot) {
//     module.hot.accept();
// }

class Index extends Component {
    render() {
        return (
            <div className="container">hello 123</div>
        );
    }
}

render((<Index></Index>), document.getElementById('app'));