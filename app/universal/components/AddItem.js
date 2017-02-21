import React, { Component, PropTypes } from 'react';

export default class AddItem extends Component {
    render() {
        return (
            <div>
                <input type='text' ref='input'/>
                <button onClick={(e) => this.handleClick(e)}>
                    增加
                </button>
            </div>
        )
    }

    handleClick(e) {
        const node = this.refs.input;
        const name = node.value.trim();
        this.props.onAddClick(text);
        node.value = '';
    }

    static propTypes = {
        onAddClick: PropTypes.func.isRequired
    }
}

