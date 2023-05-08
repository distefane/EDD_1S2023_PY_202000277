//--------------------------------------------------------------------------
//                      DECLARACIÓN DE LAS ESTRUCTURAS A UTILIZAR
//--------------------------------------------------------------------------
let avlTree = new AvlTree();
//--------------------------------------------------------------------------
//                      FUNCIÓN PARA MANEJAR FORMULARIOS
//--------------------------------------------------------------------------
function loadStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
    try{         
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {
            
            studentsArray = JSON.parse(fr.result).alumnos;
            //AGREGAR A LA TABLA LOS ALUMNOS CARGADOS 
            $('#studentsTable tbody').html(
                studentsArray.map((item, index) => {
                    return(`
                        <tr>
                            <th>${item.carnet}</th>
                            <td>${item.nombre}</td>
                            <td>${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )
            for(let i = 0; i < studentsArray.length; i++){
                avlTree.insert(studentsArray[i]);
            }
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("avlTree", JSON.stringify(avlTree))
            alert('Alumnos cargados con éxito!')
        }
    }catch(error){
        console.log(error);
        alert("Error en la inserción");
    }

}

function showLocalStudents(){
    let temp = localStorage.getItem("avlTree")
    avlTree.root = JSON.parse(temp).root;
    $('#studentsTable tbody').html(
        avlTree.inOrder()
    )
}

function showLocalStudents2(){
    let temp = localStorage.getItem("hashTable")
    tablaHashh.table = JSON.parse(temp).table;
    $('#studentsTable122 tbody').html(
        tablaHashh.recorrer()
    )
}

function encriptarXOR(contraseña, clave){
    let encriptado = "";
    for(let i = 0; i < contraseña.length; i++){
        encriptado += String.fromCharCode(contraseña.charCodeAt(i) ^ clave);
    }
    return encriptado;
    }

//--------------------------------------------------------------------------
//                   FUNCIÓN PARA AGREGAR RECORRIDOS
//--------------------------------------------------------------------------
function showStudentsForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if(avlTree.root !== null){
        switch(form.traversal){
            case 'inOrder':
                $('#studentsTable tbody').html(
                    avlTree.inOrder()
                )
                break;
            case 'preOrder':
                $('#studentsTable tbody').html(
                    avlTree.preOrder()
                )
                break;
            case 'postOrder':
                $('#studentsTable tbody').html(
                    avlTree.postOrder()
                )
                break;
            default:
                $('#studentsTable tbody').html("")
                break;
        }
    }
}

//--------------------------------------------------------------------------
//                   FUNCIÓN PARA MOSTRAR LA GRÁFICA
//--------------------------------------------------------------------------
function showAvlGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${avlTree.treeGraph()} }`
    console.log(body);
    $("#graph").attr("src", url + body);
}

function cerrarSesion(){
    window.location.href = "./index.html";
    return false;
}

//--------------------------------------------------------------------------
//                 RECORRER LA TABLA EN SADMIN.HTML Y BUSCAR EL USUARIO Y CONTRASEÑA
//--------------------------------------------------------------------------
localuser = "";
function recorriendo(user, pass){
    alert("recorriendo")
    let table = document.getElementById("studentsTable122");
    let usuario = "";
    let contraseña = "";
    alert(table.rows.length)
    for(let i = 1 ; i < table.rows.length; i++){
        usuario = table.rows[i].cells[0].innerHTML;
        //crear un local storage para cada usuario que inicie sesion
        localuser = localStorage.key(usuario);
        console.log(localuser)
        console.log(usuario);
        contraseña = table.rows[i].cells[2].innerHTML;
        console.log(contraseña);
        descrifrada = encriptarXOR(contraseña, 10);
        console.log(descrifrada);
        if(usuario == user && descrifrada == pass){
            return true;
        }
    }
    return false;
}

//--------------------------------------------------------------------------
//           llenar tabla hash desde avl tree usando inOrderHT
//--------------------------------------------------------------------------
function llenarTablaHash(){
    if(avlTree.root !== null){
        avlTree.inOrderHT();
        alert("Tabla Hash llenada con éxito!")
        // GUARDAR EN LOCAL STORAGE
        localStorage.setItem("hashTable", JSON.stringify(tablaHashh))
        //llenar desde el storage la tabla studentsTable122
        let temp = localStorage.getItem("hashTable")
        tablaHashh.table = JSON.parse(temp).table;
        $('#studentsTable122 tbody').append(
            aVer = tablaHashh.recorrer()
        )
        }else{
            alert("No hay alumnos para llenar la tabla")
        }    
}


$( document ).ready(showLocalStudents);
$( document ).ready(showLocalStudents2);