const ProductModel = require("../models/producto.model");
const cloudinary = require("../helpers/cloudinaryConfig");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const UsuarioModel = require("../models/usuarrios.model");
const CartsModel = require("../models/carts.model");
const FavsModel = require("../models/fav.model");

const obtenerProductos = async () => {
  try {
    const productos = await ProductModel.find();
    return productos;
  } catch (error) {
    return error;
  }
};

const obtenerProductoPorId = async (idProducto) => {
  try {
    const producto = await ProductModel.findOne({ _id: idProducto });
    return producto;
  } catch (error) {
    return error;
  }
};

const crearProducto = async (body) => {
  try {
    const nuevoProducto = new ProductModel(body);
    await nuevoProducto.save();
    return nuevoProducto;
  } catch (error) {
    return error;
  }
};

const editarProductoPorId = async (idProducto, body) => {
  try {
    const productoModificado = await ProductModel.findByIdAndUpdate(
      { _id: idProducto },
      body,
      { new: true }
    );

    return productoModificado;
  } catch (error) {
    return error;
  }
};

const borradoFisicoProductoPorId = async (idProducto) => {
  try {
    await ProductModel.findByIdAndDelete({ _id: idProducto });
    return {
      msg: "Producto Eliminado",
      statusCode: 200,
    };
  } catch (error) {
    return error;
  }
};

const borradoLogicoProductoPorId = async (idProducto) => {
  try {
    const producto = await ProductModel.findById(idProducto);
    producto.bloqueado = true;
    await producto.save();
    return {
      msg: "Producto bloqueado",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
  }
};

const habilitarProducto = async (idProducto) => {
  try {
    const producto = await ProductModel.findById(idProducto);
    producto.bloqueado = false;
    await producto.save();
    return {
      msg: "Producto bloqueado",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
  }
};

const agregarActulizarImg = async (file, idProducto) => {
  const producto = await ProductModel.findOne({ _id: idProducto });
  const image = await cloudinary.uploader.upload(file.path);

  producto.imagen = image.secure_url;
  await producto.save();

  return {
    imageUrl: image.secure_url,
    statusCode: 200,
  };
  try {
  } catch (error) {
    console.log(error);
  }
};

const pagoMP = async (bodyItems) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            title: "Celular",
            quantity: 1,
            unit_price: 200000,
            currency_id: "ARS",
          },
          {
            title: "Celular 2",
            quantity: 2,
            unit_price: 150000,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success:
            "https://react-comision99i.vercel.app/usuario-carrito/success",
          failure:
            "https://react-comision99i.vercel.app/usuario-carrito/failure",
          pending:
            "https://react-comision99i.vercel.app/usuario-carrito/pending",
        },
        auto_return: "approved",
      },
    });
    /* En el caso de que quieran usar el boton de MercadoPago en el front desde react */
    return {
      urlMP: result.id,
      statusCode: 200,
    };

    /*    return {
      urlMP: result.init_point,
      statusCode: 200,
    }; */
  } catch (error) {
    console.log(error);
  }
};

const agregarProductoFavorito = async (idUsuario, idProducto) => {
  const producto = await ProductModel.findById(idProducto);
  const usuario = await UsuarioModel.findById(idUsuario);
  const favoritoUsuario = await FavsModel.findOne({ _id: usuario.idFavorito });

  const productoExiste = favoritoUsuario.productos.find(
    (prod) => prod._id.toString() === producto._id.toString()
  );

  console.log(productoExiste);

  if (productoExiste) {
    return {
      msg: "Producto ya existe en Favoritos",
      statusCode: 400,
    };
  }

  favoritoUsuario.productos.push(producto);
  await favoritoUsuario.save();

  return {
    msg: "Producto agregado a los favoritos",
    statusCode: 200,
  };
};

const agregarProductoCarrito = async (idUsuario, idProducto) => {
  const producto = await ProductModel.findById(idProducto);
  const usuario = await UsuarioModel.findById(idUsuario);
  const carritoUsuario = await CartsModel.findOne({ _id: usuario.idCarrito });

  const productoExiste = carritoUsuario.productos.find(
    (prod) => prod._id.toString() === producto._id.toString()
  );

  if (productoExiste) {
    return {
      msg: "Producto ya existe en el Carrito",
      statusCode: 400,
    };
  }

  carritoUsuario.productos.push(producto);
  await carritoUsuario.save();

  return {
    msg: "Producto agregado al carrito",
    statusCode: 200,
  };
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  editarProductoPorId,
  borradoFisicoProductoPorId,
  borradoLogicoProductoPorId,
  habilitarProducto,
  agregarActulizarImg,
  pagoMP,
  agregarProductoFavorito,
  agregarProductoCarrito,
};
