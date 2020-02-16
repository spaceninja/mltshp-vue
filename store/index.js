import VuexORM from '@vuex-orm/core';
import database from '@/database';

export const plugins = [VuexORM.install(database)];

export const state = () => ({
  loading: false,
});

export const mutations = {
  START_LOADING: state => (state.loading = true),
  FINISH_LOADING: state => (state.loading = false),
};
