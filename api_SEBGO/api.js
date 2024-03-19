const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reacttest'
});

// Route pour tester la connexion
app.get('/test-connexion', (req, res) => {
  db.connect((err) => {
    if (err) {
      res.status(500).json({ message: 'Erreur de connexion à la base de données' });
    } else {
      res.json({ message: 'Connexion à la base de données réussie' });
    }
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

// Récupération d'un model par son ID
app.get('/taches/:id', (req, res) => {
  //  Implémenter la logique de récupération d'un model par son ID
  res.json({});
});

// Mise à jour d'une tâche par son ID
app.put('/taches/:id', (req, res) => {
  // Implémenter la logique de mise à jour d'un model par son ID
  res.json({});
});

// Suppression d'une tâche par son ID
app.delete('/taches/:id', (req, res) => {
  //  Implémenter la logique de suppression d'un model par son ID
  res.status(204).send();
});

app.listen(3000);