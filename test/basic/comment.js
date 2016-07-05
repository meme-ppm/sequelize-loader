var Sequelize = require('sequelize');

module.exports = {
  name:'Comment',
  tableName:'comment',
  model:{description:{type: Sequelize.STRING}},
  methods:{
    classMethods:{
      test: function(){
        return 1;
      },
      defineRelations: function(daos){
        this.belongsTo(daos.Article);
      }
    }
  }
}
