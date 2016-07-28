import React from 'react';
import ReactDom from 'react-dom';
import { Divider } from 'material-ui';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {grey200, grey700} from 'material-ui/styles/colors';


const Process = React.createClass({
  getStyles() {
    const styles = {
      p: {
        margin: "20px auto"
      },
      pre: {
        background: grey200,
        color: grey700,
        padding: "20px"
      }
    }
    return styles;
  },
  render() {
    
    let styles = this.getStyles();

    return (
      <div>
        <h2>開發過程</h2>
        <Divider/>
        {this.props.children || 
          <article>
            <h5>react-router</h5>
            <p style={styles.p}>
              主要根據 react-router 的說明文件建立 route 與 path，<br/>
              一開始是使用 history/lib/createBrowserHistory ，但因為 history 跟 react-router 似乎有版本衝突，於是使用 react-router 自己的 history 機制。<br/>
              但是在使用 browserHistory 時一直卡在路徑不對，只好暫時改用 hashHistory。希望未來用 react 開發時，能夠順暢使用 browserHistory。
            </p>
            <h5>react-title-component</h5>
            <p style={styles.p}>
              可以根據 path 不同更換不同的 html title，頗方便的。
            </p>
            <h5>material-ui</h5>
            <p style={styles.p}>
              使用 material-ui，發現樣式都寫在 style 上。跟一般套件的處理方式很不一樣，只好參照 github 上的原始碼參考作法。<br/>
               github 上的原始碼一整個博大精深，於是只能學著複製貼上再修修改改。
            </p>
            <p style={styles.p}>
              material-ui 已經準備好大部分需要用到的 component，套用後會出現基本的樣式。<br/>
              要客製化樣式，必須個別匯入 space、typograph、color、zIndex、getMuiTheme...等元件，並準備一支 getStyles() 函式，在 render 時套用。
            </p>
            <p>
              為了能夠 RWD，在需要處理 RWD 的組件中，需要匯入寬度偵測的組件。
            </p>
            <pre style={styles.pre}><code>Import width, &#123; MEDIUM, LARGE &#125; from ”material-ui/utils/withWidth“</code></pre>
            <p>並在需要處理 RWD 的 component 中帶入，如下所示</p>
            <pre style={styles.pre}><code>export default withWidth()(AppNavDrawer);</code></pre>
            <p>
              然後在 render 的當下去偵測螢幕寬度改寫 style。
            </p>
            <pre style={styles.pre}><code>
              if( this.props.width====LARGE ) &#123; styles.bar.paddingLeft = ”256px“; &#125; 
            </code></pre>
            <p>
              在抄抄改改的過程中，學習到更嚴謹的設定如 propTypes、contextTypes、childContextTypes 與 state 這些參數，然後在 render 的時候使用，以減少許多重複的工作。如：
            </p>
            <pre style={styles.pre}><code>
              propTypes: &#123; <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;docked: PropTypes.bool.isRequired,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;location: PropTypes.object.isRequired,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;onChangeList: PropTypes.func.isRequired,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;open: PropTypes.bool.isRequired,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;style: PropTypes.object<br/>
              &#125;,
              <br/>
              render() &#123;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;const &#123;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;docked, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;location, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onChangeList, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;open, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;style,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&#125; = this.props;<br/>
              &#125;
            </code></pre>
            <p>
              目前 this.props 和 this.context 的時機還沒有很清楚，以及許多設定還要花更多時間看文件才能理解。<br/>
              另外使用 material-ui，css 的設定也轉到 react 中處理，感覺不太適合一般客製化專案開發。使用需要仔細斟酌。
            </p>
          </article>
        }
      </div>
    )
  }
});

export default Process;