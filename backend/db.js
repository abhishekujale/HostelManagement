require('dotenv').config();

const mongoose = require('mongoose');

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI).then((data) => {
    console.log("connected to MongoDB");
});

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, minLength: 3, maxLength: 30 },
    password: { type: String, required: true, minLength: 6 },
    firstName: { type: String, required: true, trim: true, maxLength: 50 },
    lastName: { type: String, required: true, trim: true, maxLength: 50 },
    role: { type: String, enum: ["User", "Owner"] },
    gender: { type: String, enum: ["Male", "Female", "Other"] }
});

const ownerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, minLength: 3, maxLength: 30 },
    password: { type: String, required: true, minLength: 6 },
    firstName: { type: String, required: true, trim: true, maxLength: 50 },
    lastName: { type: String, trim: true, maxLength: 50 },
    role: { type: String, enum: ["User", "Owner"] },
});

const hostelSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
    hostelName: { type: String, required: true },
    area: { type: String, enum: ['Near Kit college', 'ST colony', 'Near Main Gate', 'Bharati Vidyapeeth'], required: true },
    rooms: { type: Number, required: true },
    sharing: { type: Number, required: true },
    totalStudents: { type: Number, required: true },
    price: { type: Number, required: true },
    contact: { type: Number, required: true },
    hotWater: { type: String, enum: ["yes", "no"], required: true },
    wifi: { type: String, enum: ["yes", "no"], required: true },
    ventilation: { type: String, enum: ["yes", "no"], required: true },
    drinkingWater: { type: String, enum: ["yes", "no"], required: true },
    vacancy: { type: String, enum: ["fill", "vacant"], required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    imageUrls: [String], // Added this line from the master branch
});

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Owner = mongoose.model('owner', ownerSchema);
const User = mongoose.model('user', userSchema);
const Hostel = mongoose.model('hostel', hostelSchema);
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = {
    User,
    Owner,
    Hostel,
    Notification
};
