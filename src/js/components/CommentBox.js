import React from 'react';

var count = 11;

var CommentBox = React.createClass({
  getInitialState() {
    return { data:[] };
  },
  getCommentList() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount() {
    this.getCommentList();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  handleCommentSubmit(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

    alert("Comment Posted!");
  },
  removeData(index) {
    let data = this.state.data;
    data.splice(index, 1);
    this.setState({data: data});
  },
  render () {
    return (
      <div className="commentBox">
        <h3 className="header">Comments</h3>
        <CommentList data={this.state.data} onRemoveData={this.removeData} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  delete(item) {
    this.props.onRemoveData(item.index);
  },
  render () {
    var list = this;
    var commentNodes = this.props.data.map(function(comment, index){
      return (
        <Comment author={comment.author} index={index} key={comment.id} onDelete={list.delete}>
          {comment.text} 
        </Comment>
      );
    })
    return (
      <div className="list">
        {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  deleteItem(e) {
    e.preventDefault();
    this.props.onDelete(this.props);
  },
  rawMarkup () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render () {
    return (
      <div className="item" id={'comment-'+this.props.index}>
        <a className="right floated" onClick={this.deleteItem}>&times;</a>
        <h5 className="header">{this.props.author}</h5>
        <div className="content" dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if(!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ id: count++ ,author: author, text: text });
    this.refs.author.value = '';
    this.refs.text.value = '';
    
    return;
  },
  render () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <h4 className="header">New Comment</h4>
        <input type='text' placeholder="Your Name" ref="author" />
        <textarea name="comment" placeholder="Your Comment." ref="text"></textarea>
        <div className="right aligned">
          <button>Send</button>
        </div>
      </form>
    );
  }
});

export default CommentBox;
