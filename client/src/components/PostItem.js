import React from 'react';

const PostItem = ({_id, date, user, slug, p_body, p_title}) => (
  <li>
    <p>{p_body}</p>
    <p>{slug}</p>
  </li>
)
 
export default PostItem;