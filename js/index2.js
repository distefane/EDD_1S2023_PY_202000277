// let NaryTree = require('./structures/n-ary-tree');

let tree =  new Tree();
//let matrix = new SparseMatrix();
let permisos = [];

 
function crearCarpeta(e){
    e.preventDefault();
    let folderName =  $('#folderName').val();
    let path =  $('#path').val();
    let copias = tree.searchFolder(path, folderName);
    if(copias===0){
        tree.insert(folderName, path);
        alert("Todo bien!")
        $('#carpetas').html(tree.getHTML(path))
    }else{alert("La carpeta ya existe y tiene "+copias+" copias.");}
        if (copias>0){
            let nombre = folderName + "(" + copias + ")";
            tree.insert(nombre, path);
            alert("Todo bien!")
            $('#carpetas').html(tree.getHTML(path))
        }
}

function entrarCarpeta(folderName){
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#carpetas').html(tree.getHTML(curretPath))
}

function retornarInicio(){
    $('#path').val("/");
    $('#carpetas').html(tree.getHTML("/"))
}

function showTreeGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graph()} }`
    $("#graph").attr("src", url + body);
}

function showTreeGraphND(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${grafoND.graph()} }`
    $("#graph").attr("src", url + body);
}

function showMatrixGraph(){
    let path = $('#path').val();
    let url = 'https://quickchart.io/graphviz?graph=';
    console.log(matrix.graph(path))
    // let body = `digraph G { ${tree.matrixGrpah(path)} }`
    $("#graph").attr("src", url + body);
}

function Permisos(){
    let fileNameP = document.getElementById("fileNameP").value;
    let carnetUserP = document.getElementById("carnetUserP").value;
    let permisoP = document.getElementById("permisoP").value;
    pathB = $('#path').val();
    //verificar que el archivo exista en n-ary tree
    copias = tree.searchFile(pathB, fileNameP);
    if(copias===0){
        alert("El archivo no existe");
        return;
    }
    else if(copias>0){
        alert("Éxito! El archivo existe en los registros.");
    }
    miLocalStorage = window.localStorage;
    //verificar que el usuario exista en el local storage
    for (let i = 0; i < miLocalStorage.length; i++) {
        let key = miLocalStorage.key(i);
        let value = miLocalStorage.getItem(key);
        if(key == carnetUserP){
            console.log("El usuario existe");
            break;
        }
        if(i == miLocalStorage.length - 1){
            alert("El usuario no existe");
            return;
        }
    }
    //verificar que el permiso sea valido
    if(permisoP != "r" && permisoP != "w"){
        alert("El permiso no es valido");
        return;
    }
    matrix.insertarFinal(carnetUserP, fileNameP, permisoP);
}

