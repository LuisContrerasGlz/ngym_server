//https://youtu.be/nUbNn0voiBI

var express = require('express');
var router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


var mysql = require("mysql");


var conn=mysql.createConnection({
  host: "xlf3ljx3beaucz9x.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  database: "umgtiz0f2ufm2alq",
  user: "zjc8xzsr3awxyw4k",
  password: "mjmk28u3s3rlad48"
})


/*
var conn=mysql.createConnection({
    host: "localhost",
    database: "gym",
    user: "root",
    password: ""
  })
*/

conn.connect(function(error){
  if (error){
      console.log("coneccion con error", error);
      //throw error;
  }else{
      console.log("coneccion existosa");
  }
})



/* GET users listing. */
router.post('/', function(req, res, next) {
  socios=[];
  const id= req.body.id;
  const monto= req.body.monto;
  const np= req.body.np;
  console.log("-------------------------------------------");
  console.log(id);  
  console.log("-------------------------------------------");


  const ins_soc="insert into pagos (id_socio, monto, fecha_sig_pago)";
  const ins_soc2=ins_soc+"values ('"+id+"',"+monto+",'"+np+"')" ;
  console.log("fffffffffffffffffffff-------------------------------------------");
  console.log(ins_soc2);  
  console.log("ffffffffffffffffffff-------------------------------------------");
  conn.query(ins_soc2,function(error, results){
    if (error){
      console.log("error de consulta ", error);
    }
  });
  res.json({});
  });
module.exports = router;