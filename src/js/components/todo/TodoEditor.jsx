import React from 'react';
import Todo from '../todo/Todo.jsx';
import TodoInsert from '../todo/TodoInsert.jsx';
import { Cell, List, ListItem, ListItemContent,
        RadioGroup, Radio, Button, Textfield, 
        Card, CardTitle, CardText, CardActions, 
        Icon, IconButton, 
        Menu, MenuItem } from 'react-mdl';

var TodoEditor = React.createClass({
    displayName: 'TodoEditor',
    getInitialState() {
        return {
            type: "0", 
            title: "", 
            content: "",
            list: []
        };
    },
    setType(e) {
        let type = Number(e.target.value);
        this.setState({ type: type });
    },
    addItem(todo) {
        let list = this.state.list;
        list.push({
            todo: todo, done: false, created_at: Date.now()
        });

        this.setState({ 
            newTodo: "",
            list: list 
        });
    },
    handleChange(e) {
        if(Number(this.state.type)==0) {
            this.setState({ content: e.target.value });
        } else {
            this.setState({ newTodo: e.target.value });
        }
    },
    titleChange(e) {
        this.setState({ title: e.target.value });
    },
    removeItem(index) {
        let list = this.state.list;
        list.splice(index, 1);
        this.setState({ list: list });
    },
    addTodo() {
        let data = {
            title: this.state.title,
            content: this.state.content,
            list: this.state.list,
            type: Number(this.state.type),
            created_at: Date.now()
        };
        this.props.saveTodo(data);
        this.setState({
            type: "0", 
            title: "", 
            content: "",
            list: [],
            newTodo: ""
        });
    },
    changeItem(item, index) {
        let list = this.state.list;
        list.map(function(i, idx){
            if(idx===index) i = item;
        });
        this.setState({ list: list });
    },
    render() {
        let Content =   (<Cell col={12}>
                            <Textfield onChange={this.handleChange} rows={3} label="新增記事..." value={this.state.content} />
                        </Cell>);

        if(this.state.type==1) {
            let Item = this.state.list.map(function(item, index){
                let idx = index
                return (<Todo item={item} index={idx} key={item.created_at} edit_mode={true} removeItem={this.removeItem} changeItem={this.changeItem} />);
            }.bind(this));

            Content =   (<List>
                            {Item}
                            <TodoInsert addItem={this.addItem} />
                        </List>);
        }

        return (
            <Cell col={12}>
                <Card shadow={1} className="todo editor">
                    <CardTitle>
                        <Cell phone={12} col={9}>
                            <Textfield onChange={this.titleChange} value={this.state.title} label="標題..." />
                        </Cell>
                        <Cell phone={12} col={3}>
                            <RadioGroup name="type" value={this.state.type} onChange={this.setType}>
                                <Radio value="0" ripple><Icon name="subject" className="mdl-color-text--blue-700" /></Radio>
                                <Radio value="1" ripple><Icon name="list" className="mdl-color-text--blue-700" /></Radio>
                            </RadioGroup>
                        </Cell>
                    </CardTitle>
                    <CardText>
                        {Content}
                    </CardText>
                    <CardActions>
                        <Cell col={12} className="right aligned">
                            <Button accent onClick={this.addTodo}>完成</Button>
                        </Cell>
                    </CardActions>
                </Card>
            </Cell>
        );
    }
});

export default TodoEditor;