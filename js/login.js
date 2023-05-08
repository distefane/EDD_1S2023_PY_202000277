
function iniciarSesion(){
    let user=document.getElementById("usuario").value;
    let pass=document.getElementById("password").value;
    if(user == "admin" && pass == "admin"){ 
        //dirigir a la pagina de admin sadmin.html
        window.location.href = "sadmin.html";
        return false;
    }
    else{ 
        alert("ud no es admin");
        
        //usar search para buscar el usuario y contraseña en el arbol y si existe dirigir a la pagina de user suser.html
        let pasar = recorriendo(user, pass);
        if(pasar == true){
            alert("usuario y contraseña correcta");
            //crear un local storage para cada usuario que inicie sesion
            localStorage.user = user;
            window.location.href = "./suser.html";
            return false;
        }
        else{
            alert("usuario o contraseña incorrecta");
        }
    }
}