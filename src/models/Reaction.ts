import { Schema, Types, Document } from 'mongoose';


export interface Reaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}


export interface ReactionDocument extends Reaction, Document {}

export const reactionSchema = new Schema<Reaction>(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => timestamp.toISOString() as unknown as Date, 
      },
    },
    {
      toJSON: { getters: true },
      id: false,
    }
  );
