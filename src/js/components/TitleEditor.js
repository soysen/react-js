import React from 'react';
import { Textfield, Icon } from 'react-mdl';

var TitleEditor = React.createClass({
    getInitialState() {
        return {
          name: this.props.data.name
        }
    },
    handleChange(e) {
        console.log("handleChange: "+e.keyCode);
        this.setState({ name: e.target.value });
    },
    saveChange() {
        this.props.saveName(this.state.name);
    },
    keyUp(e) {
        switch(e.keyCode) {
            case 13:
                this.saveChange();
                break;
            case 27:
                this.props.cancelEditor();
                break;
        }
    },
    render() {
        return(
            <div>
                <Textfield
                    onChange={this.handleChange}
                    onKeyUp={this.keyUp}
                    value={this.state.name}
                    ref="treetitle" 
                    label="Folder Name" />
                <a onClick={this.saveChange} className="mdl-color-text--grey-500"><Icon name="check" /></a>
                <a onClick={this.props.cancelEditor} className="mdl-color-text--grey-500"><Icon name="replay" /></a>
            </div>
        );
    }
});

export default TitleEditor;