import React, { Component } from 'react';
import './css/index.scss';
import { render } from 'react-dom';

class Index extends Component {
    render() {
        return (
            <div className="container">hello</div>
        );
    }
}

render((<Index></Index>), document.getElementById('app'));