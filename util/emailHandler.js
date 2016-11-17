const mail = require("sendgrid").mail;
const eConfig = require("../res/emailConfg");
const sendGrid = require("sendgrid")(eConfig.sendGridKey);
const emailTemplate = require("../models/emailTemplate");

module.exports = {
    sendEmail: (receiver, content, template_key, language_name) => {
        const senderEmail = new mail.Email(eConfig.sender);
        const receiverEmail = new mail.Email(receiver);
        //content
        //ToDo
        var title = "Greetings from Wain013.com";
        var body = "Greetings from Wain013.com";
        var emailContent;

        emailTemplate.EmailTemplate.getTemplateByType(template_key).then(template => {
            if(!template) {

                return next(new Error("template Does Not Exist"));

            } else {
                title = template.template.arabic.title;
                body = template.template.arabic.body;

                switch(language_name) {
                    case "Arabic":
                        title = template.template.arabic.title;
                        body = template.template.arabic.body;
                        break;

                    case "English":
                        title = template.template.english.title;
                        body = template.template.english.body;
                        break;

                }


                keys = Object.keys(content);

                for(var i = 0; i < keys.length; i++){
                    var find = '[['+keys[i]+']]';
                    find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    var re = new RegExp(find, 'g');
                    body = body.replace(re, content[keys[i]]);
                    title = title.replace(re, content[keys[i]]);
                }

                emailContent = new mail.Content("text/html", body);

                const email = new mail.Mail(senderEmail, title, receiverEmail, emailContent);
                email.setTemplateId(eConfig.mainTemplate.id);
                const request = sendGrid.emptyRequest({
                    method: "POST",
                    path: "/v3/mail/send",
                    body: email.toJSON()
                });
                return sendGrid.API(request, function(error, response) {
/*                    console.log(response.statusCode)
                    console.log(response.body)
                    console.log(response.headers)*/
                });

            }
        }, err => next(err) );


    }
};