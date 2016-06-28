var assert = require('chai').assert;
var should = require('chai').should();
var sequelizeLoader = require('../index.js');
var dbParameter = "postgresql://test1:test1@localhost/test1";
var db = sequelizeLoader.initDb(dbParameter);



describe("Test loading", function(){

  it(">> Basic", function(){
    sequelizeLoader.loadModel('./test/models');
    return db.drop().then(function(){
      return db.sync();
    }).then(function(result){
      assert.equal(Object.keys(sequelizeLoader.daos).length, 1);
      return sequelizeLoader.daos.Article.create({description:"that's a beautifull article"});
    }).then(function(article){
      should.exist(article);
      article.should.be.an('object');
      assert.equal(article.description, "that's a beautifull article");
    }).catch(function(error){
      should.not.exist(error);
    });
  });
});
