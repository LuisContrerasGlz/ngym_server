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
  socios=[];
  conn.query("select id_socio,Nombre, Telefono, Correoe, Direccion, Colonia, Ciudad, Estado, Codpos, Miembro_desde, Ultimo_pago, siguiente_pago, periodo, estatus from socio", function(error, results, fields){
      if (error){
          console.log("error de consulta ", error);
      }else{
          results.forEach(result => {
              let d = {
                         id: result.id_socio,
                         name_c: result.Nombre,
                         tel: result.Telefono,
                         email: result.Correoe,
                         dir: result.Direccion,
                         col: result.Colonia, 
                         city: result.Ciudad, 
                         state: result.Estado, 
                         cp: result.Codpos, 
                         md: result.Miembro_desde, 
                         lp: result.Ultimo_pago, 
                         np: result.siguiente_pago, 
                         per: result.periodo, 
                         stat: result.estatus
                      }
                      //console.log(d);
              socios.push(d);
          });
          console.log(socios);            
          res.json(socios);
        }
  } );
  

});

module.exports = router;
