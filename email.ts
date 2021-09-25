import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
let config = JSON.parse(Deno.readTextFileSync('./config.json'))

const client = new SmtpClient();

var html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Un Email Responsive</title>
        <style type="text/css">
        body {margin: 0; padding: 0; min-width: 100%!important;}
        .content {width: 100%; max-width: 600px;}  
        </style>
    </head>
    <body yahoo bgcolor="#f6f8f1">
        <table width="100%" bgcolor="#f6f8f1" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <table class="content" align="left" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td>
                                email.content
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>`


export class EmailControl {
    async send(subject, content, to) {
        await client.connectTLS({
            hostname: "mail.gandi.net",
            port: 465,
            username: config.email.username,
            password: config.email.password,
        });
        await client.send({
            from: config.email.username,
            to: to,
            subject: subject,
            content: html.replace('email.content', content),
        });
    }
}