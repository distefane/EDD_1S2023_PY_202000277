let tablaHashh = new HashTable();

//--------------------------------------------------------------------------
//                      CLASE NODO
//------------------- -------------------------------------------------------
class AvlNode{
    constructor(item){
        this.item = item;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}

//--------------------------------------------------------------------------
//                   VARIABLES GLOBALES
//--------------------------------------------------------------------------
//let = nodes = "";
nodes = "";
//let = connections = "";
connections = "";
//let = nivel = 0;
nivel = 0;

//--------------------------------------------------------------------------
//                   CLASE ARBOL AVL
//--------------------------------------------------------------------------
class AvlTree{
    constructor(){
        this.root = null;
    }

    insert(item){
        this.root = this.#insertRecursive(item, this.root);
    }

    getHeight(node){
        return node === null ? -1 : node.height;
    }
    getMaxHeight(leftNode, rightNode){
        return leftNode.height > rightNode.height ? leftNode.height : rightNode.height;
    }
    //otra forma de hacer la función getMaxHeight
    getMaxHeight2(leftNode, rightNode){
        return Math.max(leftNode.height, rightNode.height);
    }

    //--------------------------------------------------------------------------
    //                  METODO DE INSERCIÓN
    //--------------------------------------------------------------------------

    #insertRecursive(item, node){
        if(node == null){
            node = new AvlNode(item);
        }else if(item.carnet < node.item.carnet){
            node.left = this.#insertRecursive(item, node.left);
            console.log(this.getHeight(node.left) - this.getHeight(node.right))
            if(this.getHeight(node.left) - this.getHeight(node.right) >= 2 || this.getHeight(node.right) - this.getHeight(node.left) <= -2){
            //if(this.#deep(node.left) - this.#deep(node.right) >= 2 || this.#deep(node.left) - this.#deepRecursive(node.right) <= -2){
            //if(this.#balanceFactor(node) >= 2 || this.#balanceFactor(node) <= 2){
                if(item.carnet < node.left.item.carnet){
                    console.log("a2", node.left)
                    node = this.#rotateLeft(node);
                }else{
                    node = this.#doubleLeft(node);
                }
            }
        }else if(item.carnet > node.item.carnet){
            node.right = this.#insertRecursive(item, node.right);
            console.log("siempre entra 1")
            console.log("factor de equilibrio1: " + this.#deep(node.right)); 
            console.log("factor de equilibrio2:" + this.#deep(node.left));
            if(this.getHeight(node.right) - this.getHeight(node.left) >= 2 || this.getHeight(node.right)-this.getHeight(node.left) <=-2){
            //if(this.#deep(node.right) - this.#deep(node.left) >= 2 || this.#deep(node.right) - this.#deep(node.left) <= -2){
            //if (this.#balanceFactor(node) >= 2 || this.#balanceFactor(node) <= 2){
                if(item.carnet < node.right.item.carnet){
                    console.log("a2", node.right)
                    node = this.#rotateRight(node);
                }else{
                    console.log("a3", node)
                    node = this.#doubleRight(node);
                }
            }
        }else{
            alert("Elemento ya existe en el árbol");
        }
        node.height = this.getMaxHeight(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        //node.height = this.getMaxHeight(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        //node.height = this.#getMaxHeight(node.left, node.right) + 1;

        /* 
        //encontrar a la raiz
        raiz = this.#goToRoot();

        //rotar la raiz
        if(this.#balanceFactor(raiz) >= 2 || this.#balanceFactor(raiz) <= -2){
            if(item.carnet < this.root.left.item.carnet){
                console.log("a2", this.root.left)
                this.root = this.#rotateLeftRaiz();
            }else{
                this.root = this.#doubleLeftRaiz();
            }
        }
        if(this.#balanceFactor(raiz) >= 2 || this.#balanceFactor(raiz) <= -2){
            if(item.carnet < this.root.right.item.carnet){
                console.log("a2", this.root.right)
                this.root = this.#rotateRightRaiz();
            }else{
                console.log("a3", this.root)
                this.root = this.#doubleRightRaiz();
            }
        }
        */
        return node;
    }

    //--------------------------------------------------------------------------
    //                  METODO DE SABER PROFUNDIDAD SIN ENCICLAR
    //--------------------------------------------------------------------------

    #deepRecursive(node){
        if (node == null){
            return -1;
        }else{
            if (node.left == null && node.right == null){
                return 0;
            }
            //por qué se encicla?
            return Math.max(this.#deepRecursive(node.left), this.#deepRecursive(node.right)) + 1;
        }
    } 

    //--------------------------------------------------------------------------
    //                  METODO DE SABER PROFUNDIDAD SIN RECURSIVIDAD
    //--------------------------------------------------------------------------

    #deep(node){
        let deep = 0;
        let aux = node;
        while(aux != null){
            deep++;
            aux = aux.left;
        }
        return deep;
    }

    #deepOnlyFirst(node){
        let deep = 0;
        let aux = node;
        while(aux != null){
            deep++;
            aux = aux.left;
        }
        return deep;
    }

