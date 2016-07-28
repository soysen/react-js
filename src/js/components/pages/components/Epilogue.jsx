import React from 'react';
import ReactDom from 'react-dom';
import { Divider } from 'material-ui';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {orange500} from 'material-ui/styles/colors';


const Epilogue = React.createClass({
  getStyles() {
    const styles = {
      p: {
        margin: "20px auto"
      }, 
      title: {
        color: orange500,
        textAlign: "center"
      }
    }
    return styles;
  },
  render() {
    
    let styles = this.getStyles();

    return (
      <div>
        <h2>心得</h2>
        <Divider/>
        {this.props.children || 
            <article>
                <h3 style={styles.title}>
                    越級打怪很累，我不想再做第二次了<br/>_(┐「ε:)_
                </h3>
            </article>
        }
      </div>
    )
  }
});

export default Epilogue;