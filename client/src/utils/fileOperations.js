// utils/fileOperations.js
//no use
import fs from 'fs';
import path from 'path';

const postsFilePath = path.join(__dirname, 'data/posts.json');
const usersFilePath = path.join(__dirname, 'data/users.json');

export const fetchPostData = async (postId) => {
  try {
    const data = JSON.parse(fs.readFileSync(postsFilePath));
    return data.find(post => post.id === postId);
  } catch (error) {
    throw new Error("Error fetching post data");
  }
};

export const fetchUserData = async (userId) => {
  try {
    const data = JSON.parse(fs.readFileSync(usersFilePath));
    return data.find(user => user.id === userId);
  } catch (error) {
    throw new Error("Error fetching user data");
  }
};

export const incrementPageViews = async (postId) => {
  try {
    const data = JSON.parse(fs.readFileSync(postsFilePath));
    const post = data.find(post => post.id === postId);
    if (post) {
      post.pageViews = (post.pageViews || 0) + 1;
      fs.writeFileSync(postsFilePath, JSON.stringify(data, null, 2));
    }
  } catch (error) {
    throw new Error("Error incrementing page views");
  }
};
