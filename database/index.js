import { Database } from '@vuex-orm/core';
import User from '@/models/User';
import Shake from '@/models/Shake';
import Post from '@/models/Post';

const database = new Database();

database.register(User);
database.register(Shake);
database.register(Post);

export default database;
