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
        console.log(">>>>>>>> article!!!!")
        this.hasMany(daos.Comment);
        this.belongsTo(daos.User);
      }
    }
  }
}
