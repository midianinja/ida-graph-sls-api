import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

ObjectId.prototype.valueOf = function foo() {
  return this.toString();
};

const userSchema = new Schema(
  {
    ida_id: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_image: {
      mimified: { type: String, default: '' },
      original: { type: String, default: '' },
      thumbnail: { type: String, default: '' },
    },
    address: { type: ObjectId, ref: 'adresses' },
  },
  {
    timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
  },
);

export default userSchema;
