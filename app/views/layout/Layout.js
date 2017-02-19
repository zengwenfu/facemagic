/**
 *  @author [小虫巨蟹]
 */
import React, { Component, PropTypes } from 'react';
const VERSION = require('../../../package.json').version;

class Layout extends Component {

  //属性类型声明
  static propTypes = {
    children: PropTypes.object, // 页面内容
    title: PropTypes.string,
    scriptUrls: PropTypes.array
  };

  //遍历js脚本
  renderScripts() {
    const {scriptUrls} = this.props;
    const host = process.host;

    const lib = `${host}/${VERSION}/lib.bundle.js`;
    let items = [<script src= {lib} />];
    scriptUrls.map((url, i)=>{
      url = host + '/' + VERSION + url;
      items.push(<script key={i} src={url} />);
    });

    
    /**
     *  开发环境增加reload监听（后台重启的时候能自动刷新）
     */
    if(process.env.NODE_ENV === 'dev') {
      items.push(<script  src={'/reload/reload.js'} />);
    }

    return items;
  }

  render() {
    const { title, children } = this.props;
    const host = process.host;
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta httpEquiv='Cache-Control' content='no-siteapp' />
          <meta name='renderer' content='webkit' />
          <meta name='keywords' content='菲麦前端' />
          <meta name='description' content='菲麦前端' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>{title}</title>
        </head>
        <body>
          {children}
          {this.renderScripts()}
        </body>
      </html>
    );
  }
};
module.exports = Layout;
