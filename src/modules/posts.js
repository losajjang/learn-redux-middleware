import {call, put, takeEvery} from 'redux-saga/effects';
import * as postsAPI from '../api/posts';
import {
  createPromiseSaga,
  createPromiseSagaById,
  createPromiseThunk,
  createPromiseThunkById,
  handleAsyncActionById,
  handleAsyncActions,
  reducerUtils,
} from '../lib/asyncUtils';

/* 액션 */
// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST'; // 요청 시작
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'; // 요청 성공
const GET_POST_ERROR = 'GET_POST_ERROR'; // 요청 실패

// // 포스트 비우기
// const CLEAR_POST = 'CLEAR_POST';

/* 액션 생성 함수 */
// export const clearPost = () => ({type: CLEAR_POST});
export const goHome = navigate => (dispatch, getState) => {
  navigate('/');
};
export const getPosts = () => ({type: GET_POSTS});
// payload 는 파라미터 용도, meta 는 리듀서에서 id 를 알기위한 용도
export const getPost = id => ({type: GET_POST, payload: id, meta: id});

/* 미들웨어 (thunk) */
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

// // 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다.
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

/* 미들웨어 (saga) */
// function* getPostsSaga() {
//   try {
//     const posts = yield call(postsAPI.getPosts); // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환될 때까지 기다려 줄 수 있습니다.
//     yield put({
//       type: GET_POSTS_SUCCESS,
//       payload: posts,
//     }); // 성공 액션 디스패치
//   } catch (e) {
//     yield put({
//       type: GET_POSTS_ERROR,
//       error: true,
//       payload: e,
//     }); // 실패 액션 디스패치
//   }
// }

// function* getPostSaga(action) {
//   const param = action.payload;
//   const id = action.meta;
//   try {
//     const post = yield call(postsAPI.getPostById, param); // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post,
//       meta: id,
//     });
//   } catch (e) {
//     yield put({
//       type: GET_POST_ERROR,
//       error: true,
//       payload: e,
//       meta: id,
//     });
//   }
// }

/* saga 리팩토링 */
// 아주 쉽게 saga 를 만들 수 있게 되었습니다.
const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

// 사가들을 합치기
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

/* 초기값 */
const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

/* 리듀서 */
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
      const postsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
      return postsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      const postReducer = handleAsyncActionById(GET_POST, 'post', true);
      return postReducer(state, action);
    // case CLEAR_POST:
    //   return {
    //     ...state,
    //     post: reducerUtils.initial(),
    //   };
    default:
      return state;
  }
}
