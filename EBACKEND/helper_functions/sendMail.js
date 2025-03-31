const nodemailer = require("nodemailer");

const sendEmail = async (customerInfo, cartItems, totalPrice) => {
  console.log(cartItems)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "chintabhanuchand0@gmail.com", 
        pass: "bokc virs binb sint", 
      },
    });

    const itemsList = cartItems
      .map((item) => `${item.title} (x${item.quantity}) - ₹${item.price * item.quantity}`)
      .join("<br>");

    const mailOptions = {
      from: "chintabhanuchand0@gmail.com",
      to: customerInfo.email, 
      subject: "Order Confirmation - Your Order Has Been Placed!",
      html: `
        <h3>Hello ${customerInfo.name},</h3>
        <p>Thank you for your order! Here are your order details:</p>
        <p><strong>Shipping Address:</strong> ${customerInfo.address}</p>
        <h4>Order Summary:</h4>
        <p>${itemsList}</p>
        <h3>Total: ₹${totalPrice}</h3>
        <p>We will update you once your order is shipped.</p>
        <br>
        <p>Best Regards,</p>
        <p>Shopping Mart</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", customerInfo.email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
