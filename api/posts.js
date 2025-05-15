const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../db.json');

module.exports = async (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  if (req.method === 'GET') {
    res.status(200).json(data.posts.reverse());
  } else if (req.method === 'POST') {
    const { message, author } = req.body;
    const newPost = {
      id: Date.now(),
      author: author || '匿名',
      message,
      comments: [],
      timestamp: new Date().toISOString()
    };
    data.posts.push(newPost);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    res.status(201).json({ success: true });
  } else {
    res.status(405).end();
  }
};