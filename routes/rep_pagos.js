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
router.get('/', function(req, res, next) {
  rep_pagos=[];
  conn.query("select fecha_pago as fecha,format(sum(monto),2) as monto from pagos group by fecha_pago", function(error, results, fields){
      if (error){
          console.log("error de consulta ", error);
      }else{
          results.forEach(result => {
                let d = {
                    fecha: result.fecha,
                    monto: result.monto,
                }
                rep_pagos.push(d);
          });
          console.log(rep_pagos);            
          res.json(rep_pagos);
        }
  } );
});

module.exports = router;