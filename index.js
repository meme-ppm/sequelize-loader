var Sequelize = require('sequelize');
var path = require('path');
var fs = require('fs');
var path = require('path');

var _daos = {};
var _db = null;
var _modules = {};

module.exports.daos = _daos;

module.exports.db = _db;

module.exports.module = _modules;

module.exports.initDb = function(dbConfig){
  _db = new Sequelize(dbConfig);
  return _db;
}

module.exports.loadModel = function(modelPath){
  fs.readdirSync(modelPath).forEach(function(name){
    var file = path.join(modelPath, name);
    var model = require('./'+file.replace('.js',''));

    if(!'tableName' in model){
      model.tableName = file.parse().name;
    }
    var defineModel = true;
    if('module' in model){
      var module = require(model.module);
      if('model' in module){
        model.model = Sequelize.Utils._.merge(module.model, model.model);
      }
      if('methods' in module){
        model.methods = Sequelize.Utils._.merge(module.methods, model.methods);
      }
      if('define' in module){
        _daos[model.name] = module.define(_db, model);
        defineModel = false;
      }
      _modules[model.name] = module;
    }
    if(defineModel){
      _daos[model.name] = _db.define(model.tableName, model.model, model.methods);
    }
  });

  Object.keys(_daos).forEach(function(key){
    var dao = _daos[key];
    if('defineRelations' in dao){
      dao.defineRelations(_daos);
    }
  })
}
