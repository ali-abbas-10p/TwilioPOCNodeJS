'use strict';

let dbm;
let type;
let seed;

exports.setup = (options, seedLink)=>{
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = db => {
  return db.createTable('users',{
      id:{type:'bigint', primaryKey:true, autoIncrement:true,notNull:true},
      full_name:{type:'varchar',length:100,notNull:true},
      email:{type:'varchar',length:150,notNull:true},
      password:{type:'varchar',length:200,notNull:true},
      profile_image:{type:'varchar',length:200,notNull:false},
      token:{type:'varchar',length:16,notNull:true},
      updated_on:{type:'datetime',defaultValue:'CURRENT_TIMESTAMP',notNull:true,onUpdate:true},
      created_on:{type:'datetime',defaultValue:'CURRENT_TIMESTAMP',notNull:true}
  }).then(()=>{
      return db.runSql('ALTER TABLE `AcademicsProvider`.`users` CHANGE `updated_on` `updated_on` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;');
  });
};

exports.down = db => {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
