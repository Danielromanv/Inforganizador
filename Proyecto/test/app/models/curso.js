class cursoCRUD{
  constructor(idCurso, nombreCurso){
    this.idCurso = idCurso;
    this.nombreCurso = nombreCurso;
  }
  insert(){
    console.log("función para realizar insert de curso");
  }
  update(){
    console.log("función para realizar update de curso");
  }
  delete(){
    console.log("función para realizar delete de curso");
  }
  select(){
    console.log("función para realizar select de curso");
  }
}
module.exports = cursoCRUD;
