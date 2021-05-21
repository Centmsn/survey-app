const { Router } = require("express");
const mongoose = require("mongoose");
const { Path } = require("path-parser");
const { URL } = require("url");

const Mailer = require("../services/Mailer");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Survey = require("../models/survey");

const router = Router();

router.get("/api/surveys", requireLogin, async (req, res, next) => {
  const surveys = await Survey.find({ _user: req.user.id }).select(
    "-recipients"
  );

  res.json({ surveys });
});

router.get("/api/surveys/:surveyId/:choice", (req, res) => {
  res.send("Thanks for voting!");
});

router.post("/api/surveys/webhook", (req, res, next) => {
  const p = new Path("/api/surveys/:surveyId/:choice");

  const events = req.body.map(({ email, url }) => {
    if (!url) return res.send({});
    const match = p.test(new URL(url).pathname);

    if (match) {
      const { surveyId, choice } = match;
      return {
        email,
        surveyId: surveyId,
        choice: choice,
      };
    }
  });

  const usedValues = [];
  events
    .filter(el => el)
    .filter(({ email, surveyId }) => {
      if (
        usedValues.filter(
          value => value.email === email && value.surveyId === surveyId
        ).length
      )
        return false;
      usedValues.push({ email, surveyId });
      return true;
    })
    .forEach(({ surveyId, email, choice }) => {
      console.log(choice);
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        }
      ).exec();
    });

  res.send({});
});

router.post(
  "/api/surveys",
  requireLogin,
  requireCredits,
  async (req, res, next) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;

      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  }
);

module.exports = router;
