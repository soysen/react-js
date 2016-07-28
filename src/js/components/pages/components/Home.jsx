import React from 'react';
import ReactDom from 'react-dom';
import {Divider} from 'material-ui';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';

const Home = React.createClass({
  getStyles() {
    const styles = {
      p: {
        margin: "20px auto"
      }
    }
    return styles;
  },
  render() {
    
    let styles = this.getStyles();

    return (
      <div>
        <h2>
          <small>React日常練習</small>
          使用 react-router + material-ui
        </h2>
        <Divider/>
        {this.props.children || 
          <article>
            <h5>使用工具</h5>
            <dl>
              <dt>react-router</dt>
              <dd>
                  <a href="https://react-guide.github.io/react-router-cn/" target="_blank">說明文件</a> ｜ 
                  <a href="https://github.com/reactjs/react-router" target="_blank">Guthub</a>
              </dd>
              <dt>material-ui</dt>
              <dd>
                <a href="http://www.material-ui.com" target="_blank">說明文件</a> ｜ 
                <a href="https://github.com/callemall/material-ui/" target="_blank">Guthub</a>
              </dd>
              <dt>react-title-component</dt>
              <dd>
                <a href="https://www.npmjs.com/package/react-title-component" target="_blank">Guthub</a>
              </dd>
            </dl>
          </article>
        }
      </div>
    )
  }
});

export default Home;