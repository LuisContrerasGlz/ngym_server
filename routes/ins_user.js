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
  const tel= req.body.tel;
  const ema= req.body.email;
  const dir= req.body.dir;
  const col= req.body.col;
  const ciu= req.body.ciu;
  const edo= req.body.edo;
  const cod= req.body.cod;
  const md= req.body.md;
  const sp= req.body.sp;
  const pe= req.body.pe;
  const pa= req.body.pa;
  console.log("-------------------------------------------");
  console.log(nom);  
  console.log("-------------------------------------------");


  const ins_soc="insert into socio (Nombre, Telefono, Correoe, Direccion, Colonia, Ciudad, Estado, Codpos, Miembro_desde, Ultimo_pago, siguiente_pago, periodo)";
  const ins_soc2=ins_soc+"values ('"+nom+"','"+tel+"','"+ema+"','"+dir+"','"+col+"','"+ciu+"','"+edo+"','"+cod+"','"+md+"','"+md+"','"+sp+"','"+pe+"')" ;
  console.log("-------------------------------------------");
  console.log(ins_soc2);  
  console.log("-------------------------------------------");
  conn.query(ins_soc2,function(error, results){
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
