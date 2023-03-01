package bitacoraLogin

type NodeB struct {
	queHizo string
	fecha string
	Next  *NodeB
}


func (n *NodeB) SetQueHizo(queHizo string) {
	n.queHizo = queHizo
}

func (n *NodeB) SetFecha(fecha string) {
	n.fecha = fecha
}

func (n *NodeB) GetQueHizo() string {
	return n.queHizo
}

func (n *NodeB) GetFecha() string {
	return n.fecha
}