import React from 'react';
import ReactDom from 'react-dom';
import { List, ListItem, ListItemContent, ListItemAction, Icon, Card, CardTitle, CardText, CardActions, Textfield } from 'react-mdl';

/* -----------   Section 1     ------------ */
// Create component
var Hello = React.createClass({displayName: "Hello",
  getInitialState: function() {
    return { name: "AV8D" };
  },
  handleChange(e) {
    this.setState({ name: e.target.value });
  },
  render() {
    return(
      React.createElement(Card, {shadow: 4, className: "card-square", style: { width: '96%', margin: "auto"}}, 
        React.createElement(CardTitle, {expand: true, style: {color: '#fff', background: 'url(http://loremflickr.com/320/240/dog) center / cover'}}, 
          React.createElement("h2", {className: "mdl-card__title-text"}, "Hello, ", React.createElement("strong", null,  this.state.name, "!"))
        ), 
        React.createElement(CardText, null, "現在是 ", this.props.date.toLocaleString()), 
        React.createElement(CardActions, {border: true, style: { textAlign: "center"}}, 
          React.createElement(Textfield, {
              onChange: (e) => this.handleChange(e), 
              value: this.state.name, 
              label: "Insert your name", 
              floatingLabel: true})
        )
      )
    );
  }
});
// Render
ReactDom.render(
    React.createElement(Hello, {date: new Date()}),
    document.querySelector('#demo')
);

/* -----------   Section 2     ------------ */
// Import Child Components
import CommentItem from './components/CommentItem';
import CommentForm from './components/CommentForm';

// Create component
var CommentBox = React.createClass({displayName: "CommentBox",
  getInitialState() {
    return { 
      list: [{
        user: "Nelson",
        comment: "Test~",
        created_at: new Date()
      }] 
    };
  },
  handleCommentSubmit(data) {
    let list = this.state.list;
    list = list.concat([data]);
    this.setState({ list: list });
  },
  remove(index) {
    // e.preventDefault();
    let items = this.state.list;
    items.splice(index, 1);
    this.setState({ list: items });
  },
  render() {
    let itemNode = this.state.list.map(function(item, index){
        return (
            React.createElement(CommentItem, {style: { paddingLeft: 0, paddingRight: 0}, key:  item.created_at.toJSON(), data: item, index: index, remove: this.remove})
        );
    }.bind(this));

    return(
      React.createElement(Card, {shadow: 4, style: { width: "96%", margin: "auto"}}, 
        React.createElement(CardText, null, 
          React.createElement(List, {style: { margin: 0, padding: 0}}, 
              itemNode
          )
        ), 
        React.createElement(CardActions, {border: true}, 
          React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
        )
      )
    );  
  }
});

// Render
ReactDom.render(
    React.createElement(CommentBox, null),
    document.querySelector('#list')
);

/* -----------   Section 3     ------------ */

import ChildItem from './components/ChildItem';

var Tree = React.createClass({displayName: "Tree",
  getInitialState() {
      return {
          tree: []  
      };
  },
  componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ tree: data});
      }.bind(this),
        error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  deleteFolder(item, index) {
    let data = this.state.tree;
    data.splice(index, 1);
    this.setState({ tree: data });
  },
  addFolder() {
    let data = this.state.tree;
    data.push({
      name: "New folder",
      child: []
    });
    this.setState({ tree: data });
  },
  render() {
    // Render child
    let ChildNode = this.state.tree.map(
      function(item, index){
        return(React.createElement(ChildItem, {key: index, data: item, index: index, deleteFolder: this.deleteFolder}));
      }.bind(this)
    );

    return (
      React.createElement("div", {className: "tree"}, 
          ChildNode, 
          React.createElement("div", {className: "tree-item"}, 
            React.createElement("div", {className: "tree-item-title"}, 
              React.createElement("a", {onClick: this.addFolder}, 
                React.createElement(Icon, {name: "create_new_folder", className: "folder"}), 
                "New Folder"
              )
            )
          )
      )
    );
  }
});
// Render
ReactDom.render(
    React.createElement(Tree, {url: "./api/tree.json"}),
    document.querySelector('#tree')
);
