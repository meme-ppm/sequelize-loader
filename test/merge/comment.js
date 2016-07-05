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
        console.log(">>>>>>>> Comment!!!!")
        this.belongsTo(daos.Article);
        this.belongsTo(daos.User);
      }
    }
  }
}
