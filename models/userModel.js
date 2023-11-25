const Usuario = require("../dtos/userDTO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10; // Número de rondas de sal. Cuanto mayor, más seguro, pero más lento.

async function add_usuario(req, res) {
  try {
    // Espera a que se complete la verificación del token
    await verifyToken(req, res);
    // Generar un hash de la contraseña antes de almacenarla
    bcrypt.hash(req.body.pss, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: `Error al hashear la contraseña: ${err}`,
        });
      }

      const usuario = new Usuario({
        name: req.body.name,
        email: req.body.email,
        pss: hashedPassword, // Almacena el hash en lugar de la contraseña original
        rol: req.body.rol,
        finanzas: req.body.finanzas,
        tags: req.body.tags,
      });

      usuario
        .save()
        .then((result) => {
          res.status(201).json({
            error: false,
            message: "Se creó el usuario",
            data: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: true,
            message: `Error al guardar el usuario: ${error}`,
          });
        });
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error en el servidor: ${error}`,
      code: 0,
    });
  }
}

async function read_usuario(req, res) {
  try {
    // Espera a que se complete la verificación del token
    await verifyToken(req, res);

    // Si la verificación del token es exitosa, continúa con la lógica
    const usuarios = await Usuario.find()
      .populate("finanzas", { tags: 0, user: 0 })
      .populate("tags", { name: 1 });

    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error en el servidor: ${error}`,
      code: 0,
    });
  }
}

async function read_usuarioById(req, res) {
  try {
    const usuarios = await Usuario.findOne({ _id: req.params.id })
      .populate("finanzas", { tags: 0, user: 0 })
      .populate("tags", { name: 1 });
    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Server error: ${error}`,
      code: 0,
    });
  }
}

async function read_usuarioByIdPost(req, res) {
  try {
    const usuarios = await Usuario.findOne({ _id: req.body.id })
      .populate("finanzas", { tags: 0, user: 0 })
      .populate("tags", { name: 1 });
    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Server error: ${error}`,
      code: 0,
    });
  }
}

async function update_usuario(req, res) {
  const usuarioId = req.params.id;

  const updatedData = {
    name: req.body.name,
    email: req.body.email,
    pss: req.body.pss,
    finanzas: req.body.finanzas,
    tags: req.body.tags,
  };

  try {
    const result = await Usuario.findOneAndUpdate(
      { _id: usuarioId },
      { $set: updatedData }
    );
    console.log(result);

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Usuario modificado exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar el usuario, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar el usuario",
      error: error,
    });
  }
}

async function delete_usuario(req, res) {
  const usuarioId = req.params.id;

  try {
    const result = await Usuario.findOneAndDelete({ _id: usuarioId });

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Usuario eliminado exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo encontrar el usuario para eliminar, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al eliminar el usuario",
      error: error,
    });
  }
}

async function update_usuarioFinanzas(req, res) {
  const usuarioId = req.params.id;

  const updatedData = {
    finanzas: req.body.finanzas,
  };

  try {
    const result = await Usuario.findOneAndUpdate(
      { _id: usuarioId },
      { $set: updatedData }
    );
    console.log(result);

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Array de finanzas modificado exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar el array de finanzas del usuario, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar el array de finanzas del usuario",
      error: error,
    });
  }
}

async function update_usuarioTags(req, res) {
  const usuarioId = req.params.id;

  const updatedData = {
    tags: req.body.tags,
  };

  try {
    const result = await Usuario.findOneAndUpdate(
      { _id: usuarioId },
      { $set: updatedData }
    );
    console.log(result);

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Array de tags del usuario modificado exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar el Array de tags del usuario, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar el Array de tags del usuario",
      error: error,
    });
  }
}

async function login(req, res) {
  const { email, pss } = req.body;

  try {
    // Buscar el usuario por correo electrónico y estado activo
    const usuario = await Usuario.findOne({ email });
    // Verificar si el usuario existe y la contraseña es válida
    if (usuario && bcrypt.compare(pss, usuario.pss)) {
      // Generar un token con el ID del usuario y la clave de sesión
      const token = generateToken(usuario._id);

      res.status(200).json({
        error: false,
        message: "Inicio de sesión exitoso",
        token,
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Correo electrónico o contraseña incorrectos",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error en el servidor: ${error}`,
      code: 0,
    });
  }
}

// Función para generar un token JWT con una clave de sesión
function generateToken(userId) {
  // Incluye la clave de sesión como parte de la información del token
  const payload = { userId };

  // Firma el token utilizando la clave secreta del servidor y la clave de sesión única
  const token = jwt.sign(payload, process.env.SERVER_SECRET_KEY, {
    expiresIn: "24h",
  });

  return token;
}

// Middleware para verificar el token
async function verifyToken(req, res) {
  // Obtener el token del encabezado 'Authorization'
  const token = req.headers.authorization;

  // Verificar si el token está presente
  if (!token) {
    throw new Error("Token de acceso no proporcionado");
  }

  // Utiliza la promesa devuelta por jwt.verify para manejar la asincronía
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SERVER_SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(
          new Error(
            "Token de acceso inválido. Inicie sesión para obtener un token válido."
          )
        );
      }
      // Añade la información del usuario decodificado al objeto de solicitud (req)
      req.user = decoded;
      resolve(); // Resuelve la promesa si la verificación del token es exitosa
    });
  });
}

module.exports = {
  add_usuario,
  read_usuario,
  read_usuarioById,
  read_usuarioByIdPost,
  update_usuario,
  delete_usuario,
  update_usuarioFinanzas,
  update_usuarioTags,
  login,
};
