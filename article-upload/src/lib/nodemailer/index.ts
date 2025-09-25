//https://myaccount.google.com/apppasswords
//https://nodemailer.com/
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.gmailUser as string, 
        pass: process.env.gmailPass as string, 
    },
});

export const sendMail = async ({
    toEmail,
    subject,
    text,
    html,
}:{
    toEmail:string
    subject:string
    text:string
    html:string
}): Promise<{result:boolean,message:string}> =>{
    try{
        //送信
        await transporter.sendMail({
            from: process.env.gmailUser,
            to: toEmail,
            subject,
            text,
            html,
        });
        //成功!!
        return {result:true,message:'success'}
    }catch(err){
        const errMessage = err instanceof Error ?  err.message : `Internal Server Error.`;
        return {
            result:false,
            message:`メールの送信に失敗:${errMessage}`
        }
    }
}