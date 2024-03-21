const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const winston = require('winston');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reacttest',
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


const config = require('./api.js');
let user = {};



function generateToken(us){
  return jwt.sign(us, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
}

// Configuration de winston
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'app.log' }),
  ],
});


app.use(bodyParser.json());
app.use(cors());



// Route pour tester la connexion
app.get('/test-connexion', (req, res) => {
  db.connect((err) => {
    if (err) {
      logger.error('Erreur de connexion à la base de données');
      res.status(500).json({ message: 'Erreur de connexion à la base de données' });
    } else {
      logger.info('Connexion à la base de données réussie');
      res.json({ message: 'Connexion à la base de données réussie' });
    }
  });
});

app.get('/jwt', (req, res) => {
  const createTokenFromJson = (jsonData, options = {}) => {
    try {
      const secretKey = 'test';
      const token = jwt.sign(jsonData, secretKey, options);
      return token;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const jsonData = { username: 'caca', password: 'pipi' };
  const token = createTokenFromJson(jsonData);

  if (token) {
    res.json({ status: true, token: token });
  } else {
    res.json({ status: false });
  }
});

//fonction dit middleware (permet de verifier l'état du token avant d'aller récupérer les informations pour notre utilisateur )
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
}



// permet de faire une requête sql sans passer par une route express.
allUser = () =>{
  return new Promise((resolve, reject)=>{
      config.query('SELECT * FROM User', (error, users)=>{
          if(error){
              return reject(error);
          }
          //une petite manipulation de donnée pour éviter des soucis de format par la suite.
          return resolve(users[0]);
      });
  });
};

// Route de login
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Vérification si l'utilisateur existe dans la base de données
  const checkUserQuery = 'SELECT * FROM User WHERE username = ? AND password = ?';
  db.query(checkUserQuery, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la vérification de l'utilisateur");
      return;
    }

    if (results.length === 0) {
      res.status(401).send("Nom d'utilisateur ou mot de passe incorrect");
      return;
    }

    // Authentification réussie, génération du token
    const user = { id: results[0].id, username: results[0].username };
    const token = generateToken(user);

    res.json({ token });
  });
});

// Liste des modele
app.get('/modele', (req, res) => {
 
    const query = "SELECT * FROM modele";

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur lors de la récupération des modèles");
            return;
        }
    res.json(results);
    });
});

// Création d'un model
app.post('/createModel', (req, res) => {
    const { marque, année, model, tarif, photo } = req.body;
    const query = "INSERT INTO modele (marque, année, model, tarif, photo) VALUES (?, ?, ?, ?, ?)";

    db.query(query, [marque, année, model, tarif, photo], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur lors de la création du modèle");
            return;
        }
        res.status(201).json(results);
    });
});
 //route qui permet de verifier avec un token valid retour de user.
 app.get('/me', authenticateToken, (req, res) => {
  res.send(req.user);
});

// exemple de route qui permet de retourner une liste de jeux pour un utilisateur possedant un token valid
app.get('/modele', authenticateToken, (req,res) => {
  let sql = "SELECT * FROM modele";
  config.query(sql,(err, results) =>{
    if(err) throw err;
    console.log(results);
    res.json({results});
  })

})
// Route d'enregistrement d'un utilisateur
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Vérification si l'utilisateur existe déjà dans la base de données
  const checkUserQuery = 'SELECT * FROM User WHERE username = ?';
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la vérification de l'utilisateur");
      return;
    }

    if (results.length > 0) {
      res.status(409).send("L'utilisateur existe déjà");
      return;
    }

    // Insertion de l'utilisateur dans la base de données
    const insertUserQuery = 'INSERT INTO User (username, password) VALUES (?, ?)';
    db.query(insertUserQuery, [username, password], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de l'enregistrement de l'utilisateur");
        return;
      }

      res.status(201).send("Utilisateur enregistré avec succès");
    });
  });
});


app.listen(3000);