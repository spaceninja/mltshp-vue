// Page Model
import { Model } from '@vuex-orm/core';
import Post from './Post';
import Shake from './Shake';

export default class Page extends Model {
  static entity = 'pages';
  static fields() {
    return {
      id: this.attr(''),
      first_key: this.attr(''),
      last_key: this.attr(''),
      shake_id: this.attr(null), // will be added by the Shake model
      shake: this.belongsTo(Shake, 'shake_id'),
      post_ids: this.attr([]), // will be added by the Post model
      posts: this.hasManyBy(Post, 'post_ids'),
    };
  }
}
