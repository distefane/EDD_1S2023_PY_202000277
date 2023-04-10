// let NaryTree = require('./structures/n-ary-tree');

let tree =  new Tree();
let matrix = new SparseMatrix();

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

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const subirArchivo =  async (e) => {
    e.preventDefault();
    //comprobar si el archivo existe en el n-ary tree usando searchFile
    //si existe, no se sube
    //si no existe, se sube

    //obtener nombre del archivo


    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    
    nombre = form.file.name;
    let pathB = $('#path').val();
    copias = tree.searchFile(pathB, nombre.split('.')[0]);
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
                tree.getFolder(path).files.push({
                    name: nombre.split('.')[0], 
                    content: fr.result, 
                    type: form.file.type
                })
                $('#carpetas').html(tree.getHTML(path));
            };
        }else{
            // IMÁGENES O PDF 
            let parseBase64 = await toBase64(form.file);
            tree.getFolder(path).files.push({
                name: nombre.split('.')[0], 
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
            let nombree = nombre.split('.')[0] + abre + copias + cierra;
            fr.readAsText(form.file);
            fr.onload = () => { 
                // CARGAR ARCHIVO A LA MATRIZ
                tree.getFolder(path).files.push({
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
            let nombree = nombre.split('.')[0] + abre + copias + cierra;
            tree.getFolder(path).files.push({
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
    
    
    //recorrer array files
    console.log(tree.getFolder(path).files);

}
function cerrarSesion(){
    window.location.href = "./index.html";
    return false;
} 
//hacer localstorage del n-ary tree para cada usuario que se loguee