import { create, update, findAll, findOne } from '../../controllers/user.controller';


export default {
  queries: {
    oneUser: findOne,
    allUsers: findAll,
  },
  mutations: {
    createUser: create,
    updateUser: update,
  },
};
