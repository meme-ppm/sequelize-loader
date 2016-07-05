var Sequelize = require('sequelize');

module.exports = {
  name:'Article',
  tableName:'article',
  model:{description:{type: Sequelize.STRING}},
  methods:{
    classMethods:{
      test: function(){
        return 1;
      },
      defineRelations: function(daos){
        this.hasMany(daos.Comment);
      }
    }
  }
}
