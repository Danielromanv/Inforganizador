class contenidoCRUD{
  constructor(idContenido, nombreContenido, unidadId){
      this.idContenido = idContenido;
      this.nombreContenido = nombreContenido;
      this.unidadId = unidadId;
  }
  insert(){
    console.log("función para realizar insert de la tabla contenido");
  }
  update(){
    console.log("función para realizar update de la tabla contenido");
  }
  delete(){
    console.log("función para realizar delete de la tabla contenido");
  }
  select(){
    console.log("función para realizar select de la tabla contenido");
  }
}
module.exports = contenidoCRUD;
