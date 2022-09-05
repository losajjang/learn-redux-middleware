import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PostList from '../components/PostList';
import {getPosts} from '../modules/posts';

function PostListContainer() {
  const {data, loading, error} = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  // 컴포넌트 마운트 후 포스트 목록 요청
  useEffect(() => {
    // if (data) return; // 포스트 목록 재로딩 방지
    dispatch(getPosts());
  }, [dispatch]);

  if (loading && !data) return <div>로딩중...</div>; // 로딩중이면서, 데이터가 없을 때에만 로딩중... 표시
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <PostList posts={data} />;
}

export default PostListContainer;
