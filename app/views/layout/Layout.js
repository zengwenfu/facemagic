/**
 *  @author [小虫巨蟹]
 */
import React, { Component, PropTypes } from 'react';

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
    let items = [];
    scriptUrls.map((url, i)=>{
      items.push(<script key={i} src={url} />);
    });
    return items;
  }

  render() {
    const { title, children } = this.props;
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
          <script type="text/javascript" src="lib.bundle.js"></script>
          {this.renderScripts()}
        </body>
      </html>
    );
  }
};
module.exports = Layout;
