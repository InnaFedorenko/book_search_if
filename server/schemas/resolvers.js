const { User, Book} = require('../models');
//const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');


const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new Error('Authentication required.');
      }
      return [user];
    },
    user: async (_, { username }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found.');
      }
      return user;
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Invalid email or password.');
      }

      const token = jwt.sign({ _id: user._id }, 'your-secret-key', {
        expiresIn: '1h', // You can adjust the token expiration time
      });

      return { token, user };
    },
    addUser: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('User with this email already exists.');
      }

      const newUser = new User({ username, email, password });
      await newUser.save();

      const token = jwt.sign({ _id: newUser._id }, 'your-secret-key', {
        expiresIn: '1h', // You can adjust the token expiration time
      });

      return { token, user: newUser };
    },
    saveBook: async (_, { authors, description, title, bookId, image, link }, { user }) => {
      if (!user) {
        throw new Error('Authentication required.');
      }

      const book = new Book({ authors, description, title, bookId, image, link });

      user.savedBooks.push(book);
      await user.save();

      return user;
    },
    removeBook: async (_, { bookId }, { user }) => {
      if (!user) {
        throw new Error('Authentication required.');
      }

      user.savedBooks = user.savedBooks.filter((book) => book.bookId !== bookId);
      await user.save();

      return user;
    },
  },
};

module.exports = resolvers;
