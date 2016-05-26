import mongoose from 'mongoose';

const smallSchema = new mongoose.Schema({
  _id:         { type: String,     // primary key
                 required: true,
                 validate: /^\d{20}$/},
  optionalKey: { type: String,
                 validate: /^\d{8}$/,
                 index: { unique: true, sparse: true } },
  someString:  { type: String,
                 validate: /^\d{4}$/ },
  field1:      { type: String },
  field2:      { type: String },
  field3:      { type: String },
  user:        { type: String }  // email identifying user
}, {
  timestamps: true, // createdAt, updatedAt
  _id: false        // Without this, express-restify-mongoose strips the _id,
                    // assuming it's auto-created, but it's not since we store our own ID there
});

const SmallItems = mongoose.model('smallitems', smallSchema);

export default SmallItems;
