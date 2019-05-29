import mongoose from 'mongoose'
let ObjectId = mongoose.Schema.Types.ObjectId

let _schema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    friends: [{ type: ObjectId, ref: 'user' }]
}, { timestamps: true })

export default class UserService {
    get repository() {
        return mongoose.model('user', _schema)
    }
}