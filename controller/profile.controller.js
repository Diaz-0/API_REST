const Profile = require("../models/profile.models");

async function getProfile(req, res) {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    if (!profile) {
      return res.status(404).send({ msg: "Perfil no encontrado" });
    }
    return res.status(200).send(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Error en el servidor" });
  }
}

async function updateProfile(req, res) {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).send(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Error en el servidor" });
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
