/**
 * Created by Felipe on 11-09-2016.
 */

function validadorCampos(){
    console.log("entré a la función");
    var alert = "No repetir números por favor c:";
    if(document.forms["formulario"]["EC1"].value == document.forms["formulario"]["OR1"].value){
        alert(alert);
        return false;
    }
    else if(document.forms["formulario"]["EC1"].value == document.forms["formulario"]["CA1"].value){
        alert(alert);
        return false;
    }
    else if(document.forms["formulario"]["EC1"].value == document.forms["formulario"]["EA1"].value){
        alert(alert);
        return false;
    }
    else if(document.forms["formulario"]["OR1"].value == document.forms["formulario"]["CA1"].value){
        alert(alert);
        return false;
    }
    else if(document.forms["formulario"]["OR1"].value == document.forms["formulario"]["EA1"].value){
        alert(alert);
        return false;
    }
    else if(document.forms["formulario"]["CA1"].value == document.forms["formulario"]["EA1"].value){
        return false;
    }
    return true;
}