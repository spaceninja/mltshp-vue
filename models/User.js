// User Model
import { Model } from '@vuex-orm/core';
import Shake from './Shake';

export default class User extends Model {
  static entity = 'users';
  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
      profileImageUrl: this.attr(''),
      about: this.attr(''),
      website: this.attr(''),
      shakes: this.hasMany(Shake, 'user_id'),
    };
  }
}
