package simple

import (
	"fmt"
	"strconv"
)

// Declaración de la estructura
type SimpleList struct {
	head *Node
}

// Se agrega el puntero hacia el struct para hacerlo parte de el
func (list *SimpleList) Encolar(nombre string, apellido string, carnet int, contrasena string) {
	//Declarar nuevo nodo
	newNode := &Node{nombre: nombre, apellido: apellido, carnet: carnet, contrasena: contrasena, next: nil}
	//Verificar si la lista está vacía
	if list.head == nil {
		list.head = newNode
	} else {
		//Recorrer hasta encontrar el último nodo
		temp := list.head
		for temp.next != nil {
			temp = temp.next
		}
		//Agregar el nuevo nodo hasta el final
		temp.next = newNode
	}
}

// Método para imprimir la lista
func (list SimpleList) Print() bool{
	temp := list.head
	if temp == nil {
		return false
	}else{for temp.next != nil {
		fmt.Printf("%s, ", temp.nombre)
		fmt.Printf("%s, ", temp.apellido)
		fmt.Printf("%d, ", temp.carnet)
		fmt.Printf("%s, ", temp.contrasena)
		temp = temp.next
	}
	fmt.Printf("%s\n", temp.nombre)
	fmt.Printf("%s\n", temp.apellido)
	fmt.Printf("%d\n", temp.carnet)
	fmt.Printf("%s\n", temp.contrasena)}
	
	return true
}

// Método para agregar un nodo al inicio de la lista
func (list *SimpleList) Apilar(nombre string, apellido string, carnet int, contrasena string) {
	newNode := &Node{nombre: nombre, apellido: apellido, carnet: carnet, contrasena: contrasena, next: nil}
	if list.head == nil {
		list.head = newNode
	} else {
		newNode.next = list.head
		list.head = newNode
	}
}
/*
func (list *SimpleList) Graph() {
	temp := list.head
	nodes := ""
	conn := ""
	counter := 0
	for temp.next != nil {
		nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.carnet) + "\nNombre: " + temp.nombre + "\nApellido: " + temp.apellido + "\nContraseña: " + temp.contrasena + "\"];\n"
		conn += "N" + strconv.Itoa(counter) + "->"
		temp = temp.next
		counter++
	}
	nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.carnet) + "\nNombre: " + temp.nombre + "\nApellido: " + temp.apellido + "\nContraseña: " + temp.contrasena + "\"];\n"
	conn += "N" + strconv.Itoa(counter) + "\n"

	fmt.Println(nodes)
	fmt.Println(conn)
}
*/

// método que envíe los elementos sin eliminarlos
func (list *SimpleList) EnviarCadaElemento2() (string, string, int, string) {
	temp := list.head
	for temp != nil {
		nombre := temp.GetNombre()
		apellido := temp.GetApellido()
		carnet := temp.GetCarnet()
		contrasena := temp.GetContrasena()
		// que continue con el siguiente
		temp = temp.next
		return nombre, apellido, carnet, contrasena
	}	
	return "", "", 0, ""
}

func (list *SimpleList) Graph() string {
	temp := list.head
	nodes := ""
	conn := ""
	counter := 0
	if temp == nil {
		return "digraph G {\n" +
		"node[shape=rectangle, style=filled, color=lightblue];\n" +
		"}"
	}

	// Recorrer la lista desde el primero hasta el último
	for temp.next != nil {
		nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.carnet) + "\nNombre: " + temp.nombre + "\nApellido: " + temp.apellido + "\nContraseña: " + temp.contrasena + "\"];\n"
		conn += "N" + strconv.Itoa(counter) + "->"
		temp = temp.next
		counter++
	}
	nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.carnet) + "\nNombre: " + temp.nombre + "\nApellido: " + temp.apellido + "\nContraseña: " + temp.contrasena + "\"];\n"
	conn += "N" + strconv.Itoa(counter) + "\n" 

	return "digraph G {\n" +
		"node[shape=rectangle, style=filled, color=lightblue];\n" +
		"rankdir=RL;\n" +
		nodes + // NODOS
		conn + // CONEXIONES
		"\n}"
}

func (list *SimpleList) Aceptar() (string, string, int, string) {
	temp := list.head
	
	nombre := temp.GetNombre()
	apellido := temp.GetApellido()
	carnet := temp.GetCarnet()
	contrasena := temp.GetContrasena()

	//eliminar el primero
	if temp != nil {
		
		list.head = temp.next

		fmt.Println("Estudiante aceptado.")
	} else {
		fmt.Println("No hay estudiantes pendientes de ingresar.")
	}

	return nombre, apellido, carnet, contrasena
	
}

func (list *SimpleList) Rechazar()(string, string, int, string) {
	temp := list.head
	
	nombre := temp.GetNombre()
	apellido := temp.GetApellido()
	carnet := temp.GetCarnet()
	contrasena := temp.GetContrasena()

	//eliminar el primero
	if temp != nil {
		
		list.head = temp.next

		fmt.Println("Estudiante rechazado.")
	} else {
		fmt.Println("No hay estudiantes pendientes de ingresar.")
	}

	return nombre, apellido, carnet, contrasena
	
}

func (list *SimpleList) Login(usuario string, contrasena string) bool{
	temp := list.head

	for temp != nil {
		if temp.nombre == usuario && temp.contrasena == contrasena {
			return true
		}
		temp = temp.next
	}
	return false
}

func (list *SimpleList) OrdenarCarnet() bool {
	temp := list.head
	var temp2 *Node
	if temp == nil {
		return false
	} else {
	for temp != nil {
		temp2 = temp.next
		for temp2 != nil {
			if temp.carnet > temp2.carnet {
				temp.carnet, temp2.carnet = temp2.carnet, temp.carnet
				temp.nombre, temp2.nombre = temp2.nombre, temp.nombre
				temp.apellido, temp2.apellido = temp2.apellido, temp.apellido
				temp.contrasena, temp2.contrasena = temp2.contrasena, temp.contrasena
			}
			temp2 = temp2.next
		}
		temp = temp.next
	}
	}
	return true 
}

func (list *SimpleList) Contador() string {
	temp := list.head
	counter := 0
	cadena := ""
	for temp != nil {
		counter++
		cadena += "a"
		temp = temp.next
	}
	return cadena
}

func (list *SimpleList) ObtenerDatosPrimero() (string, string, int) {
	temp := list.head
	if temp != nil {
		nombre := temp.GetNombre()
		apellido := temp.GetApellido()
		carnet := temp.GetCarnet()
		return nombre, apellido, carnet
	} else {
		return "No hay", "Estudiantes Pendientes", 0
	}
}

func (list *SimpleList) EnviarCadaElemento() (string, string, int, string) {
	temp := list.head
	for temp != nil {
		nombre := temp.GetNombre()
		apellido := temp.GetApellido()
		carnet := temp.GetCarnet()
		contrasena := temp.GetContrasena()
		list.head = temp.next
		return nombre, apellido, carnet, contrasena
	}	
	return "", "", 0, ""
}


