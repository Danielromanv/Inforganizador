class unidadCRUD{
  constructor(idUnidad, cursoId){
    this.idUnidad = idUnidad;
    this.cursoID = cursoId;
   }
   insert(){
     console.log("función para realizar insert en tabla unidad");
   }
   update(){
     console.log("función para realizar update en tabla unidad");
   }
   delete(){
     console.log("función para realizar delete en tabla unidad");
   }
   select(){
     console.log("función para realizar select en tabla unidad");
   }
}
module.exports = unidadCRUD;
