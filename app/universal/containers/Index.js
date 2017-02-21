/**
 * create by 小虫巨蟹
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/action.js';
import AddItem from '../components/AddItem.js';
import List from '../components/List.js';

class Index extends Component {

    render() {
       
        const { dispatch, list } = this.props;
        console.log(dispatch);
        return (
            <div id='root'>
                <AddItem onAddClick={name =>
                    dispatch(addItem(name))
                  } />
                <List list={ list } />
            </div>
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
