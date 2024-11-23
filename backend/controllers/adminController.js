// const fs = require('fs');
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');
// const adminsFilePath = path.join(__dirname, '../data/admins.json');


// const readDataFromFile = () => {
//   const data = fs.readFileSync(adminsFilePath);
//   return JSON.parse(data);
// };

// const writeDataToFile = (data) => {
//   fs.writeFileSync(adminsFilePath, JSON.stringify(data, null, 2));
// };

// const getAdmins = (req, res) => {
//   const admins = readDataFromFile();
//   res.status(200).json(admins);
// };

// const addAdmin = (req, res) => {
//   const { username, email } = req.body;
//   const admins = readDataFromFile();

//   const newAdmin = {
//     id: uuidv4(),
//     username,
//     email,
//   };

//   admins.push(newAdmin);
//   writeDataToFile(admins);

//   res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
// };

// const removeAdmin = (req, res) => {
//   const { id } = req.params;
//   const admins = readDataFromFile();

//   const newAdmins = admins.filter(a => a.id !== id);

//   if (admins.length === newAdmins.length) {
//     return res.status(404).json({ message: 'Admin not found' });
//   }

//   writeDataToFile(newAdmins);
//   res.status(200).json({ message: 'Admin removed successfully' });
// };

// module.exports = {
//   getAdmins,
//   addAdmin,
//   removeAdmin,
// };
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');
const adminsFilePath = path.join(__dirname, '../data/admins.json');
const usersFilePath = path.join(__dirname, '../data/users.json');
const postsFilePath = path.join(__dirname, '../data/posts.json');
const campaignsFilePath = path.join(__dirname, '../data/campaigns.json');

const SECRET_KEY = "gcr#eH45TU%BNh8$h5T!F765$7B5gh65f@&d4f";
const JWT_SECRET = "vG7yL*4s&uVxwRmd@M!z9^Tj0Q$e6H5"; 

// Fetch all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await readJSONFile(adminsFilePath);
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admins' });
  }
};

const addAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized. Only admins can add other admins.' });
  }

  try {
    const users = await readJSONFile(usersFilePath); 
    if (!Array.isArray(users)) {
      return res.status(500).json({ message: 'Data format is incorrect. Expected array of users.' });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    const existingUsername = users.find(user => user.username === username);
    if (existingUsername) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      isAdmin: true, 
      followers: [],
      following: [],
      isPrivate: false, 
    };

    users.push(newAdmin);
    await writeJSONFile(usersFilePath, users); 

    return res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ message: 'Failed to add admin' });
  }
};


// // Admin login
// const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admins = await readJSONFile(adminsFilePath);

//     const admin = admins.find(admin => admin.email === email);
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found.' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, admin.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid password.' });
//     }

//     const token = jwt.sign({ id: admin.id, role: admin.role }, JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to log in' });
//   }
// };

// Middleware to check if the admin is authenticated
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    req.admin = decoded; 
    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};

// Check if a user is an admin
const checkIfAdmin = async (userId) => {
  try {
    const users = await readJSONFile(usersFilePath);
    const user = users.find(user => user.id === userId);
    return user && user.role === 'admin';
  } catch (err) {
    throw new Error('Failed to check if user is admin');
  }
};

// Remove an admin
const removeAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admins = await readJSONFile(adminsFilePath);

    const adminIndex = admins.findIndex(admin => admin.id === id);
    if (adminIndex === -1) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    admins.splice(adminIndex, 1);
    await writeJSONFile(adminsFilePath, admins);

    res.status(200).json({ message: 'Admin removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove admin' });
  }
};

// Fetch all users (accessible only by admins)
const getAllUsers = async (req, res) => {
  try {
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin only' });
    }

    const users = await readJSONFile(usersFilePath); 
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Fetch all posts (accessible only by admins)
const getAllPosts = async (req, res) => {
  try {
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin only' });
    }

    const posts = await readJSONFile(postsFilePath);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

// Remove a post (accessible only by admins)
const removePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const posts = await readJSONFile(postsFilePath);

    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    posts.splice(postIndex, 1);
    await writeJSONFile(postsFilePath, posts);

    res.status(200).json({ message: 'Post removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove post' });
  }
};


module.exports = {
  getAdmins,
  addAdmin,
  authenticateAdmin,
  removeAdmin,
  getAllUsers,
  getAllPosts,
  removePost,
  checkIfAdmin
};