package doubly

import (
	//"fase1/bitacoraLogin"
	"fmt"
	"strconv"
	"os"
	"log"
)

type DoublyList struct {
	head *Node
	tail *Node
}
 


//metodo para imprimir la bitacora
func (list *DoublyList) PrintB() {

	temp := list.head
	for temp.Next != nil {
		fmt.Printf("%d, ", temp.Carnet)
		fmt.Printf("%s, ", temp.Nombre)
		temp.Bitacora.Graph()
		temp = temp.Next
	}
}

func (list *DoublyList) InsertEnd(carnet int, nombre string, apellido string, contrasena string) {
	newNode := &Node{Carnet: carnet, Nombre: nombre, Apellido: apellido, Contrasena: contrasena, Prev: nil, Next: nil}
	// Verificar si la lista está vacía
	if list.head == nil {
		list.head = newNode
		list.tail = newNode
	} else {
		// Apuntador del nodo nuevo al final
		list.tail.Next = newNode
		// Apuntador del nodo nuevo a la cola
		newNode.Prev = list.tail
		// Cabiar la cola al nodo nuevo
		list.tail = newNode
	}
}

// Vaciar y volver a insertar lista
func (list *DoublyList) Vaciar() {
	list.head = nil
	list.tail = nil
}

//ordenar lista
func (list *DoublyList) Ordenar() {
	temp := list.head
	for temp.Next != nil {
		temp2 := temp.Next
		for temp2 != nil {
			if temp.Carnet > temp2.Carnet {
				temp.Carnet, temp2.Carnet = temp2.Carnet, temp.Carnet
				temp.Nombre, temp2.Nombre = temp2.Nombre, temp.Nombre
				temp.Apellido, temp2.Apellido = temp2.Apellido, temp.Apellido
				temp.Contrasena, temp2.Contrasena = temp2.Contrasena, temp.Contrasena
			}
			temp2 = temp2.Next
		}
		temp = temp.Next
	}
}

// GENERAR CÓDIGO GRAPHVIZ
func (list *DoublyList) Graph() string {
	temp := list.head
	if temp == nil {
		fmt.Println("Lista vacía")
		return ""
	}
	nodes := ""
	//nodP := ""
	conn := ""
	//counterP := 0
	counter := 0
	//apuntar := ""
	for temp.Next != nil {
		nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.Carnet) + "\nNombre: " + temp.Nombre + "\nApellido: " + temp.Apellido + "\nContraseña: " + temp.Contrasena + "\"];\n"
		conn += "N" + strconv.Itoa(counter) + "->"
		//for temp.Next.Bitacora.Head != nil {
		//	for temp.Next.Bitacora.Head.Next != nil {
		//	nodP += "Stack" + strconv.Itoa(counterP)  + "[label=\"" +"Inicio de sesión en:" + temp.Bitacora.Head.GetFecha() + "\"];\n"
		//	temp.Bitacora.Head = temp.Bitacora.Head.Next
		//	apuntar += "Stack" + strconv.Itoa(counterP) + "->" + "N" + strconv.Itoa(counter) + ";\n"
		//	counterP++
		//}
		temp = temp.Next
		counter++
	}
	nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.Carnet) + "\nNombre: " + temp.Nombre + "\nApellido: " + temp.Apellido + "\nContraseña: " + temp.Contrasena + "\"];\n"
	conn += "N" + strconv.Itoa(counter) + "\n"

	temp = list.tail
	for temp.Prev != nil {
		conn += "N" + strconv.Itoa(counter) + "->"
		temp = temp.Prev
		counter--
	}
	conn += "N" + strconv.Itoa(counter)

	return "digraph G {\n" +
		"node[shape=rectangle, style=filled, color=lightsalmon];\n" +
		"rankdir=LR;\n" +
		nodes + // NODOS
		conn + // CONEXIONES
		"\n}"
}

// IMPRIMIR
func (list *DoublyList) Print() {
	temp := list.head
	if temp == nil {
		fmt.Println("Aún no hay estudiantes en el sistema.")
	} else {
		fmt.Println("••••••••••••••Estudiantes en el sistema:••••••••••••••")
		if temp != nil {
			for temp.Next != nil {
				datos := "Carnet: " + strconv.Itoa(temp.GetCarnet()) + ", " + "Nombre:" + temp.GetNombre() + " " + temp.GetApellido()
				fmt.Println(datos)
				fmt.Println("••••••••••••••••••••••••••••••••••••••••••••••••••••••")
				temp = temp.Next
			}
			datos := "Carnet: " + strconv.Itoa(temp.GetCarnet()) + ", " + "Nombre:" + temp.GetNombre() + " " + temp.GetApellido()
			fmt.Println(datos)
			fmt.Println("••••••••••••••••••••••••••••••••••••••••••••••••••••••")
		} else {
			fmt.Println("No hay estudiantes pendientes de ingresar.")
	}
}
}

func (list *DoublyList) BuscarInsertarFecha(logi string, carnet int, fecha string) {
	temp := list.head
	if temp != nil {
		for temp.Next != nil {
			if temp.GetCarnet() == carnet {
				//recibir la fecha como insertar dentro de la bitacora
				fmt.Println("entra?")
				temp.Bitacora.InsertarFecha(logi ,fecha)
			}
			temp = temp.Next
		}
		if temp.GetCarnet() == carnet {
			temp.Bitacora.InsertarFecha(logi, fecha)
		}
	} else {
		fmt.Println("No hay estudiantes pendientes de ingresar.")
	}
}

func (list *DoublyList) Contador() int {
	temp := list.head
	counter := 0
	if temp != nil {
		for temp.Next != nil {
			counter++
			temp = temp.Next
		}
		counter++
	} else {
		fmt.Println("-----------------------------------------")
	}
	return counter
}

