const express = require("express");
const db = require("../Zithara-task/models");
const models = require("../Zithara-task/models"); 
const app = express();


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



const PORT = 8080;
app.listen(PORT, () => {
    db.sequelize.sync({ force: false }).then(() => {
        console.log("data base has been started");
      });

  console.log(`Server is running on port ${PORT}.`);
});

app.get('/users', async (req, res) => {
  try {
    const users = await models.users.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});