import userResolvers from './user.resolver';

export default {
  Query: {
    ...userResolvers.queries
  },
  Mutation: {
    ...userResolvers.mutations
  },
};
