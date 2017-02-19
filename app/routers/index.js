/**
 *  create by 小虫巨蟹
 */
'use strict';
import express from 'express';
const router = express.Router();
import { renderToString } from 'react-dom/server';
import React from 'react';
import Index from '../views/Index.js';

//首页
router.get('/', function(req, res, next) {
    const html = renderToString(<Index/>);
    res.send(html);
});

module.exports = router;