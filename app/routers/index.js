/**
 *  create by 小虫巨蟹
 */
'use strict';
import express from 'express';
const router = express.Router();
import { renderToString } from 'react-dom/server';
import React from 'react';
import Index from '../views/Index.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import itemApp from '../universal/reducers/reducers.js';

//首页
router.get('/', function(req, res, next) {
    // 创建新的 Redux store 实例
    const store = createStore(itemApp);
    

    let html = renderToString(
        <Provider store={store}>
          <Index />
        </Provider>
    );

    // 从 store 中获得初始 state
    const preloadedState = JSON.stringify(store.getState());

    // 替换占位符
    html = html.replace('###initState###', `<script>window.initState=${preloadedState}</script>`);

    res.send(html);
});

module.exports = router;