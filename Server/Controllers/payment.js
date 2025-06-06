const User = require('../Models/Auth');
const nodemailer = require('nodemailer');

exports.upgradePlan = async (req, res) => {
  const { plan } = req.body;
  const prices = { bronze: 10, silver: 50, gold: 100 };

  if (!prices[plan]) return res.status(400).json({ error: "Invalid plan" });

  try {
    const user = await User.findById(req.user.id);
    user.subscription = plan;
    await user.save();

    const invoice = `Invoice for ${plan} plan - ₹${prices[plan]}`;

    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'your_email@gmail.com', pass: 'your_pass' } });
    await transporter.sendMail({
      from: 'your_email@gmail.com',
      to: user.email,
      subject: `Subscription Upgrade to ${plan}`,
      text: invoice,
    });

    res.json({ message: "Plan upgraded and email sent!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
