// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
//import authentication reponse if user logged in authentication fails
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
   Query:{
        me: async (parent, args, context) => {
            if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('savedBooks');
    
                return userData;
            }
  
            throw new AuthenticationError('Not logged in');
        },
        user: async (parent, { username }, username) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('savedBooks')
        }, 
   },
   Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken
            return {token, user}
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if (!user) 
            { throw new AuthenticationError('Incorrect credentials');}

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw)
            { throw new AuthenticationError('Incorrect credentials');}

            const token = signToken(user);
            return {token, user};
        },

        saveBook: async (parent, args, context) => {
            if (context.user)
            {
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args} },
                    { new: true }
                );
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        deleteBook: async (parent, args, context) => {
            if (context.user)
            {
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } }},
                    { new: true }
                );
            }

            throw new AuthenticationError('You need to be logged in!');
        }
   },

}

module.exports = resolvers;