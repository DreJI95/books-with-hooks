// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
//import authentication reponse if user logged in authentication fails
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    user: async (parent, {username}) => {
        return User.findOne({username})
        .select('-__v -password')
    }


}

module.exports = resolvers;