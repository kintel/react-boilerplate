import mongoose from 'mongoose';

const largeSchema = new mongoose.Schema({
  _id:       { type: String,     // primary key
               required: true,
               validate: /^\d{15}$/},
  small:     { type: String,    // ID of installed SmallItem
               index: { sparse: true, unique: true },
               match: /^\d{20}$/,
               ref: 'smallitems' },
  status:    { type: String },
  field1:    { type: String },
  field2:    { type: String },
  field3:    { type: String },
  transactions: [ {
    type:      { type: String, required: true },
    user:      { type: String, required: true },
    timestamp: { type: Date, required: true },
    payload:   { type: Object }
  } ]
}, {
  timestamps: true, // createdAt, updatedAt
  _id: false        // Without this, express-restify-mongoose strips the _id,
                    // assuming it's auto-created, but it's not since we store our own ID there
});

const LargeItems = mongoose.model('largeitems', largeSchema);

export default LargeItems;
