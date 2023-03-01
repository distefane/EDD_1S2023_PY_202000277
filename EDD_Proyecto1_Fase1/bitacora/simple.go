package bitacora

import (
	"fmt"
	"strconv"
)

// Declaración de la estructura
type SimpleList struct {
	head *Node
}


//func (list *SimpleList) InsertarFecha(fecha string) {
//	fmt.Println("¿entra aquí también?")
//	newNode := &Node{fecha: fecha, next: nil}
//	// Verificar que la lista está vacía
//	if list.head == nil {
//		list.head = newNode
//	} else {
//		// Recorrer hasta encontrar el último nodo
//		temp := list.head
//		for temp.next != nil {
//			temp = temp.next
//		}
//		// Agregar el nuevo nodo hasta el final
//		temp.next = newNode
//	}
//}

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
func (list SimpleList) Print() {
	temp := list.head
	for temp.next != nil {
		fmt.Printf("%s, ", temp.nombre)
		fmt.Printf("%s, ", temp.apellido)
		fmt.Printf("%d, ", temp.carnet)
		fmt.Printf("%s, ", temp.contrasena)
		temp = temp.next
	}
	fmt.Printf("%s\n", temp.nombre)
	fmt.Printf("%s\n", temp.apellido)
	fmt.Printf("%d\n", temp.carnet)
	fmt.Printf("%s\n", temp.contrasena)
}

// Método para agregar un nodo al inicio de la lista
func (list *SimpleList) Apilar(nombre string, apellido string, carnet int, contrasena string, queHizo string, fecha string) {
	newNode := &Node{nombre: nombre, apellido: apellido, carnet: carnet, contrasena: contrasena, queHizo: queHizo, fecha: fecha, next: nil}
	if list.head == nil {
		list.head = newNode
	} else {
		newNode.next = list.head
		list.head = newNode
	}
}

// insertar al inicio
func (list *SimpleList) InsertarInicio(nombre string, apellido string, carnet int, contrasena string, queHizo string, fecha string) {
	newNode := &Node{nombre: nombre, apellido: apellido, carnet: carnet, contrasena: contrasena, queHizo: queHizo, fecha: fecha, next: nil}
	if list.head == nil {
		list.head = newNode
	} else {
		newNode.next = list.head
		list.head = newNode
	}
}

// insertar al final
func (list *SimpleList) InsertarFinal(nombre string, apellido string, carnet int, contrasena string, queHizo string, fecha string) {
	newNode := &Node{nombre: nombre, apellido: apellido, carnet: carnet, contrasena: contrasena, queHizo: queHizo, fecha: fecha, next: nil}
	if list.head == nil {
		list.head = newNode
	} else {
		temp := list.head
		for temp.next != nil {
			temp = temp.next
		}
		temp.next = newNode
	}
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
	for temp.next != nil {
		nodes += "N" + strconv.Itoa(counter) + "[label=\"Acción:" + temp.queHizo + "\nNombre: " + temp.nombre + "\nFecha: " + temp.fecha + "\"];\n"
		//conn += "N" + strconv.Itoa(counter)
		temp = temp.next
		counter++
	}
	nodes += "N" + strconv.Itoa(counter) + "[label=\"Acción:" + temp.queHizo + "\nNombre: " + temp.nombre + "\nFecha: " + temp.fecha + "\"];\n"
	//conn += "N" + strconv.Itoa(counter) + "\n"

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

func (list *SimpleList) Rechazar() {
	temp := list.head
	//eliminar el primero
	if temp != nil {
		list.head = temp.next
		fmt.Println("Estudiante rechazado.")
	} else {
		fmt.Println("No hay estudiantes pendientes de ingresar.")
	}
}

func (list *SimpleList) OrdenarCarnet() {
	temp := list.head
	var temp2 *Node
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
	nombre := temp.GetNombre()
	apellido := temp.GetApellido()
	carnet := temp.GetCarnet()
	return nombre, apellido, carnet
}

func (list *SimpleList) EnviarCadaElemento() (string, string, int, string) {
	temp := list.head
	for temp != nil {
		nombre := temp.GetNombre()
		apellido := temp.GetApellido()
		carnet := temp.GetCarnet()
		contrasena := temp.GetContrasena()
		return nombre, apellido, carnet, contrasena
	}	
	return "", "", 0, ""
}