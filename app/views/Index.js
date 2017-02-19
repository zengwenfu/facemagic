/**
 * create by 小虫巨蟹
 */

import React, { Component, PropTypes } from 'react';
import Layout from './layout/Layout.js';

class Index extends Component {

    static propTypes = {
        data: PropTypes.object
    }

    render() {
        let { domain, data } = this.props;
        let indexJs = '/index/index.bundle.js';
        let title = '菲麦前端';
        let scriptUrls = [indexJs];
        return (
            <Layout scriptUrls={scriptUrls} title={title}>
                <div id='app'></div>
            </Layout>
        )
    }
}

module.exports = Index;
