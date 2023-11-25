const Tag = require("../dtos/tagDTO");
const User = require("../dtos/userDTO");

async function add_tag(req, res) {
  const tag = new Tag({
    name: req.body.name,
    finanzas: req.body.finanzas,
    user: req.body.user,
  });
  const user = await User.findById(req.body.user);
  tag
    .save()
    .then(async (result) => {
      user.tags = user.tags.concat(result._id);
      await user.save();
      res.status(201).json({
        error: false,
        message: "Se creó el tag",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: true,
        message: `Server error: ${error}`,
      });
    });
}

async function read_tag(req, res) {
  try {
    const tags = await Tag.find()
      .populate("finanzas", { tags: 0, user: 0 })
      .populate("user", { pss: 0, finanzas: 0, tags: 0 });
    res.status(200).json({ tags });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Server error: ${error}`,
      code: 0,
    });
  }
}

async function read_tagById(req, res) {
  try {
    const tags = await Tag.findOne({ _id: req.params.id })
      .populate("finanzas", { tags: 0, user: 0 })
      .populate("user", { name: 1, email: 1 });
    res.status(200).json({ tags });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Server error: ${error}`,
      code: 0,
    });
  }
}

async function update_tag(req, res) {
  const tagId = req.params.id;
  const updatedData = {
    name: req.body.name,
    finanzas: req.body.finanzas,
  };

  try {
    const result = await Tag.findOneAndUpdate(
      { _id: tagId },
      { $set: updatedData }
    );

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Tag modificado exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar el tag, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar el tag",
      error: error,
    });
  }
}

async function update_tagFinanzas(req, res) {
  const tagId = req.params.id;

  const updatedData = {
    finanzas: req.body.finanzas,
  };

  try {
    const result = await Tag.findOneAndUpdate(
      { _id: tagId },
      { $set: updatedData }
    );

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Tag modificado exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo modificar el tag, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al modificar el tag",
      error: error,
    });
  }
}

async function delete_tag(req, res) {
  const tagId = req.params.id;

  try {
    const result = await Tag.findOneAndDelete({ _id: tagId });

    if (result) {
      res.status(200).json({
        resultado: true,
        msg: "Tag eliminado exitosamente",
      });
    } else {
      res.status(404).json({
        resultado: false,
        msg: "No se pudo encontrar el tag para eliminar, verifique el id",
      });
    }
  } catch (error) {
    res.status(500).json({
      resultado: false,
      msg: "Ocurrió un error al eliminar el tag",
      error: error,
    });
  }
}

module.exports = {
  add_tag,
  read_tag,
  read_tagById,
  update_tag,
  update_tagFinanzas,
  delete_tag,
};
