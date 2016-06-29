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
      assert.equal(Object.keys(sequelizeLoader.daos).length, 2);
      return sequelizeLoader.daos.Article.create({description:"that's a beautifull article"});
    }).then(function(article){
      should.exist(article);
      article.should.be.an('object');
      assert.equal(article.description, "that's a beautifull article");
      return sequelizeLoader.daos.Comment.create({description: "it's a comment", articleId: article.id})
    }).then(function(comment){
      should.exist(comment);
      comment.should.be.an('object');
      assert.equal(comment.description, "it's a comment");
      return sequelizeLoader.daos.Article.findOne({include:{model: sequelizeLoader.daos.Comment}});
    }).then(function(article){
      should.exist(article);
      article.should.be.an('object');
      article = article.get({plain:true});
      assert.equal(article.comments.length, 1);
      var comment = article.comments[0];
      assert.equal(comment.description, "it's a comment");
    }).catch(function(error){
      console.log("error ", error);
      should.not.exist(error);
    });
  });
});
