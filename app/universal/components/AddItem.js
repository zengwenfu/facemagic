import React, { Component, PropTypes } from 'react';

export default class AddItem extends Component {
    render() {
        return (
            <div>
                <input type='text' ref='input'/>
                <button className='button' onClick={(e) => this.handleClick(e)}>
                    增加
                </button>
            </div>
        )
    }

    handleClick(e) {
        const node = this.refs.input;
        const name = node.value.trim();
        this.props.onAddClick(name);
        node.value = '';
    }

    static propTypes = {
        onAddClick: PropTypes.func.isRequired
    }
}

