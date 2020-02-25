import { Database } from '@vuex-orm/core';
import User from '@/models/User';
import Shake from '@/models/Shake';
import Post from '@/models/Post';
import Comment from '@/models/Comment';

const database = new Database();

database.register(User);
database.register(Shake);
database.register(Post);
database.register(Comment);

export default database;
