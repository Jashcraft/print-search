const { UserInputError, AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const resolvers = {
  Query: {
    me: async(_, args, context) => {
      if(context.user){
        const user = await User.findOne({_id: context.user._id})
          .select('-__v -password')
          .populate('thoughts')
          .populate('friends');

        return user;
      }

      throw new AuthenticationError('Please log in to continue');
    }
  }
}

module.exports = resolvers;