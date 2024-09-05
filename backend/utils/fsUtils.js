const fs = require('fs');
const path = require('path');

// Define the base directory for storage
const BASE_DIR = path.join(__dirname, '../data');

// Ensure the base directory exists
if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR);
}

// Utility function to get the file path for a specific collection and ID
const getFilePath = (collectionName, id) => {
  return path.join(BASE_DIR, `${collectionName}-${id}.json`);
};

// Function to read data from a file
const readFromFile = (collectionName, id) => {
  const filePath = getFilePath(collectionName, id);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return null;
};

// Function to write data to a file
const writeToFile = (collectionName, id, data) => {
  const filePath = getFilePath(collectionName, id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Function to delete a file
const deleteFile = (collectionName, id) => {
  const filePath = getFilePath(collectionName, id);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Function to list all files in a directory
const listFiles = (collectionName) => {
  const dirPath = path.join(BASE_DIR);
  return fs.readdirSync(dirPath).filter(file => file.startsWith(collectionName));
};

module.exports = {
  readFromFile,
  writeToFile,
  deleteFile,
  listFiles
};