func (list *DoublyList) ObtenerDatosPrimero() (string, string, int) {
	temp := list.head
	
	if temp != nil {
		name := temp.GetNombre()
		apellido := temp.GetApellido()
		carnet := temp.GetCarnet()
		return name, apellido, carnet
	} else {
		fmt.Println("No hay estudiantes pendientes de ingresar.")
	}
	return "", "", 0
}

func (list *DoublyList) Acepta() (string, string, int, string) {
	temp := list.head
	
	nombre := temp.GetNombre()
	apellido := temp.GetApellido()
	carnet := temp.GetCarnet()
	contrasena := temp.GetContrasena()

	//eliminar el primero
	if temp != nil {
		
		list.head = temp.Next
		list.head.Prev = nil

		fmt.Println("Estudiante aceptado.")
	} else {
		fmt.Println("No hay estudiantes pendientes de ingresar.")
	}

	return nombre, apellido, carnet, contrasena
	
}

func (list *DoublyList) Rechaza() {
	temp := list.head
	
	//eliminar el primero
	if temp != nil {
		list.head = temp.Next
		list.head.Prev = nil
		fmt.Println("Estudiante rechazado.")
	} else {
		fmt.Println("No hay estudiantes pendientes de ingresar.")
	}
	
}

//Ordenar por carnet
func (list *DoublyList) OrdenarCarnet() {
	temp := list.head
	var carnet int
	var nombre string
	var apellido string
	var contrasena string
	if temp != nil {
		for temp.Next.Next != nil {
			//que lo ordene todo de una vez
			if temp.Carnet > temp.Next.Carnet {
				carnet = temp.Carnet
				nombre = temp.Nombre
				apellido = temp.Apellido
				contrasena = temp.Contrasena

				temp.Carnet = temp.Next.Carnet
				temp.Nombre = temp.Next.Nombre
				temp.Apellido = temp.Next.Apellido
				temp.Contrasena = temp.Next.Contrasena

				temp.Next.Carnet = carnet
				temp.Next.Nombre = nombre
				temp.Next.Apellido = apellido
				temp.Next.Contrasena = contrasena
			}
			temp = temp.Next
		}
	} else {
		fmt.Println("No hay estudiantes en el sistema.")
	}
}

// Buscar por el nombre y contraseña y retornar el carnet
func (list *DoublyList) BuscarNombreContrasena(nombre string, contrasena string) int {
	temp := list.head
	if temp != nil {
		for temp.Next != nil {
			if temp.GetNombre() == nombre && temp.GetContrasena() == contrasena {
				return temp.GetCarnet()
			}
			temp = temp.Next
		}
		if temp.GetNombre() == nombre && temp.GetContrasena() == contrasena {
			return temp.GetCarnet()
		}
	} else {
		fmt.Println("No hay estudiantes en el sistema.")
	}
	return 0
}

// Hacer un método para el login
func (list *DoublyList) Login(nombre string, contrasena string) bool {
	temp := list.head
	if temp != nil {
		for temp.Next != nil {
			if temp.GetNombre() == nombre && temp.GetContrasena() == contrasena {
				return true
			}
			temp = temp.Next
		}
		if temp.GetNombre() == nombre && temp.GetContrasena() == contrasena {
			return true
		}
	} else {
		fmt.Println("No hay estudiantes en el sistema.")
	}
	return false
}

//Verificar si el carnet existe en la lista
func (list *DoublyList) Existe(carnet int) bool {
	temp := list.head
	if temp != nil {
		for temp.Next != nil {
			if temp.GetCarnet() == carnet {
				return true
			}
			temp = temp.Next
		}
		if temp.GetCarnet() == carnet {
			return true
		}
	} else {
		fmt.Println("No hay estudiantes en el sistema.")
	}
	return false
}

// Generar JSON
func (list *DoublyList) GenerarJSON() {
	// Abrir el archivo
	f, err := os.Create("estudiantes.json")
	if err != nil {
		log.Fatal("Error al crear el archivo", err)
	}
	defer f.Close()

	// Escribir el encabezado del archivo JSON
	f.WriteString("[\n")

	// Escribir los estudiantes en el archivo JSON
	// Recorrer la lista de estudiantes
	temp := list.head
	if temp == nil {
		fmt.Println("No hay estudiantes en el sistema.")
		return
	}
	for temp.Next != nil {
		// Escribir el estudiante en el archivo JSON
		f.WriteString("\t{\n")
		f.WriteString("\t\t\"carnet\": " + strconv.Itoa(temp.Carnet) + ",\n")
		f.WriteString("\t\t\"nombre\": \"" + temp.Nombre + "\",\n")
		f.WriteString("\t\t\"contrasena\": \"" + temp.Contrasena + "\",\n")
		f.WriteString("\t\t\"carpeta_raiz\": \"" + "/" + "\"\n")
		f.WriteString("\t},\n")

		// Pasar al siguiente estudiante
		temp = temp.Next
	}

	// Escribir el último estudiante en el archivo JSON
	f.WriteString("\t{\n")
	f.WriteString("\t\t\"carnet\": " + strconv.Itoa(temp.Carnet) + ",\n")
	f.WriteString("\t\t\"nombre\": \"" + temp.Nombre + "\",\n")
	f.WriteString("\t\t\"contrasena\": \"" + temp.Contrasena + "\",\n")
	f.WriteString("\t\t\"carpeta_raiz\": \"" + "/" + "\"\n")
	f.WriteString("\t}\n")

	// Escribir el final del archivo JSON
	f.WriteString("]\n")

	// Cerrar el archivo
	f.Close()

	// Mostrar mensaje de éxito
	fmt.Println("Archivo JSON generado con éxito")
}