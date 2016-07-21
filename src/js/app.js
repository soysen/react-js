import React from 'react';
import ReactDom from 'react-dom';
// Import Components
import CommentBox from './components/CommentBox';

// Renderer
ReactDom.render(
    <CommentBox url="/api/comment-list.json" />,
    document.getElementById('root')
);
