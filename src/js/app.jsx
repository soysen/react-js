import React from 'react';
import ReactDom from 'react-dom';
import { List, ListItem, ListItemContent, ListItemAction, Icon, Card, CardTitle, CardText, CardActions, Textfield } from 'react-mdl';

/* -----------   Section 1     ------------ */
// Create component
var Hello = React.createClass({
  getInitialState: function() {
    return { name: "AV8D" };
  },
  handleChange(e) {
    this.setState({ name: e.target.value });
  },
  render() {
    return(
      <Card shadow={4} className="card-square" style={{ width: '96%', margin: "auto" }}>
        <CardTitle expand style={{color: '#fff', background: 'url(http://loremflickr.com/320/240/dog) center / cover'}}>
          <h2 className="mdl-card__title-text">Hello, <strong>{ this.state.name }!</strong></h2>
        </CardTitle>
        <CardText>現在是 {this.props.date.toLocaleString()}</CardText>
        <CardActions border style={{ textAlign: "center" }}>
          <Textfield
              onChange={(e) => this.handleChange(e)}
              value={this.state.name}
              label="Insert your name"
              floatingLabel />
        </CardActions>
      </Card>
    );
  }
});
// Render
ReactDom.render(
    <Hello date={new Date()} />,
    document.querySelector('#demo')
);

/* -----------   Section 2     ------------ */
// Import Child Components
import CommentItem from './components/CommentItem.jsx';
import CommentForm from './components/CommentForm.jsx';

// Create component
var CommentBox = React.createClass({
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
            <CommentItem style={{ paddingLeft: 0, paddingRight: 0 }} key={ item.created_at.toJSON() } data={item} index={index} remove={this.remove}></CommentItem>
        );
    }.bind(this));

    return(
      <Card shadow={4} style={{ width: "96%", margin: "auto" }}>
        <CardText>
          <List style={{ margin: 0, padding: 0 }}>
              {itemNode}
          </List>
        </CardText>
        <CardActions border>
          <CommentForm onCommentSubmit={this.handleCommentSubmit}></CommentForm>
        </CardActions>
      </Card>
    );  
  }
});

// Render
ReactDom.render(
    <CommentBox/>,
    document.querySelector('#list')
);

/* -----------   Section 3     ------------ */

import ChildItem from './components/ChildItem.jsx';

var Tree = React.createClass({
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
        return(<ChildItem key={index} data={item} index={index} deleteFolder={this.deleteFolder} />);
      }.bind(this)
    );

    return (
      <div className="tree">
          {ChildNode}
          <div className="tree-item">
            <div className="tree-item-title">
              <a onClick={this.addFolder}>
                <Icon name="create_new_folder" className="folder" />
                New Folder
              </a>
            </div>
          </div>
      </div>
    );
  }
});
// Render
ReactDom.render(
    <Tree url="./api/tree.json" />,
    document.querySelector('#tree')
);
