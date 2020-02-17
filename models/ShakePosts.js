// Post/Shake Model
import { Model } from '@vuex-orm/core';

export default class ShakePosts extends Model {
  static entity = 'shakePosts';
  static primaryKey = ['shake_id', 'sharekey'];
  static fields() {
    return {
      shake_id: this.attr(null),
      sharekey: this.attr(null),
    };
  }
}
