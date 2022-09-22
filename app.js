const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const CLIENT_ID = '909304783122-gk0eo6vpg0kdppv0c147tlo2bpf8qtma.apps.googleusercontent.com'

const CLIENT_SECRET = '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'

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04dTKg4VHNIyWCgYIARAAGAQSNwF-L9IrxVRj6Z8KQ4pvEqMuaeMMX3Fd1zNLc7ffjPFdFSYcPYIFzPqnB7H-NrmcPUIgLcNMprQ'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})

async function sendMail(){

    try{
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type:'OAUTH2',
                user:'prasannalakshmikathi@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'PRASANNALAKSHMIKATHI  <prasannalakshmikathi@gmail.com',
            to: 'mallikommuri1466@gmail.com',
            subject: 'Hello from gmail using API',
            text:'Hello from gmail using API',
            htmal:'<h1>Hello from gmail using API</h1>',

        };

        const result = await transport.sendMail(mailOptions)
        return result
        

    }catch(error){
        return error
    }
}
sendMail()
    .then((result)=> console.log('Email sent...',result))
    .catch((error) => console.log(error.message));