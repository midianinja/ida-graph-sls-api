import Database from '../services/database'

export const findAll = async (_parent, args, { env }) => {
  try {
    const db = new Database({
      user: env.MONGO_INITDB_ROOT_USERNAME,
      pass: env.MONGO_INITDB_ROOT_PASSWORD,
      host: env.MONGO_URL,
      port: Number(env.MONGO_DB_PORT),
      name: env.MONGO_INITDB_DATABASE,
    });
    
    const connection = await db.connect();
    const response = await connection.model('users').find(args.user).lean();
    return response.map((usr) => ({ ...usr, id: usr._id}));
  } catch (err) {
    throw err;
  }
}

export const findOne = async (_parent, args, { env }) => {
  try {
    const db = new Database({
      user: env.MONGO_INITDB_ROOT_USERNAME,
      pass: env.MONGO_INITDB_ROOT_PASSWORD,
      host: env.MONGO_URL,
      port: Number(env.MONGO_DB_PORT),
      name: env.MONGO_INITDB_DATABASE,
    });
    
    const connection = await db.connect();
    const response = await connection.model('users').findOne(args.user).lean();
    return { ...response, id: response._id };
  } catch (err) {
    throw err;
  }
}

export const create = async (_parent, args, { env }) => {
  try {
    const db = new Database({
      user: env.MONGO_INITDB_ROOT_USERNAME,
      pass: env.MONGO_INITDB_ROOT_PASSWORD,
      host: env.MONGO_URL,
      port: Number(env.MONGO_DB_PORT),
      name: env.MONGO_INITDB_DATABASE,
    });
    
    const connection = await db.connect();
    const response = await connection.model('users').create(args.user);
    return { ...response, id: response._id };
  } catch (err) {
    throw err;
  }
}

export const update = async (_parent, args, { env }) => {
  try {
    const db = new Database({
      user: env.MONGO_INITDB_ROOT_USERNAME,
      pass: env.MONGO_INITDB_ROOT_PASSWORD,
      host: env.MONGO_URL,
      port: Number(env.MONGO_DB_PORT),
      name: env.MONGO_INITDB_DATABASE,
    });
    
    const connection = await db.connect();
    const response = await connection.model('users').findOneAndUpdate({ _id: args.user.id }, args.user, { new: true });
    return response;
  } catch (err) {
    throw err;
  }
}