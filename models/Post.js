// Post Model
import { Model } from '@vuex-orm/core';
import User from './User';
import Shake from './Shake';
import Comment from './Comment';

export default class Post extends Model {
  static entity = 'posts';
  static primaryKey = 'sharekey';
  static fields() {
    return {
      sharekey: this.attr(''),
      name: this.attr(''),
      title: this.attr(''),
      description: this.attr(''),
      posted_at: this.attr(''),
      permalink_page: this.attr(''),
      width: this.attr(null),
      height: this.attr(null),
      views: this.attr(0),
      likes: this.attr(0),
      saves: this.attr(0),
      comment_count: this.attr(0),
      nsfw: this.attr(false),
      original_image_url: this.attr(''),
      source_url: this.attr(''),
      pivot_id: this.attr(''),
      saved: this.attr(false),
      liked: this.attr(false),
      user_id: this.attr(null), // will be added by the User model
      user: this.belongsTo(User, 'user_id'),
      shake_ids: this.attr([]), // will be added by the Shake model
      shakes: this.hasManyBy(Shake, 'shake_ids'),
      comments: this.hasMany(Comment, 'post_id'),
    };
  }
}
