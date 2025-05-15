const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../db.json');
const ADMIN_PASS = "123456";

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { password, id } = req.body;
    if (password !== ADMIN_PASS) {
      return res.status(403).json({ error: '密码错误' });
    }

    const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    data.posts = data.posts.filter(p => p.id !== id);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
};