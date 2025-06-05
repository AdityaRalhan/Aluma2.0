import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email : {type: String , required: true, unique: true},
    password : {type: String , required: true},
    name: {type: String, default: ''},
    occupation: {type: String, default: ''},
    age: Number,
    gender : String,
    createdAt: { type: Date, default: Date.now },
    Physical_Activity: { type: String, default: '' },
    Current_Medication: { type: String, default: '' },
    journalEntries: [{
        entry: String,
        date: Date,
        mood: String
      }],
    relaxing_songs: [String], // Assuming relaxing_songs is an array of strings
    trustedContacts: [{
        name: String,
        phone: String,
        relationship: String
      }],
      
})

// export default mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema);
export default User;