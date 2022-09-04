import * as postsAPI from '../api/posts';
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
} from '../lib/asyncUtils';

// 액션
// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST'; // 요청 시작
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'; // 요청 성공
const GET_POST_ERROR = 'GET_POST_ERROR'; // 요청 실패

// // 미들웨어
// // thunk 를 사용할 때, 꼭 모든 액션들에 대해 액션 생성 함수를 만들 필요는 없습니다.
// // 그냥 thunk 함수에서 바로 액션 객체를 만들어 주어도 괜찮습니다.
// export const getPosts = () => async dispatch => {
//   dispatch({type: GET_POSTS}); // 요청이 시작됨.
//   try {
//     const posts = await postsAPI.getPosts(); // API 호출
//     dispatch({type: GET_POSTS_SUCCESS, posts}); // 성공
//   } catch (e) {
//     dispatch({type: GET_POSTS_ERROR, error: e}); // 실패
//   }
// };

// // thunk 함수에서도 파라미터를 받아와서 사용할 수 있습니다.
// export const getPost = id => async dispatch => {
//   dispatch({type: GET_POST}); // 요청이 시작됨.
//   try {
//     const post = await postsAPI.getPostById(id); // API 호출
//     dispatch({type: GET_POST_SUCCESS, post}); // 성공
//   } catch (e) {
//     dispatch({type: GET_POST_ERROR, error: e}); // 실패
//   }
// };

// 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다.
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

// 초기값
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

// // 리듀서
// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case GET_POSTS:
//       return {
//         ...state,
//         posts: reducerUtils.loading(),
//       };
//     case GET_POSTS_SUCCESS:
//       return {
//         ...state,
//         posts: reducerUtils.success(action.payload), // action.posts -> action.payload 로 변경
//       };
//     case GET_POSTS_ERROR:
//       return {
//         ...state,
//         posts: reducerUtils.error(action.error),
//       };
//     case GET_POST:
//       return {
//         ...state,
//         post: reducerUtils.loading(),

//       };
//     case GET_POST_SUCCESS:
//       return {
//         ...state,
//         post: reducerUtils.success(action.payload), // action.posts -> action.payload 로 변경

//       };
//     case GET_POST_ERROR:
//       return {
//         ...state,
//         post: {
//           loading: false,
//           data: null,
//           post: reducerUtils.error(action.error),
//         },
//       };
//     default:
//       return state;
//   }
// };
export default function posts(state = initialState, action) {
  switch (action.type) {
    // case GET_POSTS:
    // case GET_POSTS_SUCCESS:
    // case GET_POSTS_ERROR:
    //   return handleAsyncActions(GET_POSTS, 'posts')(state, action);
    // case GET_POST:
    // case GET_POST_SUCCESS:
    // case GET_POST_ERROR:
    //   return handleAsyncActions(GET_POST, 'post')(state, action);

    // 위 코드는 다음처럼 표현 할 수도 있습니다.
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
      return postsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      const postReducer = handleAsyncActions(GET_POST, 'post');
      return postReducer(state, action);
    default:
      return state;
  }
}
