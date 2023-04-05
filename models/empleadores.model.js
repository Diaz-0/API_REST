const mongoose=require("mongoose");


const Empleadores=mongoose.Schema({
    curp:{
        type:String,
        unique:true
    },
    nombre: String,
    apellidos: String,
    fechana: Date,
    sexo: String,
    telefono: Number,
    email: String,
    password: String,
    created_at:Date
})

module.exports=mongoose.model("Empleador", Empleadores);