import { add, update, remove, select } from '@/services/m1/test';
import INormalModel from '@/base/interfaces/INormalModel';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import SystemUtil from '@/base/utils/SystemUtil';

const test: INormalModel = {
  namespace: 'm1_test',

  state: {},

  effects: {
    *add(action: AnyAction, effects: EffectsCommandMap) {
      yield SystemUtil.NormalCallRequest(action, effects, add);
    },

    *update(action: AnyAction, effects: EffectsCommandMap) {
      yield SystemUtil.NormalCallRequest(action, effects, update);
    },

    *remove(action: AnyAction, effects: EffectsCommandMap) {
      yield SystemUtil.NormalCallRequest(action, effects, remove);
    },

    *select(action: AnyAction, effects: EffectsCommandMap) {
      yield SystemUtil.NormalCallRequest(action, effects, select);
    },
  },
};

export default test;
