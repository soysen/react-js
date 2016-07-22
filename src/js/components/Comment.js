import React from 'react';

var Comment = React.createClass({
  rawMarkup () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render () {
    return (
      <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
    );
  }
});
 
export default Comment;