import { GET_PACKAGES_LIST } from "./actions.type";
import {
  START_FETCH,
  END_FETCH,
  SAVE_PACKAGES_LIST,
  CLEAR_PACKAGES_LIST,
  SAVE_TARGET_PACKAGE,
  CLEAR_TARGET_PACKAGE,
} from "./mutations.type";
import { HTTP } from "@/common/api.service";

const PAGE_SIZE = 10;
const MAX_PAGES_COUNT = 1000;

const state = {
  packagesList: [],
  packagesCount: 0,
  isLoading: false,
  targetPackage: {},
};

const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  packagesList(state) {
    return state.packagesList;
  },
  targetPackage(state) {
    return state.targetPackage;
  },
  packagesCount(state) {
    const pageCount = Math.ceil(state.packagesCount / PAGE_SIZE);
    return pageCount > MAX_PAGES_COUNT ? 1000 : pageCount;
  }
};

// request example
// return HTTP.get(`url`)
//   .then(({ data }) => commit(END_FETCH, data))
//   .catch(err => alert(err));

const actions = {
  [GET_PACKAGES_LIST]({ commit }, { page, name }) {
    commit(CLEAR_PACKAGES_LIST);
    if (!name) return;
    commit(START_FETCH);
    return HTTP.get(`${process.env.VUE_APP_API_URL}/search/?q=${name}&size=${PAGE_SIZE}&from=${(page - 1) * PAGE_SIZE}`)
      .then(({ data }) => {
        commit(END_FETCH);
        commit(SAVE_PACKAGES_LIST, data);
      })
      .catch(err => alert(err));
  }
};

const mutations = {
  [START_FETCH](state) {
    state.isLoading = true;
  },
  [END_FETCH](state) {
    state.isLoading = false;
  },
  [SAVE_PACKAGES_LIST](state, { results, total }) {
    state.packagesList = results;
    state.packagesCount = total;
  },
  [CLEAR_PACKAGES_LIST](state) {
    state.packagesCount = 0;
    state.packagesList = [];
  },
  [SAVE_TARGET_PACKAGE](state, data) {
    state.targetPackage = data;
  },
  [CLEAR_TARGET_PACKAGE](state) {
    state.targetPackage = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
