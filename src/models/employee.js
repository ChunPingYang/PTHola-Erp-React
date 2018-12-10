import {
  queryEmployeeList,
  addEmployeeInfo,
} from '@/services/employee';

export default {
  namespace: 'employee',

  state: {
    response: {
      employees: [],
      paginator: {},
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryEmployeeList, payload);
      yield put({
        type: 'queryEmployeeList',
        payload: response,
      });
    },
    * add({ payload }, { call, put }) {
      const response = yield call(addEmployeeInfo, payload);
      yield put({
        type:'addEmployeeInfo',
        payload: response
      })
    },
  },

  reducers: {
    queryEmployeeList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
