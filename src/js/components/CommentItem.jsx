import React from 'react';
import { List, ListItem, ListItemContent, ListItemAction, Icon } from 'react-mdl';
import Comment from '../components/Comment.jsx'; 

var CommentList = React.createClass({
    delete() {
        console.log(this.props);
        this.props.remove(this.props.index);
    },
    render() {
        return(
            <ListItem key={this.props.index} threeLine style={{ paddingLeft: 0, paddingRight: 0 }}>
                <ListItemContent avatar="person" subtitle={<Comment>{this.props.data.comment}</Comment>}>
                    {this.props.data.user} 
                    <small className="mdl-color-text--grey-400">{this.props.data.created_at.toLocaleString()}</small>
                </ListItemContent>
                <ListItemAction>
                  <a onClick={this.delete} ><Icon name="close" /></a>
                </ListItemAction>
            </ListItem>
        );
    }
});

export default CommentList;