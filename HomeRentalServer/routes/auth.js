const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const User = require('../models/User');

// Multer configuration for file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");  // save the files in the public/uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)  // use the original name of the file
  }
});

const upload = multer({ storage: storage });

// User registration

router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    // take all information from the form

    const { firstName, lastName, email, password } = req.body;

    // the uploaded file is saved in req.file

    const profileImage = req.file
    if (!profileImage) {
      return res.status(400).send("Please upload a profile image");
    }

    // path to the uploaded profile image
    const profileImagePath = profileImage.path;

    // check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    // save the new user
    await newUser.save();

    // send a success message
    res.status(200).json({ message: "User Registered successfully", user: newUser });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    // take the information from the form
    const {email, password} = req.body
    // check if user exist
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({message: "user aleady exist!"});
    }

    // compare the password with the hased password
   const isMatch = await bcrypt.compare(password, user.password)
   if (!isMatch) {
    return res.status(400).json({message: "Invalid credentials"})
   }

   // generate JWT token

   const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
   delete user.password

   res.status(200).json({token, user})

  } catch (err) {
    console.log(err)
    res.status(500).json({error: err.message})
  }
})



module.exports = router;


