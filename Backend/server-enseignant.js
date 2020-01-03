var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    methodOverride = require("method-override"),
    cors = require("cors");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.use(cors());

const enseignants = require('./routes/api/enseignants');
app.use('/api/enseignants', enseignants);


var enseignantSchema = new Schema({
        nom: String,
        prenom: String,
        matricule: String
    }),
    Enseignant = mongoose.model("enseignants", enseignantSchema);

mongoose.connect("mongodb://localhost/esi_edu_tp");

app.get("/", function(request, response) {
    response.render("test.ejs");
})

app.get("/api/enseignants", function(request, response) {
    Enseignant.find({}, function(error, enseignantsTrouves) {
        if (error) {
            console.log("Error in retrieving from the database");
        } else {
            response.send(enseignantsTrouves);
        }
    })
})


app.get("/api/enseignants/:enseignant", function(request, response) {
    Enseignant.find({matricule: request.params.enseignant}, function(error, enseignant) {
        if (error) {
            console.log(error);
        } else {
            response.send(enseignant);
        }
    })
})


app.post("/api/enseignants/new", function(request, response) {
    let nouveauEnseignant = new Enseignant({
        nom: request.body.nom,
        prenom: request.body.prenom,
        matricule: request.body.matricule
    })
    nouveauEnseignant.save(function(error) {
        if (error) {
            console.log(error);
        } else {
            response.redirect("/api/enseignants")
        }
    })
})


app.delete("/api/enseignants/:enseignant/delete", function(request, response) {
    Enseignant.findOneAndRemove({matricule: request.params.enseignant}, function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Deleted successfully");
            response.redirect("/api/enseignants");
        }
    })
})


app.listen("4000", function() {
    console.log("Server started on port 4000");
})