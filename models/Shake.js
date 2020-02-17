// Shake Model
import { Model } from '@vuex-orm/core';
import User from './User';

export default class Shake extends Model {
  static entity = 'shakes';
  static fields() {
    return {
      id: this.attr(null),
      user_id: this.attr(null), // will be added by the user model
      name: this.attr(''),
      url: this.attr(''),
      thumbnail_url: this.attr(''),
      description: this.attr(''),
      type: this.attr(''),
      created_at: this.attr(''),
      updated_at: this.attr(''),
      user: this.belongsTo(User, 'user_id'),
    };
  }
}
