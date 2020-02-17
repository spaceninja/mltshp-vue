// Post Model
import { Model } from '@vuex-orm/core';
import User from './User';

export default class Post extends Model {
  static entity = 'posts';
  static fields() {
    return {
      id: this.attr(null),
      user_id: this.attr(null), // will be added by the user model
      name: this.attr(''),
      title: this.attr(''),
      description: this.attr(''),
      posted_at: this.attr(''),
      permalink_page: this.attr(''),
      width: this.attr(''),
      height: this.attr(''),
      views: this.attr(''),
      likes: this.attr(''),
      saves: this.attr(''),
      comments: this.attr(''),
      nsfw: this.attr(''),
      original_image_url: this.attr(''),
      source_url: this.attr(''),
      pivot_id: this.attr(''),
      saved: this.attr(''),
      user: this.belongsTo(User, 'user_id'),
    };
  }
}
