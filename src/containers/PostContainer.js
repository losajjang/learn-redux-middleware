import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Post from '../components/Post';
import {clearPost, getPost, goHome} from '../modules/posts';

function PostContainer({postId}) {
  const {data, loading, error} = useSelector(
    state => state.posts.post[postId],
  ) || {
    loading: false,
    data: null,
    error: null,
  }; // 아예 데이터가 존재하지 않을 때가 있으므로, 비구조화 할당이 오류나지 않도록F
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if (data) return; // 포스트가 존재하면 아예 요청을 하지 않음.
    dispatch(getPost(postId));
    // return () => {
    //   dispatch(clearPost());
    // };
  }, [postId, dispatch, data]);

  if (loading && !data) return <div>로딩중...</div>; // 로딩중이고 데이터 없을때만
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goHome(navigate))}>홈으로 이동</button>
      <Post post={data} />
    </>
  );
}

export default PostContainer;
