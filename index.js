const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3010
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    //host: "smtp.ethereal.email",
    //port: 587,
    //secure: false, // true for 465, false for other ports
    //requireTLS: true,
    //tls:  {ciphers: 'SSLv3'},
    //requireTLS:true,
   //host: 'smtppro.zoho.in',

    auth: {
        user: 'mayameneger@gmail.com', // @gmail.com generated ethereal user
        pass: 'MayaRiff19051991', // generated ethereal password
    },
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {

    let {email, name, subject, message}=req.body
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `My profile page`, // sender address
        to: "79027972026@yandex.ru", // list of receivers
        subject: `Сообщение из портфолио`, // Subject line
        //text: "Hello world?", // plain text body
        html: `<b>Сообщение из портфолио</b>
                 <div> name: ${name}</div>
                 <div> email: <a href="${email}">${email}</a></div>
                 <div> subject: ${subject}</div>
               <div>${message}</div>`, // html body
    });

    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})