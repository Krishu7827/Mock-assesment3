const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Business', 'Tech', 'Lifestyle', 'Entertainment'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
       User:{
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      }
    },
  ],
  comments: [
    {
      User: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
},{
    versionKey:false
});

const blog = mongoose.model('Blog', blogSchema);

module.exports = blog
