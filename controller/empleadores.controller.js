const Empleadores=require("../models/empleadores.model");

 function createEmpleadores(req,res){
    const empleadores=new Empleadores(req.body);
   
    empleadores.save((error, empleadorStored)=>{
        if(error){
            res.status(400).send({msg: "Error al guardar los datos"})
        }else{
            res.status(200).send(empleadorStored)
        }
    })
}

function getEmpleadores(req,res){
    Empleadores.find((error, empleadoresStored)=>{
        if(error){
            res.status(500).send({msg:"No hay datos que consultar"})
        }else{
            res.status(200).send(empleadoresStored)
        }
    })
}

 function deleteEmpleador(req,res){
    const {id}=req.params;

    Empleadores.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).send({msg:"Error al eliminar el empleador"})
        }else{
            res.status(200).send({msg: "Empleador eliminado"})
        }
    })
}

function updateEmpleadores(req,res){
   const {id}=req.params;
   const datosEmpleador=req.body;

   Empleadores.findByIdAndUpdate({curp:id},datosEmpleador, (error)=>{
    if(error){
        res.status(400).send({msg: "Datos no actualizados"})
    }else{
        res.status(200).send({msg: "Los datos fueron actualizados correctamente"})
    }
   })
}

async function getEmpleador(req,res){
    console.log("Obtener los empleadores");
}



module.exports={
    createEmpleadores,
    getEmpleadores,
    updateEmpleadores,
    deleteEmpleador,
    getEmpleador,
}