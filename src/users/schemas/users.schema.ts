
import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  fullName: {
    type:String,
    required:true
  },
  age: {
    type:Number,
    required:true
  },
  email: {
    type:String,
    unique:true,
    required:true

  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    default:'user',
    enum:['user','admin',"manger"]
}
});
