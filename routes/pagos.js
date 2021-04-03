var express = require('express');
var router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

var mysql = require("mysql");

var conn=mysql.createConnection({
  host: "localhost",
  database: "gym",
  user: "root",
  password: ""
})

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
  pagos=[];
  conn.query("select a.id_pago, a.id_socio, b.nombre, a.fecha_a_pagar, a.fecha_pago, a.fecha_sig_pago, a.monto from pagos a, socio b where b.id_socio=a.id_socio", function(error, results, fields){
      if (error){
          console.log("error de consulta ", error);
      }else{
          results.forEach(result => {
                let d = {
                    id_pago: result.id_pago,
                    id_socio: result.id_socio,
                    nom_socio: result.nombre,
                    f_pagar: result.fecha_a_pagar,
                    f_pago: result.fecha_pago,
                    f_sigp: result.fecha_sig_pago,
                    monto: result.monto
                }
                pagos.push(d);
          });
          console.log(pagos);            
          res.json(pagos);
        }
  } );
});

module.exports = router;