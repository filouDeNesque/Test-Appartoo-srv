const express = require('express');
const router = express.Router();
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = "schtroumpfdb";
const shtroumpfCollec = "schtroumpfs"

router.get('/ping', (_req, res) => {
    res.status(200).json({ msg: 'pong', date: new Date() });
});

router.get('/getschtroumfs', (_req, res) => {
    const horseResearch = function (db) {
        db.collection(shtroumpfCollec).find({}).toArray(function (err, result) {
            if (err) throw err;
            res.status(200).json({ horses: result });
        });
    };

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client2) => {
        let db = client2.db(dbName);
        assert.equal(null, err);
        horseResearch(db);
    });
});

router.post('/addSchtroumpf', (request) => {
    console.log(request.body);
    (async () => {
        try {
            await client.connect();
            const database = client.db(dbName);
            const collection = database.collection(shtroumpfCollec);

            const doc = {
                name: request.body.form.name,
                password: request.body.form.password,//Todo: bcrypt pour hash le mdp
                age: request.body.form.role,//Todo: Convertir en role id 
            };
            await collection.insertOne(doc);
        } finally {
            await client.close();
        }
    }
    )();
});

//Role
//Todo: getAllrole(): object{[]}

//Todo: getRoleById(id : int) return Object{}

//Todo: updateRoleByUserId(id : int) return Object{}

//Friends
//Todo: updateFriends(idUser, idFriends) return Object{}

//Todo: getAllFriendsByUserId(idUser) return Object{[]}


//demarrage 
//Todo: Si bdd < 5 user create
module.exports = router;
