package bitacoraLogin

import (
	"fmt"
	"strconv"
)

// Declaración de la estructura
type SimpleList struct {
	Head *NodeB
	
}
// insertar al inicio
func (list *SimpleList) InsertarFecha(log string, fecha string) {
	print("¿llega acá?")
	newNode := &NodeB{queHizo: log, fecha: fecha, Next: nil}
	if list.Head == nil {
		list.Head = newNode
	} else {
		temp := list.Head
		list.Head = newNode
		newNode.Next = temp
	}
}

// Método para imprimir la lista
func (list SimpleList) Print() {
	temp := list.Head
	for temp.Next != nil {
		fmt.Printf("%s, ", temp.queHizo)
		fmt.Printf("%s, ", temp.fecha)
		temp = temp.Next
	}
	fmt.Printf("%s\n", temp.queHizo)
	fmt.Printf("%s\n", temp.fecha)
}

func (list *SimpleList) Graph() {
	temp := list.Head
	nodes := ""
	conn := ""
	counter := 0
	for temp.Next != nil {
		nodes += "N" + strconv.Itoa(counter) + "[label=\"Acción:" + temp.queHizo + "\nFecha: " + temp.fecha + "\"];\n"
		conn += "N" + strconv.Itoa(counter) + "->"
		temp = temp.Next
		counter++
	}
	nodes += "N" + strconv.Itoa(counter) + "[label=\"Acción:" + temp.queHizo + "\nFecha: " + temp.fecha + "\"];\n"
	conn += "N" + strconv.Itoa(counter) + "\n"

	fmt.Println(nodes)
	fmt.Println(conn)
}

func (list *SimpleList) Contador() string {
	temp := list.Head
	counter := 0
	cadena := ""
	for temp != nil {
		counter++
		cadena += "a"
		temp = temp.Next
	}
	return cadena
}