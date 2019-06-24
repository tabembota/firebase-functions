//const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

'use strict';
const functions  = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

//let url = "smtps://tabembota%40gmail.com:"+encodeURIComponent('tabembotamesmo') + "@smtp.gmail.com:465";
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {

		user: 'tabembota@gmail.com',
		pass: 'tabembotamesmo'
	}
});

exports.enviarEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    //let remetente = '"TaBemBota Company" <tabembota@gmail.com>';

    //let assunto = req.body['assunto'];
    //let destinatarios = req.body['destinatarios']; // lista de e-mails destinatarios separados por ,
    //let corpo = req.body['corpo'];
    const dest = req.query.dest;
    const subject = req.query.subj;
    const corpo = req.query.corpo;

    const email = {
        from: 'Tabembota <tabembota@gmail.com>',
        to: dest,
        subject: subject,
        text: corpo
    };

    transporter.sendMail(email, (error, info) => {
        if (error) {
          return res.send(erro.toString());
        }
        return res.send('Sended')
    });
  });
});