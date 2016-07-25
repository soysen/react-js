import React from 'react';
import ReactDOM from 'react-dom';
import { ReactTransitionGroup, ReactCSSTransitionGroup } from 'react-tools';
import { Textfield, Cell, Button, 
        Icon, IconButton, IconToggle, 
        Menu, MenuItem, 
        List, ListItem, ListItemContent, ListItemAction } from 'react-mdl';

var Todo = React.createClass({
    displayName: 'Todo',
    getInitialState() {
        return {
            edit_mode: this.props.edit_mode,
            item: this.props.item
        };
    },
    toggleCheck() {
        let item = this.state.item;
        item.done = !item.done;
        this.setState({ item: item });
        this.props.updateTodoItem(item, this.props.index);
    },
    remove() {
        this.props.removeItem(this.props.index);
    },
    shouldComponentUpdate: function(nextProps){
        return nextProps.item.todo !== event.target.innerHTML;
    },
    handleChange(e) {
        let html = e.target.innerHTML;
        let item = this.state.item;
        item.todo = html;
        this.setState({ item: item });
        this.props.updateTodoItem(this.state.item, this.props.index);
    },
    render() {
        let Check = {
            name: "radio_button_unchecked",
            className: "mdl-icon",
            textClass: ""
        };

        if(this.state.item.done) {
            Check = {
                name: "check_circle",
                className: "mdl-icon mdl-color-text--teal-400",
                textClass: "done"
            }
        }

        return (
            <ListItem twoLine>  
                <ListItemContent>
                    <Icon name={Check.name} className={Check.className} onClick={this.toggleCheck} />
                    <div onInput={this.handleChange} className={Check.textClass} 
                    onBlur={this.handleChange} 
                    contentEditable 
                    dangerouslySetInnerHTML={{__html: this.state.item.todo}}></div>
                </ListItemContent>
                <ListItemAction>
                    <a onClick={this.remove} className="mdl-color-text--grey-400"><Icon name="clear" /></a>
                </ListItemAction>
            </ListItem>
        );
    }
});

export default Todo;