import React, { Component } from 'react';
import './css/index.scss';
import { render } from 'react-dom';
import Index from '../../../universal/containers/Index.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import itemApp from '../../../universal/reducers/reducers.js';

// 通过服务端注入的全局变量得到初始 state
const preloadedState = window.initState;

// 使用初始 state 创建 Redux store
const store = createStore(itemApp, preloadedState)

render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
)
