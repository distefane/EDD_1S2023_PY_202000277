

// CLASE NODO 
class Tnode{ 
    
    constructor(folderName, weight){
        this.folderName = folderName; 
        this.files = [];
        //crear una matriz dispersa con sparase-matrix.js
        //this.permisos = new SparseMatrix();
        this.children = []; // TODOS LOS NODOS HIJOS
        this.id = null; // PARA GENERAR LA GRÁFICA
        this.weight = weight;
    }
}


class Tree{
    constructor(){
        this.root = new Tnode('/', 1);
        this.root.id = 0;
        this.size = 1; // Para generar los ids
    }

    insert(folderName, fatherPath){ 
        let {node:fatherNode, weight} = this.getFolder(fatherPath);
        let newNode =  new Tnode(folderName, weight);
        // console.log(newNode)
        if(fatherNode){
            this.size += 1;
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        }else{
            console.log("Ruta no existe");
        }
    }


    getFolder(path){
        let weight = 2;
        if(path == this.root.folderName){
            return {node: this.root, weight: weight};
        }else{
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;

            while(folders.length > 0){
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == 'undefined' || folder == null){
                    return null;
                }
                temp = folder;
                weight++;
            }
            return {node: temp, weight: weight}; 
        }
    }

    //buscar si la carpeta nueva existe en n-ary-tree y contar cuantos existen con el mismo nombre
    searchFolder(path, folderName){
        let { node } = this.getFolder(path);
        let count = 0;
        node.children.map(folder => {
            if(folder.folderName == folderName){
                count++;
            }
            else if(folder.folderName.split('(')[0] == folderName){
                count++;
            }
        });
        return count;
    }

    graph(){
        let nodes = "";
        let connections = "";

        let node = this.root;
        let queue = [];
        queue.push(node);
        while(queue.length !== 0){
            let len = queue.length;
            for(let i = 0; i < len; i ++){
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}"];\n`;
                node.children.forEach( item => {
                    connections += `S_${node.id} -> S_${item.id} [label="${node.weight}"];\n`
                    queue.push(item);
                });
            }
        }
        return '\nlayout=neato; \nedge[dir=none];\n' + nodes +'\n'+ connections;
    }

    getHTML2(path, fileName){
    //buscar el archivo y enviar el contenido en forma de url para descargar
    let { node } = this.getFolder(path);
    let code2 = "";
    //node.children.map(child => {
    //    code2 += ` <div class="col-2 folder" onclick="entrarCarpeta('${child.folderName}')">
    //                <img src="./imgs/folder.png" width="100%"/>
    //                <p class="h6 text-center">${child.folderName}</p>
    //            </div>`
    //})
    //debe buscar sólo el archivo que coincida con el fileName
    node.files.map(file => {
        if(file.name == fileName){
            if(file.type === 'text/plain'){
                //hacer url que descargue el archivo

                const archivo = new Blob([file.content], { type: 'text/plain' });
                const url = URL.createObjectURL(archivo);
                
                console.log(url)
                
                code2 += `<a href="${url}" download>${file.name}</a>`
            }else{
                code2 += `<a href="${file.content}" download>${file.name}</a>`
            }
        }
    });
    return code2;
    }

    getHTML(path){
        let { node } = this.getFolder(path); 
        let code = "";
        node.children.map(child => {
            code += ` <div class="col-2 folder" onclick="entrarCarpeta('${child.folderName}')">
                        <img src="./imgs/folder.png" width="100%"/>
                        <p class="h6 text-center">${child.folderName}</p>
                    </div>`
        })
        // console.log(node.files)
        node.files.map(file => {
            if(file.type === 'text/plain'){
                let archivo = new Blob([file.content], {type:'text/plain'});
                const url = URL.createObjectURL(archivo);
                code += `
                        <div class="col-2 folder">
                        <img src="./imgs/file.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${url}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>
                `
            }else{
                code += ` <div class="col-2 folder">
                        <img src="./imgs/file.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${file.content}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>`
            }
        })
        return code;
    }


    //buscar si el archivo nuevo existe en n-ary-tree y contar cuantos existen con el mismo nombre 
    searchFile(path, fileName){
        let { node } = this.getFolder(path);
        let count = 0;
        node.files.forEach(file => {
            if(file.name == fileName){
                count++;
            }
            else if(file.name.split('(')[0] == fileName.split('.')[0]){
                count++;
            }
        });
        return count;
    }
    

    /*searchFile(path, fileName){
        let temp = this.getFolder(path);
        //let count = 0;
        let file = temp.files.find(file => file.name == fileName);
        if(typeof file == 'undefined' || file == null){
            return false;
        }

        return true;
    }*/

/*
    insertFile(path, fileName, content, type){
    let temp = this.getFolder(path);
    temp.matriz.insertHeaderOnly(fileName, content, type);
    }    

    matrixGrpah(path){
    let temp = this.getFolder(path);
    console.log(temp.matriz);
    return temp.matriz.graph();
    }
*/
}


// module.exports = Tree;