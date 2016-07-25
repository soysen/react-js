import React from 'react';
import { ListItem, ListItemContent, ListItemAction, Textfield, Icon, Button, Grid, Cell } from 'react-mdl';

var CommentForm = React.createClass({
    submitForm(e) {
        e.preventDefault();
        let data = {
            user: this.refs.user.refs.input.value.trim(),
            comment: this.refs.comment.refs.input.value.trim(),
            created_at: new Date()
        };

        if(!data.user || !data.comment) {
          return;
        }
        this.props.onCommentSubmit(data);
        this.refs.user.refs.input.value = "";
        this.refs.comment.refs.input.value = "";
    },
    render() {
        return(
            <form onSubmit={this.submitForm}>
                <Grid style={{ padding: 0 }}>
                    <Cell col={2} hideTablet>
                        <Icon name="person" className="mdl-list__item-avatar" />
                    </Cell>
                    <Cell col={10} phone={12}>
                        <h6 className="mdl-typographt-title" style={{ marginTop: 0 }}>Comment</h6>
                        <Textfield label="user" floatingLabel style={{ width: '100%' }} ref="user" />
                        <Textfield label="comment" floatingLabel rows={3} style={{ width: '100%' }} ref="comment" />
                        <Button raised accent colored>
                            Send <Icon name="send" />
                        </Button>
                    </Cell>
                </Grid>
            </form>
        );
    }
});

export default CommentForm;
 