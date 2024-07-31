const ProductModel = require("../models/producto.model");
const cloudinary = require("../helpers/cloudinaryConfig");
const { MercadoPagoConfig, Preference } = require("mercadopago");

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
    };
  } catch (error) {
    return error;
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

const pagoMP = async (body) => {
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
        success: "frontEnd/success",
        failure: "frontEnd/failure",
        pending: "frontEnd/pending",
      },
      auto_return: "approved",
    },
  });

  return {
    urlMP: result.init_point,
    statusCode: 200,
  };
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  editarProductoPorId,
  borradoFisicoProductoPorId,
  agregarActulizarImg,
  pagoMP,
};
