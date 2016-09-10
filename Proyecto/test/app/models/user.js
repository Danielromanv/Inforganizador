/**
 * Created by Felipe on 06-09-2016.
 */

/**Falta Arreglar los metodos de hasheo de claves**/
//var bcrypt = require('bcrypt-nodejs');
var userSchema =  {
    User:{
        Username:{type: 'varchar', maxLength: 64, nullable: false, primary: true},
        Password:{type: 'varchar', maxLength: 64, nullable: false},
        /**Nombre:{type: 'varchar', maxLength: 32, nullable:false},
        Apellido:{type: 'varchar', maxLength: 64, nullable: false},
        Email:{type: 'varchar', maxLength: 64, nullable: false},
        Tipo_aprendiaje:{type: 'integer', nullable: false},
        Tipo_usuario:{type: 'integer', nullable: false}**/
    }
}

//userSchema.methods.generateHash = function(password) {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};

// checking if password is valid
//userSchema.methods.validPassword = function(password) {
//    return bcrypt.compareSync(password, this.local.password);
//};

module.exports = userSchema;