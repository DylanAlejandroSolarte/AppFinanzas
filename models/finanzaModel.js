const Finanza = require("../dtos/finanzaDTO");
const User = require("../dtos/userDTO");

async function add_finanza(req, res) {
  const finanza = new Finanza({
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    payMethod: req.body.payMethod,
    date: req.body.date,
    type: req.body.type,
    tags: req.body.tags,
    user: req.body.user,
  });

  const user = await User.findById(req.body.user);

  finanza
    .save()
    .then(async (result) => {
      user.finanzas = user.finanzas.concat(result._id);
      await user.save();
      res.status(201).json({
        error: false,
        message: "Se creó la finanza",
        data: result,
      });
    })
    .catch((error) => {
      res.status(404).json({
        error: true,
        message: `Server error: ${error}`,
      });
    });
}

async function read_finanza(req, res) {
  try {
    const finanzas = await Finanza.find()
      .populate("tags", { name: 1 })
      .populate("user", { name: 1, email: 1 });
    res.status(200).json({ finanzas });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Server error: ${error}`,
      code: 0,
    });
  }
}

async function read_finanzaById(req, res) {
  try {
    const finanzas = await Finanza.findOne({ _id: req.params.id })
      .populate("tags", { name: 1 })
      .populate("user", { name: 1, email: 1 });
    if (finanzas) {
      res.status(200).json({ finanzas });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo encontrar la finanza, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Server error: ${error}`,
      code: 0,
    });
  }
}

async function update_finanza(req, res) {
  const finanzaId = req.params.id;

  const updatedData = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    payMethod: req.body.payMethod,
    date: req.body.date,
    type: req.body.type,
    tags: req.body.tags,
    user: req.body.user,
  };

  try {
    const result = await Finanza.findOneAndUpdate(
      { _id: finanzaId },
      { $set: updatedData }
    );

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Finanza modificada exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar la finanza, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar la finanza",
      error: error,
    });
  }
}

async function delete_finanza(req, res) {
  const finanzaId = req.params.id;

  try {
    const result = await Finanza.findOneAndDelete({ _id: finanzaId });

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Finanza eliminada exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo encontrar la finanza para eliminar, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al eliminar la finanza",
      error: error,
    });
  }
}

async function update_finanzaDesc(req, res) {
  const finanzaId = req.params.id;

  const updatedData = {
    desc: req.body.desc,
  };

  try {
    const result = await Finanza.findOneAndUpdate(
      { _id: finanzaId },
      { $set: updatedData }
    );

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Descripciond de finanza modificada exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar la descripcion de la finanza, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar la descripcion de la finanza",
      error: error,
    });
  }
}

async function update_finanzaPrice(req, res) {
  const finanzaId = req.params.id;

  const updatedData = {
    price: req.body.price,
  };

  try {
    const result = await Finanza.findOneAndUpdate(
      { _id: finanzaId },
      { $set: updatedData }
    );

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "precio de la finanza modificada exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar el precio de la finanza, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar el precio de la finanza",
      error: error,
    });
  }
}

async function update_finanzaPayMethod(req, res) {
  const finanzaId = req.params.id;

  const updatedData = {
    payMethod: req.body.payMethod,
  };

  try {
    const result = await Finanza.findOneAndUpdate(
      { _id: finanzaId },
      { $set: updatedData }
    );

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Metodo de pago de la finanza modificada exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar el metodo de pago de la finanza, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar el metodo de pago de la finanza",
      error: error,
    });
  }
}

async function update_finanzaDate(req, res) {
  const finanzaId = req.params.id;

  const updatedData = {
    date: req.body.date,
  };

  try {
    const result = await Finanza.findOneAndUpdate(
      { _id: finanzaId },
      { $set: updatedData }
    );

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Fecha de la finanza modificada exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar la fecha de la finanza, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar la fecha de la finanza",
      error: error,
    });
  }
}

async function update_finanzaType(req, res) {
  const finanzaId = req.params.id;

  const updatedData = {
    type: req.body.type,
  };

  try {
    const result = await Finanza.findOneAndUpdate(
      { _id: finanzaId },
      { $set: updatedData }
    );

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Tipo de la finanza modificada exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar el tipo de la finanza, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar el tipo de la finanza",
      error: error,
    });
  }
}

async function update_finanzaTags(req, res) {
  const finanzaId = req.params.id;

  const updatedData = {
    tags: req.body.tags,
  };

  try {
    const result = await Finanza.findOneAndUpdate(
      { _id: finanzaId },
      { $set: updatedData }
    );

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Tags de la finanza modificados exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar los tags de la finanza, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar los tags de la finanza",
      error: error,
    });
  }
}

module.exports = {
  add_finanza,
  read_finanza,
  read_finanzaById,
  update_finanza,
  delete_finanza,
  update_finanzaDesc,
  update_finanzaPrice,
  update_finanzaPayMethod,
  update_finanzaDate,
  update_finanzaType,
  update_finanzaTags,
};
