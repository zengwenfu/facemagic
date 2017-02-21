/**
 * create by 小虫巨蟹
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Layout from './layout/Layout.js';
import List from '../universal/components/List.js';
import AddItem from '../universal/components/AddItem.js';
import addItem from '../universal/actions/action.js';

class Index extends Component {

    static propTypes = {
        data: PropTypes.object
    }

    render() {
        let { domain, data } = this.props;
        let indexJs = '/index/index.bundle.js';
        let title = '菲麦前端';
        let scriptUrls = [indexJs];
        const { dispatch, list, preloadedState } = this.props;


        return (
            <Layout scriptUrls={scriptUrls} title={title}>
                <AddItem onAddClick={text =>
                    dispatch(addItem(text))
                  } />
                <List list={ list } />
            </Layout>
        )
    }

    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired).isRequired
    }
}


function select(state) {
    return state;
}

export default connect(select)(Index);
