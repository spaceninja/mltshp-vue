import { Database } from '@vuex-orm/core';
import Comment from '@/models/Comment';
import Page from '@/models/Page';
import Post from '@/models/Post';
import Shake from '@/models/Shake';
import User from '@/models/User';

const database = new Database();

database.register(Comment);
database.register(Page);
database.register(Post);
database.register(Shake);
database.register(User);

export default database;
