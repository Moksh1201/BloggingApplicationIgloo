const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'vG7yL*4s&uVxwRmd@M!z9^Tj0Q$e6H5'; 

const usersFilePath = path.join(__dirname, '../data/users.json');
const adminFilePath = path.join(__dirname, '../data/admin.json');

// Helper function to read data from a JSON file
const readDataFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write data to a JSON file
const writeDataToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

// Register a new user
const registerUser = async (userData) => {
  try {
    console.log('Registering user:', userData);
    const { username, email, password, isAdmin = false } = userData;
    const filePath = isAdmin ? adminFilePath : usersFilePath;
    const users = readDataFromFile(filePath);

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      isAdmin
    };

    users.push(newUser);
    writeDataToFile(filePath, users);

    console.log('User registered:', newUser);
    
    // Login the user to generate a token
    const { token } = await loginUser(email, password);

    return { user: newUser, token };
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};


// Authenticate a user (can be done for both regular and admin users)
const loginUser = async (email, password) => {
  // Check both the regular users and admin users files
  let users = readDataFromFile(usersFilePath);
  let user = users.find(u => u.email === email);

  // If not found in regular users, check in admin users
  if (!user) {
    users = readDataFromFile(adminFilePath);
    user = users.find(u => u.email === email);
  }

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });

  // Return the user along with the token
  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};
