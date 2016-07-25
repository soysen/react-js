import React from 'react';
import ReactDom from 'react-dom';
import TodoEditor from './components/todo/TodoEditor.jsx';
import TodoContainer from './components/todo/TodoContainer.jsx';
import { List, ListItem, ListItemContent, ListItemAction, Icon, Card, CardTitle, CardText, CardActions, Textfield } from 'react-mdl';

// Create component
var Todo = React.createClass({
  getInitialState() {
      return {
          TodoList: [] 
      };
  },
  componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(response) {
        this.setState({ TodoList: response });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  deleteTodo(index) {
    let list = this.state.TodoList.filter(function(item, idx) {
      if(idx!=index) return item;
    });
    this.setState({ TodoList: list });
  },
  updateTodo(data, idx) {
    let list = this.state.TodoList;
    list.map(function(item, index){
      if(idx===index) {
        item = data;
        console.log(item.content);
      }
    });
    this.setState({ TodoList: list });
  },
  saveTodo(data) {
    let list = this.state.TodoList;
    this.setState({ TodoList: [data].concat(list) });
  },
  render() {
    let TodoRenderer = this.state.TodoList.map(function(item, index) {
        let idx = index
        return (<TodoContainer key={item.created_at} todo={item} index={index} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo} />); 
    }.bind(this));

    return(
      <section className="mdl-components__page mdl-grid">
        <TodoEditor saveTodo={this.saveTodo} />
        <div className="mdl-cell mdl-cell--12-col todo-list">
          {TodoRenderer}
        </div>
      </section>
    );
  }
});
// Render
ReactDom.render(
    <Todo url="./api/todo.json" />,
    document.querySelector('#todo')
);
