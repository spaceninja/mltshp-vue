import { Database } from '@vuex-orm/core';
import User from '@/models/User';
import Shake from '@/models/Shake';

const database = new Database();

database.register(User);
database.register(Shake);

export default database;
