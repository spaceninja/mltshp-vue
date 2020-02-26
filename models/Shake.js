// Shake Model
import { Model } from '@vuex-orm/core';
import User from './User';
const url = require('url');

export default class Shake extends Model {
  static entity = 'shakes';
  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
      // eslint-disable-next-line node/no-deprecated-api
      url: this.attr('', value => (value ? url.parse(value).pathname : '')),
      thumbnailUrl: this.attr(''),
      description: this.attr(''),
      type: this.attr(''),
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
      user_id: this.attr(null), // will be added by the User model
      owner: this.belongsTo(User, 'user_id'),
    };
  }
}
