import { Schema, model, Types, Document } from 'mongoose';
import { ThoughtDocument } from './Thought';

export interface UserDocument extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[] | ThoughtDocument[];
  friends: Types.ObjectId[] | UserDocument[];
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},
{
  toJSON: { virtuals: true },
  id: false
});


userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

export const User = model<UserDocument>('User', userSchema);
