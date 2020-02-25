// Post Model
import { Model } from '@vuex-orm/core';
import User from './User';
import Post from './Post';

export default class Comment extends Model {
  static entity = 'comments';
  static fields() {
    return {
      id: this.attr(null),
      body: this.attr(''),
      posted_at: this.attr(''),
      user_id: this.attr(null), // will be added by the User model
      user: this.belongsTo(User, 'user_id'),
      post_id: this.attr(null), // will be added by the Post model
      post: this.belongsTo(Post, 'post_id'),
    };
  }
}
