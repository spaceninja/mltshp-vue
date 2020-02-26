// Post Model
import { Model } from '@vuex-orm/core';
import User from './User';
import Shake from './Shake';

export default class Post extends Model {
  static entity = 'posts';
  static primaryKey = 'sharekey';
  static fields() {
    return {
      sharekey: this.attr(''),
      name: this.attr(''),
      title: this.attr(''),
      description: this.attr(''),
      postedAt: this.attr(''),
      permalinkPage: this.attr(''),
      width: this.attr(null),
      height: this.attr(null),
      views: this.attr(0),
      likes: this.attr(0),
      saves: this.attr(0),
      commentCount: this.attr(0),
      nsfw: this.attr(false),
      originalImageUrl: this.attr(''),
      sourceUrl: this.attr(''),
      pivotId: this.attr(''),
      saved: this.attr(false),
      liked: this.attr(false),
      user_id: this.attr(null), // will be added by the User model
      user: this.belongsTo(User, 'user_id'),
      shake_ids: this.attr([]), // will be added by the Shake model
      shakes: this.hasManyBy(Shake, 'shake_ids'),
    };
  }
}
