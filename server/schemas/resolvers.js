const { UserInputError, AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

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
  },

  Mutation: {
    login: async(_, args) => {
      const {email, password} = args;
      const user = await User.findOne({email: email});
      if(!user){
        throw new AuthenticationError('Wrong Credentials');
      }
      const isPasswordCorrect = await user.isCorrectPassword(password);

      if(!isPasswordCorrect){
        throw new AuthenticationError('Wrong Credentials');
      }
      const token = signToken(user);
      return {token,user}
    },
    addUser: async(_, args) => {
      const user = await User.create(args);
      const token = signToken(user)
      return {token, user}
    }
  }
}

module.exports = resolvers;