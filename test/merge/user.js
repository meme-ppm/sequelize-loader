var Sequelize = require('sequelize');

module.exports = {
  name:'User',
  tableName:'user',
  model:{description:{type: Sequelize.STRING}},
  module:'sequelize-user',
  options:{
          email:{
            send: false,
            debug:true
          }
  },
  methods:{
    classMethods:{
      defineRelations: function(daos){
        this.hasMany(daos.Article);
        this.hasMany(daos.Comment);
      }
    }
  }
}
