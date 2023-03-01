package bitacora

//El nodo solito xd
type Node struct {
	carnet int
	nombre string
	apellido string
	contrasena string
	queHizo string
	fecha string
	next  *Node
}

func (n *Node) SetNombre(nombre string) {
	n.nombre = nombre
}

func (n *Node) SetApellido(apellido string) {
	n.apellido = apellido
}

func (n *Node) SetContrasena(contrasena string) {
	n.contrasena = contrasena
}

func (n *Node) SetCarnet(carnet int) {
	n.carnet = carnet
}

func (n *Node) SetQueHizo(queHizo string) {
	n.queHizo = queHizo
}

func (n *Node) SetFecha(fecha string) {
	n.fecha = fecha
}

func (n *Node) GetNombre() string {
	return n.nombre
}

func (n *Node) GetApellido() string {
	return n.apellido
}

func (n *Node) GetContrasena() string {
	return n.contrasena
}

func (n *Node) GetCarnet() int {
	return n.carnet
}

func (n *Node) GetQueHizo() string {
	return n.queHizo
}

func (n *Node) GetFecha() string {
	return n.fecha
}