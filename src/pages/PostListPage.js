import React from 'react';
import {Outlet} from 'react-router-dom';
import PostListContainer from '../containers/PostListContainer';

function PostListPage() {
  return (
    <>
      <PostListContainer />
      <Outlet />
    </>
  );
}

export default PostListPage;
