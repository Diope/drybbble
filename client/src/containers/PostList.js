import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchAllPosts} from '../store/actions/posts.actions'
import PostItem from '../components/PostItem'

class PostList extends Component {
  componentWillMount() {
    this.props.fetchAllPosts()
  }

  render() {
    const {posts} = this.props
    let postList = posts.map(p => (
      <PostItem
        key={p._id}
        date={p.createdAt}
        p_body={p.body}
        p_title={p.title}
        slug={p.slug}
      />
    ))
    return ( 
      <div className="col-sm-8">
        <div className="offset-1 col-sm-10">
          <ul className="list-group" id="post">
            {postList}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts
})
 
export default connect(mapStateToProps, {fetchAllPosts})(PostList);