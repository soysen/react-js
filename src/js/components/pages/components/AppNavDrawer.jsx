import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';
import {
    Drawer, 
    List, ListItem, MakeSelectable, 
    RaisedButton
} from 'material-ui';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {teal500} from 'material-ui/styles/colors';

const SelectableList = MakeSelectable(List);

const styles = {
    logo: {
        cursor: "pointer",
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        background: teal500,
        paddingLeft: spacing.desktopGutter,
        marginBottom: 8
    }
}

const AppNavDrawer = React.createClass({
    propTypes: {
        docked: PropTypes.bool.isRequired,
        location: PropTypes.object.isRequired,
        onChangeList: PropTypes.func.isRequired,
        onRequestChangeNavDrawer: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        style: PropTypes.object
    },
    handleTouchTapHeader() {
        this.context.router.push('/');
        this.props.onRequestChangeNavDrawer(false);
    },
    render() {
        const {
            location,
            docked,
            onRequestChangeNavDrawer,
            onChangeList,
            open,
            style
        } = this.props;

        return(
            <Drawer style={style} docked={docked} open={open} onRequestChange={onRequestChangeNavDrawer}>
                <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
                    React 日常練習
                </div>
                <SelectableList value={location.pathname} onChange={onChangeList}>
                    <ListItem primaryText="Home" value="home" href="home" />
                    <ListItem primaryText="開發過程" value="process" href="process" />
                    <ListItem primaryText="結語" value="epilogue" href="epilogue" />
                </SelectableList>
            </Drawer>
        );
    }
});

export default AppNavDrawer;