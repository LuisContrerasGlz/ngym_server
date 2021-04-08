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
  const nom= req.body.nombre;
  const val= req.body.valor;
  const id=req.body.id;
  
  console.log("-------------------------------------------");
  console.log(nom);  
  console.log(val);  
  console.log(id);  
  console.log("-------------------------------------------");


  const act_soc="update socio set "+nom+"='"+val+"' where id_socio="+id;
  console.log("-------------------------------------------");
  console.log(act_soc);  
  console.log("-------------------------------------------");
  conn.query(act_soc,function(error, results){
    if (error){
      console.log("error de consulta ", error);
    }
  });
  
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
      //console.log(socios);            
      res.json(socios);
    }
  });



})  


module.exports = router;
