import React from 'react';
import ReactDisqusComments from 'react-disqus-comments';



function News() {

    const handleNewComment = (comment) => {
        console.log(comment.text);
    }

  return (
    <div>
        <ReactDisqusComments
        shortname="example"
        identifier="something-unique-12345"
        title="Example Thread"
        url="http://www.example.com/example-thread"
        category_id="123456"
        onNewComment={handleNewComment}/>
      </div>
  )
}

export default News