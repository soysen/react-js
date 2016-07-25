import React from 'react';
import Todo from '../todo/Todo.jsx';
import TodoInsert from '../todo/TodoInsert.jsx';
import { Textfield, Card, CardTitle, CardText, CardActions, Cell, Button, Icon, IconButton, List, ListItem, ListItemContent } from 'react-mdl';

var TodoContainer = React.createClass({
    displayName: 'TodoContainer',
    getInitialState() {
        return {
            title: this.props.todo.title,
            content: this.props.todo.content,
            list: this.props.todo.list,
            type: this.props.todo.type,
            created_at: this.props.todo.created_at,
            edit_mode: false
        };
    },
    removeItem(idx) {
        let todo_list = this.state.list.filter(function(item, index){
            if(index!=idx) return item;
        });
        this.setState({ list: todo_list });
    },
    deleteTodo() {
        event.preventDefault();
        this.props.deleteTodo(this.props.index);
    },
    updateContent(e) {
        this.setState({ content: e.target.value });
    }, 
    updateTitle(e) {
       this.setState({ title: e.target.value }); 
    },
    updateTodoItem(data, idx) {
        let todo = this.state.list;
        todo.map(function(item, index){
            if(index==idx) item = data;
        });
        this.setState({ list: todo }); 
    },
    editMode() {
        this.setState({ edit_mode: true });
    },
    addItem(todo) {
        let list = this.state.list;
        list.push({
            todo: todo, done: false, created_at: Date.now()
        });

        this.setState({ list: list });
    },
    handleChange(e) {
        this.setState({ newTodo: e.target.value });
    },
    save() {
        this.setState({ edit_mode: false });
        this.props.updateTodo({
            title: this.state.title,
            content: this.state.content,
            list: this.state.list,
            type: this.state.type,
            created_at: this.state.created_at
        }, this.props.index);
    },
    rawMarkup() {
        var rawMarkup = marked(this.state.content.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },
    render() {
        let Container = <Cell col={12} dangerouslySetInnerHTML={this.rawMarkup()}></Cell>;
        let Actions = <IconButton name="mode_edit" className="right floated" onClick={this.editMode} />;
        
        if( this.state.edit_mode ) {
            Actions = <IconButton name="check" className="mdl-color-text--teal-400 right floated" onClick={this.save} />;
            Container = (<Cell col={12}>
                            <Textfield label="輸入記事" value={ this.state.content } rows={3} onChange={this.updateContent} />
                        </Cell>);
        }

        if(this.state.type==1) {
            let todo_list = this.state.list.map(function(item, index) {
                let idx = index
                return (
                    <Todo item={item} 
                    key={item.created_at} 
                    index={idx} edit_mode={this.state.edit_mode} 
                    removeItem={this.removeItem} 
                    updateTodoItem={this.updateTodoItem} />
                );  
            }.bind(this));
            
            Container = (<List>
                            { todo_list }
                            <TodoInsert addItem={this.addItem} />
                        </List>);
        }
        
        return (
            <Card shadow={2} className="todo">
                <CardTitle>
                    <Cell col={12}>
                        <Textfield label="輸入標題" value={ this.state.title } onChange={this.updateTitle} disabled={!this.state.edit_mode} />                        
                    </Cell>
                </CardTitle>
                <CardText>
                    {Container}
                </CardText>
                <CardActions>
                    <Cell col={12}>
                        <IconButton name="delete" className="mdl-color-text--grey-400" onClick={this.deleteTodo} />
                        {Actions}
                    </Cell>
                </CardActions>
            </Card>
        );
    }
});

export default TodoContainer;