var supertest = require("supertest");
var should = require("should");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:4000");
var enseignantSchema = new Schema({
        nom: String,
        prenom: String,
        matricule: String
    }),
    Enseignant = mongoose.model("enseignants", enseignantSchema);

mongoose.connect("mongodb://localhost/esi_edu_tp");

var listeEnseignants = [];


    console.log(listeEnseignants);


// UNIT test begin

describe("Enseignants show test unit",function(){

  // #1 should return home page

  it("should return the list of the enseignants",function(done){
    server
    .get("/api/enseignants")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      //res.body.error.should.equal(false);
      //res.body.should.equal(listeEnseignants);
      Enseignant.find({}, function(error, enseignants){
        if (error) {
          console.log(error);
        } else { 
          JSON.stringify(res.body).should.equal(JSON.stringify(enseignants));
          }
      })

      
      done();
    });
  });
});

     
