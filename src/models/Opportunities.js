const mongoose = require('mongoose');

const Opportunities = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Opportunities', Opportunities);
