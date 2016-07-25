import React from 'react';
import Todo from '../todo/Todo.jsx';
import { Cell, List, ListItem, ListItemContent,
        RadioGroup, Radio, Button, Textfield, 
        Card, CardTitle, CardText, CardActions, 
        Icon, IconButton, 
        Menu, MenuItem } from 'react-mdl';


var TodoInsert = React.createClass({
    getInitialState() {
        return {
            todo: ""
        };
    },
    handleChange(e) {
        this.setState({ todo: e.target.value });
    },
    addItem() {
        this.props.addItem(this.state.todo);
        this.setState({ todo: "" });
    },
    pressKey(e) {
        if(e.keyCode==13) this.addItem();
    },
    render() {
        return(
            <ListItem>
                <ListItemContent>
                    <IconButton name="add" className="left floated" onClick={this.addItem} />
                    <Textfield label="輸入待辦事項" value={this.state.todo} onChange={this.handleChange} onKeyUp={this.pressKey} />
                </ListItemContent>
            </ListItem>
        );
    }
});

export default TodoInsert;