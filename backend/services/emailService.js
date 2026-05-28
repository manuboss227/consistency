const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS
    }
  });

const sendReminderEmail =
  async (
    to,
    taskTitle,
    dueDate
  ) => {

    try {

      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to,

        subject:
          "⏰ Task Reminder",

        html: `

          <h2>
            Task Reminder
          </h2>

          <p>
            Your task:
            <b>${taskTitle}</b>

            is due on

            <b>${dueDate}</b>
          </p>
        `
      });

      console.log(
        "Reminder email sent"
      );

    }

    catch (error) {

      console.log(error);
    }
};

module.exports = {
  sendReminderEmail
};