const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

const upload = multer({ storage: multer.memoryStorage() });

const extractNumbers = (text) => {
  const regex = /\d+/g;
  return text.match(regex)?.join('') || "";
};

app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const data = JSON.parse(req.file.buffer.toString());
        const processData = data.map((item) => ({
            id = item.id,
            nameNumbers: extractNumbers(item.name),
            age: extractNumbers(item.age),
        }));

        res.json(processData);
    } catch (error) {
        res.status(500).json({ error: "Invalid file format" });
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});