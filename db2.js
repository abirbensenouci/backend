import express, { json } from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());


const db = createConnection({
  host: "localhost",
  user: 'root',
  password: "",
  database: 'miniprojet'
});



app.post('/sign', (req, res) => {
  const { name, email, password, code_barrau } = req.body;
  const sql = "INSERT INTO compte (email,password_compte) VALUES (?, ?)";
  const values = [
    req.body.email,
    req.body.password
  ]; 
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ Message: "Error in node.... " });
    }
    const idcom = `SELECT id_compte FROM compte WHERE email=? and password_compte=?`;
    const idcomValues = [
      req.body.email,
      req.body.password
    ];
    db.query(idcom, idcomValues, (err, result) => {
      if (err) {
        return res.json({ Message: "Error in node.... " });
      }
      const id_compte = result[0].id_compte;
      if (!code_barrau) {
        const sql3 = "INSERT INTO client (nom_cl,prenom_cl,idcompte) VALUES (?, ?, ?)";
        const values3 = [
          req.body.name,
          req.body.prenom,
          id_compte
        ];
        db.query(sql3, values3, (err, result) => {
          if (err) {
            return res.json({ Message: "Error in node.... " });
          }
          return res.json(result);
        });
      }  else {
        const sql2 = "INSERT INTO avocat (code_barrau,nom_av,prenom_av,idcompte) VALUES (?, ?, ?, ?)";
        const values2 = [
          req.body.code_barrau,
          req.body.name,
          req.body.prenom,
          id_compte
        ];
        db.query(sql2, values2, (err, result) => {
          if (err) {
            return res.json({ Message: "Error in node.... " });
          }
          return res.json(result);
        });
      }
    });
  });
});


 



app.post('/log', (req, res) => {
    
  const sql = "SELECT * FROM compte WHERE email= ?  and  password_compte= ?";
   
  db.query(sql, [req.body.email,req.body.password], (err, result) => {
    if (err) 
      return res.json({ Message: "Error in node.... " });
    if(result.length>0){
        return res.json({Login:true})
     }else{
      return res.json({Login:false})
     }

});

});



app.listen(8081, () => {
  console.log("running.........");
});

