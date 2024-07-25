const transporter = require("./nodemailerConfig");

const darLaBienvenidaUsuarioNuevo = async (emailUsuario) => {
  console.log("ususio");
  try {
    const info = await transporter.sendMail({
      from: `"Registro Exitoso 👻" <${process.env.GMAIL_USER}>`, // sender address
      to: `${process.env.GMAIL_USER}`, // list of receivers
      subject: "Mail de registro", // Subject line
      html: `
        <div style='text-align:center'>
          <h2>Bienvenido a la pagina</h2>
          <img src="https://i.pinimg.com/originals/f2/c7/f6/f2c7f62b7cfa21d1e92088c855aa3bd4.gif" alt="">
        </div>
      
      
      `, // html body
    });
  } catch (error) {
    console.log(error);
  }
};

const recuperarContrasenia = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"Maddison Foo Koch 👻" <${process.env.GMAIL_USER}>`, // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      html: `
        <div>
          <h2>Bienvenido a la pagina</h2>
          <img src="https://i.pinimg.com/originals/f2/c7/f6/f2c7f62b7cfa21d1e92088c855aa3bd4.gif" alt="">
        </div>
      
      
      `, // html body
    });
  } catch (error) {
    console.log(error);
  }
};

const darLasGraciasPorLaCompra = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"Gracias por tu compra 👻" <${process.env.GMAIL_USER}>`, // sender address
      to: `${process.env.GMAIL_USER}`, // list of receivers
      subject: "En breve recibiras tu producto ✔", // Subject line
      html: `
        <div style='text-align:center'>
          <p>Puedes seguir tu seguimiento del producto por <a href='#'> aqui</a></p>
        </div>
      
      
      `, // html body
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  darLaBienvenidaUsuarioNuevo,
  recuperarContrasenia,
  darLasGraciasPorLaCompra,
};
