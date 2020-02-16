// User Model
import { Model } from '@vuex-orm/core';

export default class Shake extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'shakes';

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      user_id: this.attr(null),
      name: this.attr(''),
      url: this.attr(''),
      thumbnail_url: this.attr(''),
      description: this.attr(''),
      type: this.attr(''),
      created_at: this.attr(''),
      updated_at: this.attr(''),
    };
  }
}
