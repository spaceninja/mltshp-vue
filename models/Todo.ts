import { Model } from 'pinia-orm';

export default class Todo extends Model {
  static entity = 'todos';

  static fields() {
    return {
      id: this.uid(),
      title: this.string(''),
      userId: this.attr(null),
    };
  }
}
