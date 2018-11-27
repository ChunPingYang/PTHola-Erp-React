import {
  queryMemberList,
  getMemberInfo,
  createMember,
  editMember,
} from '@/services/member';

export default {
  namespace: 'member',

  state: {
    response:{
      members:[],
      paginator:{}
    }
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryMemberList, payload);
      console.log(response);
      yield put({
        type: 'queryMemberList',
        payload: response,
      });
    },
  },

  reducers: {
    queryMemberList(state, {payload}){
      return {
        ...state,
        ...payload
      }
    }
  },
};
