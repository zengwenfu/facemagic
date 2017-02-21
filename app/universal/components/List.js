import React, { Component, PropTypes } from 'react';

export default class List extends Component {
    /**
     *  渲染列表
     */
    render() {
        return (
            <ul>
               {this.props.list.map((item, index) =>
                   <li>{item.name}</li>
                )}
            </ul>
        );
    }

    /**
     *  参数定义
     */
    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired).isRequired
    }
}