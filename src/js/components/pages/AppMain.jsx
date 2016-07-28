import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import Title, { flushTitle } from 'react-title-component';
import { Link } from 'react-router';
import { AppBar, IconButton } from 'material-ui';
import {spacing, typography, zIndex} from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppNavDrawer from '../pages/components/AppNavDrawer.jsx';
import FullWidthSection from '../pages/components/FullWidthSection.jsx';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import {teal500, grey700, lightWhite} from 'material-ui/styles/colors';

const AppMain = React.createClass({
  propTypes: {
    width: PropTypes.number.isRequired,
    children: PropTypes.node,
    location: PropTypes.object
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  
  childContextTypes: {
    muiTheme: PropTypes.object,
  }, 

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme(),
    });
  },

  getInitialState() {
      return {
          NavDrawerOpen: false 
      };
  },

  getStyles() {
    const styles = {
      container: {
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column"
      },
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        fontWeight: typography.fontWeightLight,
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
        background: teal500
      },
      drawer: {

      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        flex: '1',
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
      },
      footer: {
        backgroundColor: grey700,
        color: typography.textFullGrey,
        textAlign: 'center',
      }
    }

    return styles;
  },

  handleToggle() {
    this.setState({
      NavDrawerOpen: !this.state.NavDrawerOpen,
    });
  },
  
  handleChangeList(event, value) {
    this.context.router.push(value);
    this.setState({
      NavDrawerOpen: false,
    });
  }, 

  handleChangeRequestNavDrawer(open) {
    this.setState({
      NavDrawerOpen: open,
    });
  },

  render() {
    let {
      location,
      children
    } = this.props;
    
    const {
      prepareStyles,
    } = this.state.muiTheme;

    const router = this.context.router;
    const styles = this.getStyles();
    const title =
      router.isActive('/about') ? '關於這次練習' :
      router.isActive('/process') ? '開發過程' :
      router.isActive('/epilogue') ? '心得' :'';

    let docked = false;
    let showMenuIconButton = true;
    let {
      NavDrawerOpen
    } = this.state;

    if (this.props.width === LARGE) {
      docked = true;
      NavDrawerOpen = true;
      showMenuIconButton = false;

      styles.drawer = {
        zIndex: styles.appBar.zIndex + 1,
      };
      styles.appBar.paddingLeft = 280;
      styles.footer.paddingLeft = 280;
      styles.root.paddingLeft = 256;
    }

    return (
      <div style={styles.container}>
        
        <Title render={title!='' ? title + "｜Router｜ReactJS 日常練習" : "Router｜ReactJS 日常練習"} />
        
        <AppBar title="react-router & Material UI" 
         style={styles.appBar}
         showMenuIconButton={showMenuIconButton}
         onLeftIconButtonTouchTap={this.handleToggle}
         iconElementRight={
          <IconButton iconClassName="muidocs-icon-custom-github" href="https://github.com/callemall/material-ui" />
         }
        />
        
        <div style={prepareStyles(styles.root)}>
          <div style={prepareStyles(styles.content)}>
            {children}
          </div>
        </div>

        <FullWidthSection style={styles.footer}>
          <p style={prepareStyles(styles.p)}>
            參考 <a href="https://github.com/callemall/material-ui" target="_blank">Material UI</a>. 
            <br/>
            powered by Nelson.
          </p>
        </FullWidthSection>

        <AppNavDrawer 
         style={styles.drawer}
         open={NavDrawerOpen}
         docked={docked} 
         location={location}
         onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
         onChangeList={this.handleChangeList} />

      </div>
    )
  }
})

export default withWidth()(AppMain);