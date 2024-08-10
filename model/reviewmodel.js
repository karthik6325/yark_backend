const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    status: {
      type: String,
      enum: ['approved', 'rejected', 'pending'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;