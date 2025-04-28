import { Schema, model, Document } from 'mongoose';
import { reactionSchema, ReactionDocument } from './Reaction';

export interface ThoughtDocument extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: ReactionDocument[];
}

const thoughtSchema = new Schema<ThoughtDocument>(
    {
      thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
      createdAt: {
        type: Date,
        default: Date.now,
         
      },
      username: { type: String, required: true },
      reactions: [reactionSchema],
    },
    {
      toJSON: { virtuals: true, getters: true },
      id: false,
    }
  );

thoughtSchema.virtual('reactionCount').get(function (this: ThoughtDocument) {
  return this.reactions.length;
});

export const Thought = model<ThoughtDocument>('Thought', thoughtSchema);
