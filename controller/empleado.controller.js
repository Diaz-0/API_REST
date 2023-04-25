const Empleado = require("../models/empleado.model");

async function createEmpleado(req,res){
    try {
        const empleado = new Empleado(req.body);
        const empleadoStored = await empleado.save();
        res.status(200).send(empleadoStored);
    } catch (error) {
        res.status(400).send({msg: "Error al guardar los datos"});
    }
}

async function getEmpleados(req,res){
    try {
        const empleadosStored = await Empleado.find();
        res.status(200).send(empleadosStored);
    } catch (error) {
        res.status(500).send({msg: "No hay datos que consultar"});
    }
}

async function deleteEmpleado(req,res){
    try {
        const {id} = req.params;
        await Empleado.findByIdAndDelete(id);
        res.status(200).send({msg: "Empleado eliminado"});
    } catch (error) {
        res.status(400).send({msg: "Error al eliminar el empleado"});
    }
}

async function updateEmpleado(req, res) {
    try {
      const { id } = req.params;
      const empleado = await Empleado.findByIdAndUpdate(id, req.body, {
        new: true
      });
      res.status(200).send(empleado);
    } catch (error) {
      res.status(400).send({ msg: "Error al actualizar los datos" });
    }
  }
  

module.exports = {
    createEmpleado,
    getEmpleados,
    deleteEmpleado,
    updateEmpleado
};