    //--------------------------------------------------------------------------
    //                  METODO DE ROTAR CON BASE EN LA RAIZ
    //--------------------------------------------------------------------------

    #rotateLeftRaiz(){
        let node2 = this.root.right;
        this.root.right = node2.left;
        node2.left = this.root;
        this.root.height = this.getMaxHeight(this.getHeight(this.root.left), this.getHeight(this.root.right)) + 1;
        node2.height = this.getMaxHeight(this.getHeight(node2.left), this.getHeight(node2.right)) + 1;
        this.root = node2;
    }

    #rotateRightRaiz(){
        let node2 = this.root.left;
        this.root.left = node2.right;
        node2.right = this.root;
        this.root.height = this.getMaxHeight(this.getHeight(this.root.left), this.getHeight(this.root.right)) + 1;
        node2.height = this.getMaxHeight(this.getHeight(node2.left), this.getHeight(node2.right)) + 1;
        this.root = node2;
    }

    #doubleLeftRaiz(){
        this.#rotateRightRaiz();
        this.#rotateLeftRaiz();
    }

    #doubleRightRaiz(){
        this.#rotateLeftRaiz();
        this.#rotateRightRaiz();
    }

    //--------------------------------------------------------------------------
    //                  METODO DE FACTOR DE EQUILIBRIO
    //--------------------------------------------------------------------------

    #balanceFactor(node){
        if(node == null){
            return 0;
        }else{
            return this.#deep(node.left) - this.#deep(node.right);
        }
    }

    //--------------------------------------------------------------------------
    //                   ROTACIONES
    //--------------------------------------------------------------------------
    #rotateRight(node1){
        let node2 = node1.right;
        //if (node2 != null){
        //    node1.right = node2.left;
        //    node2.left = node1;
        //    node1.height = this.getMaxHeight(this.#deepRecursive(node1.left), this.#deepRecursive(node1.right)) + 1;
        //}
        node1.right = node2.left;
        node2.left = node1;
        node1.height = this.getMaxHeight(this.getHeight(node1.left), this.getHeight(node1.right)) + 1;
        node2.height = this.getMaxHeight(this.getHeight(node2.right), node1.height) + 1;
        return node2;
    }
    #rotateLeftR(node2){
        console.log("node2: " + node2);
        //por que node2 es null
        let node1 = node2.left;
        //if (node1 != null){
        //    node2.left = node1.right;
        //    node1.right = node2;
        //    node1.height = this.getMaxHeight(this.#deepRecursive(node1.left), node2.height) + 1;
        //}
        node2.left = node1.right;
        node1.right = node2;
        node1.height = this.getMaxHeight(this.getHeight(node1.left), node2.height) + 1;
        node2.height = this.getMaxHeight(this.getHeight(node2.left), this.getHeight(node2.right)) + 1;
        
        return node1;
    }

    #rotateLeft(node2){
        console.log("node2: " + node2);
        //por que node2 es null
        let node1 = node2.right;
        //if (node1 != null){
        //    node2.left = node1.right;
        //    node1.right = node2;
        //    node1.height = this.getMaxHeight(this.#deepRecursive(node1.left), node2.height) + 1;
        //}
        node2.left = node1.right;
        node1.right = node2;
        node1.height = this.getMaxHeight(this.getHeight(node1.left), node2.height) + 1;
        node2.height = this.getMaxHeight(this.getHeight(node2.left), this.getHeight(node2.right)) + 1;
        
        return node1;
    }

    #doubleLeft(node){
        console.log("nodewdfa: " + node.left);
        //se hace rotateRight y luego rotateLeft
        node.left = this.#rotateRight(node.left);
        return this.#rotateLeft(node);
    }
    #doubleRight(node22){
        //se hace rotateLeft y luego rotateRight
        console.log("nodewsdfaasdfdfa: " + node22.right);
        node22 = this.#rotateLeft(node22);
        
        return this.#rotateRight(node22);
    }

    //--------------------------------------------------------------------------
    //                  REPORTE DEL ARBOL
    //--------------------------------------------------------------------------

    treeGraph(){       
        nodes = "";
        connections = "";
        nivel = 0;
        this.#treeGraphRecursive(this.root);
        return nodes + connections;
    }

    //calcNivel(current){
    //        nivel = 0;
    //        while(current != null){
    //            nivel++;
    //            current = current.left;
    //        }
    //        return nivel;
    //    }
        
    #treeGraphRecursive(current){
        if(current.left != null){
            this.#treeGraphRecursive(current.left);
            connections += `S_${current.item.carnet} -> S_${current.left.item.carnet};\n`;
        }
        nodes += `S_${current.item.carnet}[label="${current.item.nombre}, ${current.item.carnet}, ${this.#balanceFactor(current)}"];`
        if(current.right != null){
            this.#treeGraphRecursive(current.right);
            connections += `S_${current.item.carnet} -> S_${current.right.item.carnet};\n`;
        }
    }

    
    //--------------------------------------------------------------------------
    //                  RECORRIDO IN ORDER
    //--------------------------------------------------------------------------
    inOrder(){
        let html = this.#inOrderRecursive(this.root);
        return html;
    }
    #inOrderRecursive(current){
        let row = "";
        if(current.left != null){
            row += this.#inOrderRecursive(current.left);
        }
        row +=`
            <tr>
                <th>${current.item.carnet}</th>
                <td>${current.item.nombre}</td>
                <td>${current.item.password}</td>
            </tr>
        `;
        if(current.right != null){
            row += this.#inOrderRecursive(current.right);
        }
        return row;
    }

    //--------------------------------------------------------------------------
    //                RECORRIDO IN ORDER MIENTRAS LLENA HASH TABLE
    //--------------------------------------------------------------------------

    encriptarXOR(contraseña, clave){
        let encriptado = "";
        for(let i = 0; i < contraseña.length; i++){
            encriptado += String.fromCharCode(contraseña.charCodeAt(i) ^ clave);
        }
        return encriptado;
    }

    inOrderHT(){
        //recorrer el arbol de forma inorder e ir llenando la hashTable
        this.#inOrderRecursive2(this.root);
    }
    #inOrderRecursive2(current){
        if(current.left != null){
            this.#inOrderRecursive2(current.left);
        }
        //llenar la hashTable
        console.log(current.item.carnet, current.item.nombre, current.item.password);
        tablaHashh.insert(current.item.carnet, current.item.nombre, this.encriptarXOR(current.item.password, 10));
        tablaHashh.recorrer();
        if(current.right != null){
            this.#inOrderRecursive2(current.right);
        }
        //guardar en el local storage
        localStorage.setItem("hashTable", JSON.stringify(tablaHashh));
    }

    //--------------------------------------------------------------------------
    //                  RECORRIDO PRE ORDER
    //--------------------------------------------------------------------------
    preOrder(){
        let html = this.#preOrderRecursive(this.root);
        return html;
    }
    #preOrderRecursive(current){
        let row = "";
        row +=`
            <tr>
                <th>${current.item.carnet}</th>
                <td>${current.item.nombre}</td>
                <td>${current.item.password}</td>
            </tr>
        `;
        if(current.left != null){
            row += this.#inOrderRecursive(current.left);
        }
        if(current.right != null){
            row += this.#inOrderRecursive(current.right);
        }
        return row;
    }

    //--------------------------------------------------------------------------
    //                  RECORRIDO POST ORDER
    //--------------------------------------------------------------------------
    postOrder(){
        let html = this.#postOrderRecursive(this.root);
        return html;
    }
    #postOrderRecursive(current){
        let row = "";
        if(current.left != null){
            row += this.#inOrderRecursive(current.left);
        }
        if(current.right != null){
            row += this.#inOrderRecursive(current.right);
        }
        row +=`
            <tr>
                <th>${current.item.carnet}</th>
                <td>${current.item.nombre}</td>
                <td>${current.item.password}</td>
            </tr>
        `;
        return row;
    }

} 
