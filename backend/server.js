const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const MONGODB_URI = 'mongodb+srv://kathojumanoj48:8j7MMWHRuBA5EsTS@manoj.uhq5r.mongodb.net/'; // Replace with your MongoDB URI

const app = express();
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Call the connectDB function
connectDB();

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique:true, required:true},
    phno: String,
    password: String,
  });
  
  // Create a User model
  const User = mongoose.model('Customers', userSchema);

  const bookingSchema = new mongoose.Schema({
    userEmail: { type: String, required: true  }, // Changed from email to userEmail
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    classType: { type: String, required: true },
    ticketCount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    selectedDate: { type: String, required: true },
    selectedTime: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  
  const Booking = mongoose.model('flightBooking', bookingSchema);
  
  // POST Route: To save booking details
  app.post('/bookings', async (req, res) => {
    console.log(req.body);
    try {
      const { userEmail,departure, arrival, classType, ticketCount, totalAmount, selectedDate,selectedTime } = req.body;
  
      // Validate input
      if (!userEmail || !departure || !arrival || !classType || !ticketCount || !totalAmount || !selectedDate) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Create a new booking
      const newBooking = new Booking({
        userEmail,
        departure,
        arrival,
        classType,
        ticketCount,
        totalAmount,
        selectedDate,
        selectedTime,
      });
  
      // Save to database
      await newBooking.save();
  
      res.status(201).json({ message: 'Booking saved successfully!', booking: newBooking });
    } catch (error) {
      console.error('Error saving booking:', error.message);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });
  
 // GET Route: Fetch all bookings by email
app.get('/bookings', async (req, res) => {
    try {
      const { userEmail } = req.query;
    console.log("Getting all booking ");
    console.log(userEmail);
      // Validate input
      if (!userEmail) {
        return res.status(400).json({ message: 'Email is required.' });
      }
  
      // Fetch bookings with the matching email
      const bookings = await Booking.find({ userEmail });
      console.log(bookings);
  
      // Respond with the booking details
      res.status(200).json({ bookings });
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });
  

app.get('/', (req, res) => {
  res.send('Backend is running! Manojj...');
});


app.post('/signup', async (req, res) => {
    console.log(req.body);
    // res.send(req.body);

    const { username, email, phno, password } = req.body;

  try {
    // Check for missing fields
    if (!username || !email || !phno || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: 'Already there account..' });
    }
    // Create a new user
    const newUser = new User({
      username,
      email,
      phno,
      password,
    });

    // Save user to the database
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }

    // res.status(201).json({ message: 'User registered successfully!' });

});


app.post("/login",async (req,res)=>{

    const { email, password } = req.body;
    console.log(email);
    try {
        // Check for missing fields
        if (!email || !password) {
          return res.status(400).json({ message: 'Email and Password are required.' });
        }
    
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password.' });
        }
        const isMatch = password === user.password;
    
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password.' });
        }
    
        res.status(200).json({ message: 'Login successful!', user: { email: user.email, username: user.username } });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
      }
    

})

app.listen(PORT,(error)=>{
    if(!error)
    {
        console.log("Server is ruuningg");
    }
    else
        console.log("Server is failed");
})
