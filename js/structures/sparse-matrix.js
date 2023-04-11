//creacion de la matriz dispersa que reciba como parametro un string, un numero y un string
class SparseMatrix{
    constructor(){
        this.head = new Node(0,0);
        this.head.right = this.head;
        this.head.down = this.head;
    }
    //insertar un nodo en la matriz
    insert(x, y, value){
        let temp = this.head;
        let tempX = this.head;
        let tempY = this.head;
        //buscar en x
        while(tempX.right != this.head && tempX.right.x < x){
            tempX = tempX.right;
        }
        //si no existe el nodo en x
        if(tempX.right == this.head || tempX.right.x > x){
            let newNode = new Node(x, 0);
            newNode.right = tempX.right;
            tempX.right = newNode;
            tempX = newNode;
        }
        //buscar en y
        while(tempY.down != this.head && tempY.down.y < y){
            tempY = tempY.down;
        }
        //si no existe el nodo en y
        if(tempY.down == this.head || tempY.down.y > y){
            let newNode = new Node(0, y);
            newNode.down = tempY.down;
            tempY.down = newNode;
            tempY = newNode;
        }
        //buscar en x y en y
        while(temp.right != this.head && temp.right.x < x){
            temp = temp.right;
        }
        while(temp.down != this.head && temp.down.y < y){
            temp = temp.down;
        }
        //si no existe el nodo en x y en y
        if(temp.right == this.head || temp.right.x > x || temp.down == this.head || temp.down.y > y){
            let newNode = new Node(x, y);
            newNode.right = temp.right;
            temp.right = newNode;
            newNode.down = temp.down;
            temp.down = newNode;
            temp = newNode;
        }
        //si existe el nodo en x y en y
        temp.value = value;
    }
}