import VuexORM from '@vuex-orm/core';
import database from '@/database';

export const plugins = [VuexORM.install(database)];

export const state = () => ({
  loading: false,
});

// TODO: move loaders to modules for module-specific loading states
export const mutations = {
  START_LOADING: state => (state.loading = true),
  FINISH_LOADING: state => (state.loading = false),
};
