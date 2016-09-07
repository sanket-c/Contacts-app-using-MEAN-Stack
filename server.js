var express = require("express");
var mongodb = require("mongodb");
var ObjectId = mongodb.ObjectId;
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/getContacts", function(request, response) {
    console.log("Received a get request.");
    var MongoClient = mongodb.MongoClient;
    var db_url = "mongodb://localhost:27017/contactsDB";
    MongoClient.connect(db_url, function(err, db) {
        if(err) {
            response.send("Failed to connect to MongoDB in getContacts.");
        }
        else {
            console.log("Connected to MongoDB in getContacts.");
            var collection = db.collection("contacts");
            collection.find({}).toArray(function(err, data) {
                if(err) {
                    console.log("Failed to get data.", err);
                    response.send([]);
                }
                else if(data.length) {
                    response.send(data);
                }
                else {
                    console.log("No Data Found.");
                    response.send([]);
                }
                db.close();
            });
        }
    });
});

app.get("/getContact/:id", function(request, response) {
    var id = request.params.id;
    console.log("Received a get request : " + id);
    var MongoClient = mongodb.MongoClient;
    var db_url = "mongodb://localhost:27017/contactsDB";
    MongoClient.connect(db_url, function(err, db) {
        if(err) {
            response.send("Failed to connect to MongoDB in getContact.");
        }
        else {
            console.log("Connected to MongoDB in getContact.");
            var collection = db.collection("contacts");
            collection.find({"_id": new ObjectId(id)}).toArray(function(err, data) {
                if(err) {
                    console.log("Failed to get data.", err);
                    response.send([]);
                }
                else if(data.length) {
                    response.send(data);
                }
                else {
                    console.log("No Data Found.");
                    response.send([]);
                }
                db.close();
            });
        }
    });
});

app.post("/addContact", function(request, response) {
    console.log(request.body);
    var MongoClient = mongodb.MongoClient;
    var db_url = "mongodb://localhost:27017/contactsDB";
    MongoClient.connect(db_url, function(err, db) {
        if(err) {
            response.send("Failed to connect to MongoDB in addContact.", err);
        }
        else {
            console.log("Connected to MongoDB in addContact.");
            var collection = db.collection("contacts");
            var contact = {
                name: request.body.name, 
                email: request.body.email, 
                contact: request.body.contact
            };
            collection.insert([contact], function (err, result) {
                if (err) {
                    console.log(err);
                } 
                else {
                    response.json(result);
                }
                db.close();
            });
        }
    });
});

app.delete("/deleteContact/:id", function(request, response) {
    var id = request.params.id;
    console.log(id);
    var MongoClient = mongodb.MongoClient;
    var db_url = "mongodb://localhost:27017/contactsDB";
    MongoClient.connect(db_url, function(err, db) {
        if(err) {
            response.send("Failed to connect to MongoDB in deleteContact.", err);
        }
        else {
            console.log("Connected to MongoDB in deleteContact.");
            var collection = db.collection("contacts");
            var contact = {
                name: request.body.name, 
                email: request.body.email, 
                contact: request.body.contact
            };
            collection.remove({"_id": new ObjectId(id)}, function (err, result) {
                if (err) {
                    console.log(err);
                } 
                else {
                    response.json(result);
                }
                db.close();
            });
        }
    });
});

app.post("/updateContact", function(request, response) {
    console.log(request.body);
    var MongoClient = mongodb.MongoClient;
    var db_url = "mongodb://localhost:27017/contactsDB";
    MongoClient.connect(db_url, function(err, db) {
        if(err) {
            response.send("Failed to connect to MongoDB in updateContact.", err);
        }
        else {
            console.log("Connected to MongoDB in updateContact.");
            var collection = db.collection("contacts");
            var id = request.body._id;
            var contact = {
                name: request.body.name, 
                email: request.body.email, 
                contact: request.body.contact
            };
            collection.update({"_id": new ObjectId(id)}, contact, function (err, result) {
                if (err) {
                    console.log(err);
                } 
                else {
                    response.json(result);
                }
                db.close();
            });
        }
    });
});

app.listen(3000);
console.log("Server Running..!!!");