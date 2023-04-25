const Empleador = require("../models/empleador.model");

async function createEmpleador(req,res){
    try {
        const empleador = new Empleador(req.body);
        const empleadorStored = await empleador.save();
        res.status(200).send(empleadorStored);
    } catch (error) {
        res.status(400).send({msg: "Error al guardar los datos"});
    }
}

async function getEmpleadores(req,res){
    try {
        const empleadoresStored = await Empleador.find();
        res.status(200).send(empleadoresStored);
    } catch (error) {
        res.status(500).send({msg: "No hay datos que consultar"});
    }
}

async function deleteEmpleador(req,res){
    try {
        const {id} = req.params;
        await Empleador.findByIdAndDelete(id);
        res.status(200).send({msg: "Empleador eliminado"});
    } catch (error) {
        res.status(400).send({msg: "Error al eliminar los datos"});
    }
}
            
async function updateEmpleador(req,res){
    try {
        const {id} = req.params;
        const empleador = await Empleador.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).send(empleador);
    } catch (error) {
        res.status(400).send({msg: "Error al actualizar los datos"}); 
    }      
}
      
module.exports = {
    createEmpleador,
    getEmpleadores,
    deleteEmpleador,
    updateEmpleador
};