function AgPermiso(){
    let fileNameP = document.getElementById("fileNameP").value;
    let carnetUserP = document.getElementById("carnetUserP").value;
    let permisoP = document.getElementById("valueP").value;
    
    let tipoDoc = fileNameP.split('.')[1];
    


    if(tipoDoc == "pdf" || tipoDoc == "jpg" || tipoDoc == "png"){
        if(permisoP == "w" || permisoP == "r-w" || permisoP == "w-r"){
            alert("La escritura no es válida en este tipo de documento.");
            return;
        }
    }

    pathB = $('#path').val();
    usuarioActual = localStorage.getItem("user");
    
    //verificar que el archivo exista en n-ary tree
    copias = tree.searchFile(pathB, fileNameP);
    if(copias===0){
        alert("El archivo no existe en este directorio.");
        return;
    }
    else if(copias>0){
        alert("Éxito! El archivo existe en los registros.");
        //recibir el nombre del archivo y usar getHTML2 para mostrarlo en la tabla en forma de link
        let path = $('#path').val();
        console.log (path);

        //si en la lista permiso ya existe el archivo, indicarlo
        for (let i = 0; i < permisos.length; i++) {
            nombreSinUrl = permisos[i].nombre.split('>')[1].split('<')[0];
            console.log("nombreSinUrl: "+nombreSinUrl+ "permiso nuevo "+permisoP);
            if(nombreSinUrl == fileNameP && permisos[i].ubicacion == pathB){
                if(permisos[i].destinatario == carnetUserP){
                    //editar el permiso
                    alert("El archivo ya tenía permisos, así que fue modificado.");
                    permisos[i].permiso = permisoP;
                    console.log(permisos[i].permiso);
                    // GUARDAR EN LOCAL STORAGE
                    localStorage.setItem("permisos", JSON.stringify(permisos))
                    return;
                }
            } 
        }

        nombreee = tree.getHTML2(path, fileNameP);
        console.log(nombreee);
        //hacer que el nombre del archivo sea un link
        nombreeee = `${nombreee}`;
        //sería de modificar el diccionario permiso para agregarle un botón al final que diga "ver", tipo nombreee.
        //que ese botón tenga la función de enviar una etiqueta al div llamado "visualizar" de tipo src, dependiendo 
        //si es imagen(img), pdf(iframe) o texto(en el caso del texto se hace un textarea y depende si el permiso deja editar se pone para editar).
        txtVer= `<button type="button" class="btn btn-primary" onclick="verArchivo('${fileNameP}')">Ver</button>`;
        permiso = {propietario: usuarioActual, destinatario: carnetUserP, ubicacion: pathB, nombre: nombreeee, permiso: permisoP, boton: txtVer};
        permisos.push(permiso);
        console.log(permisos);
    }
    // GUARDAR EN LOCAL STORAGE
    localStorage.setItem("permisos", JSON.stringify(permisos))
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

verArchivo = async (fileNameP) => {
    //obtener el archivo del n-ary tree
    pathB = $('#path').val();
    copias = tree.searchFile(pathB, fileNameP);

    if(copias===0){
        alert("El archivo no existe en este directorio.");
        return;
    }
    else if(copias>0){
        alert("Éxito! El archivo existe en los registros.");
        //enviar el contenido del archivo al div "visualizar"
        let path = $('#path').val();
        console.log (path);
        //obtener el archivo del n-ary tree
        let archivo = tree.getFolder(path).node.files.find(file => file.name == fileNameP);
        console.log(archivo);
        //obtener el tipo de archivo
        let tipoDoc = fileNameP.split('.')[1];
        console.log(tipoDoc);
        //si es imagen, mostrarla en el div "visualizar"
        if(tipoDoc == "jpg" || tipoDoc == "png"){
            //obtener el contenido del archivo
            let contenido = archivo.content;
            console.log(contenido);
            //mostrar la imagen en el div "visualizar"
            $("#visualizar").html(`<img src="${contenido}" alt="Imagen" width="500" height="600">`);
        }
        //si es pdf, mostrarlo en el div "visualizar"
        else if(tipoDoc == "pdf"){
            //obtener el contenido del archivo
            let contenido = archivo.content;
            console.log(contenido);
            //mostrar el pdf en el div "visualizar"
            $("#visualizar").html(`<iframe src="${contenido}" width="500" height="600"></iframe>`);
        }
        //si es texto, mostrarlo en el div "visualizar"
        else if(tipoDoc == "txt"){
            //obtener el contenido del archivo
            let contenido = archivo.content;
            console.log(contenido);
            //mostrar el texto en el div "visualizar"
            $("#visualizar").html(`<textarea id="textArea" rows="10" cols="50" readonly>${contenido}</textarea>`);
        }
    }
    /*
    //obtener el archivo de la lista files
    let pathB = $('#path').val();
    let archivo = tree.getFolder(pathB).node.files.find(file => file.name == fileNameP);
    console.log(archivo);
    //obtener el tipo de archivo
    let tipoDoc = fileNameP.split('.')[1];
    console.log(tipoDoc);
    //si es imagen, mostrarla en el div "visualizar"
    if(tipoDoc == "jpg" || tipoDoc == "png"){
        //obtener el contenido del archivo
        let contenido = archivo.content;
        console.log(contenido);
        //mostrar la imagen en el div "visualizar"
        $("#visualizar").html(`<img src="${contenido}" alt="Imagen" width="500" height="600">`);
    }
    //si es pdf, mostrarlo en el div "visualizar"
    else if(tipoDoc == "pdf"){
        //obtener el contenido del archivo
        let contenido = archivo.content;
        console.log(contenido);
        //mostrar el pdf en el div "visualizar"
        $("#visualizar").html(`<iframe src="${contenido}" width="500" height="600"></iframe>`);
    }
    //si es texto, mostrarlo en el div "visualizar"
    else if(tipoDoc == "txt"){
        //obtener el contenido del archivo
        let contenido = archivo.content;
        console.log(contenido);
        //mostrar el texto en el div "visualizar"
        $("#visualizar").html(`<textarea id="textArea" rows="10" cols="50" readonly>${contenido}</textarea>`);
    }*/

}

const subirArchivo =  async (e) => {
    e.preventDefault();
    //comprobar si el archivo existe en el n-ary tree usando searchFile
    //obtener nombre del archivo
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    
    nombre = form.file.name;
    let pathB = $('#path').val();
    copias = tree.searchFile(pathB, nombre);
    if(copias===0){
        
        // console.log(form.file.type);
        //que tipo de variable es "nombre"
        console.log(typeof(nombre));
        let path = $('#path').val();
        if(form.file.type === 'text/plain'){
            // ARCHIVO DE TEXTO
            let fr = new FileReader();
            fr.readAsText(form.file);
            fr.onload = () => {
                // CARGAR ARCHIVO A LA MATRIZ
                console.log("path:",path);
                tree.getFolder(path).node.files.push({
                    name: nombre, 
                    content: fr.result, 
                    type: form.file.type
                })
                $('#carpetas').html(tree.getHTML(path));
            };
        }else{
            // IMÁGENES O PDF 
            let parseBase64 = await toBase64(form.file);
            tree.getFolder(path).node.files.push({
                name: nombre, 
                content: parseBase64, 
                type: form.file.type
            })
            $('#carpetas').html(tree.getHTML(path));
            // console.log(parseBase64)
            // $("#imagenSubida").attr("src", imgBase64); 
            // console.log(await toBase64(form.file));
        }
        alert('Archivo Subido!')
    }else{alert("El archivo ya existe y tiene "+copias+" copias.");}
        if (copias>0){
            let path = $('#path').val();
            if(form.file.type === 'text/plain'){
            // ARCHIVO DE TEXTO
            let fr = new FileReader();
            let abre = "(";
            let cierra = ")";
            let nombree = nombre.split('.')[0] + abre + copias + cierra+ "." + nombre.split('.')[1];
            fr.readAsText(form.file);
            fr.onload = () => { 
                // CARGAR ARCHIVO A LA MATRIZ
                tree.getFolder(path).node.files.push({
                    name: nombree, 
                    content: fr.result, 
                    type: form.file.type
                })
                $('#carpetas').html(tree.getHTML(path));
            };
            }else{
            // IMÁGENES O PDF 
            let parseBase64 = await toBase64(form.file);
            let abre = "(";
            let cierra = ")";
            let nombree = nombre.split('.')[0] + abre + copias + cierra+ "." + nombre.split('.')[1];
            tree.getFolder(path).node.files.push({
                name: nombree,
                content: parseBase64, 
                type: form.file.type
            })
            $('#carpetas').html(tree.getHTML(path));
            // console.log(parseBase64)
            // $("#imagenSubida").attr("src", imgBase64); 
            // console.log(await toBase64(form.file));
            }
            alert('Archivo Subido!')
        }
}


function cerrarSesion(){
    window.location.href = "./index.html";
    return false;
} 
//hacer localstorage del n-ary tree para cada usuario que se loguee

function llenarTabla(){
    let permisosw = JSON.parse(localStorage.getItem("permisos"));
    var tbody = document.querySelector('#PermisosTable tbody');
    tbody.innerHTML = '';
    for(i = 0; i < permisosw.length; i++){
        $('#PermisosTable tbody').append(
            `
                <tr>
                    <td>${permisosw[i].propietario}</td>
                    <td>${permisosw[i].destinatario}</td>
                    <td>${permisosw[i].ubicacion}</td>
                    <td>${permisosw[i].nombre}</td>
                    <td>${permisosw[i].permiso}</td>
                </tr>
            `
        )
    }
}

//llamar a inOrderHT del avl-tree para llenar la tabla de hash
function deAVLaHash(){
    
}

function llenarMiTabla(){
    let permisosw = JSON.parse(localStorage.getItem("permisos"));
    var tbody = document.querySelector('#myPermisosTable tbody');
    tbody.innerHTML = '';
    for(i = 0; i < permisosw.length; i++){
        if(permisosw[i].destinatario == localStorage.getItem("user")){
            $('#myPermisosTable tbody').append(
                `
                    <tr>
                        <td>${permisosw[i].propietario}</td>
                        <td>${permisosw[i].destinatario}</td>
                        <td>${permisosw[i].ubicacion}</td>
                        <td>${permisosw[i].nombre}</td>
                        <td>${permisosw[i].permiso}</td>
                        <td>${permisosw[i].boton}</td>
                    </tr>
                `
            )
    }
}
}