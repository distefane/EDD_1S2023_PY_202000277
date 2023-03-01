package doubly

// importar la lista simple
import (
	"fase1/bitacoraLogin"
)

type Node struct {
	Carnet int
	Nombre string
	Apellido string
	Contrasena string
	// hacer un atributo de tipo pila para las fechas de login
	// hacer un atributo de tipo lista simple para las fechas de login
	Bitacora *bitacoraLogin.SimpleList
	Next   *Node
	Prev   *Node
}

func (n *Node) GetCarnet() int {
	return n.Carnet
}

func (n *Node) GetNombre() string {
	return n.Nombre
}

func (n *Node) GetApellido() string {
	return n.Apellido
}

func (n *Node) GetContrasena() string {
	return n.Contrasena
}


func (n *Node) SetNombre(str string) {
	n.Nombre = str
}

func (n *Node) SetCarnet(carnet int) {
	n.Carnet = carnet
}

func (n *Node) SetApellido(apellido string) {
	n.Apellido = apellido
}

func (n *Node) SetContrasena(contrasena string) {
	n.Contrasena = contrasena
}

func (n *Node) SetPila(pila *bitacoraLogin.SimpleList) {
	n.Bitacora = pila
}