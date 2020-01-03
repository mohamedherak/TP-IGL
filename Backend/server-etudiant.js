var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    methodOverride = require("method-override");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"));

var etudiantSchema = new Schema({
    nom: String,
    prenom: String,
    matricule: String
}),
    Etudiant = mongoose.model("etudiants", etudiantSchema);

mongoose.connect("mongodb://localhost/esi_edu_tp");

app.get("/", function(request, response) {
    response.render("test.ejs");
})

app.get("/api/etudiants", function(request, response) {
    Etudiant.find({}, function(error, etudiantsTrouves) {
        if (error) {
            console.log("Error in retrieving from the database")
        } else {
            response.send(etudiantsTrouves);
        }
    })
})


app.get("/api/etudiants/:etudiant", function(request, response) {
    Etudiant.find({matricule: request.params.etudiant}, function(error, etudiant) {
        if (error) {
            console.log(error);
        } else {
            response.send(etudiant);
        }
    })
})

app.post("/api/etudiants/new", function(request, response) {
    let nouveauEtudiant = new Etudiant({
        nom: request.body.nom,
        prenom: request.body.prenom,
        matricule: request.body.matricule
    })
    nouveauEtudiant.save(function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Fat");
            response.redirect("/api/etudiants");
        }
    })
})

app.delete("/api/etudiants/:etudiant/delete", function(request, response) {
    Etudiant.findOneAndRemove({matricule: request.params.etudiant}, function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Deleted successfully");
            response.redirect("/api/etudiants");
        }
    })
})


app.listen("4001", function() {
    console.log("Server started on port 4001");
})