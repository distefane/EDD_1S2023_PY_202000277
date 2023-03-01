# EDD_1S2023_PY_202000277
**¿Qué hace el proyecto?** 
A través de un menú de inicio se puede iniciar sesión como estudiante o administrador. En el caso de iniciar sesión como estudiante, se busca que exista en el sistema y se procede a pasar. En el caso que se realice un inicio de sesión como administrador se tiene acceso a opciones como: Ver Estudiantes Pendientes, Ver Estudiantes Del Sistema, Registrar Nuevo Estudiante, Carga Masiva de Estudiantes, Bitácora de Administrador, Cerrar Sesión.

1. En el caso de seleccionar **"Ver Estudiantes Pendientes"**: Si usted cargó previamente a la cola de espera estudiantes, aquí podrá visualizar el que aparece de primero en la cola y podrá aceptarlo o rechazarlo. En caso que aparezca algún carnet que ya exista en el sistema, sin importar si lo acepta o rechaza, el sistema lo descarta. Al aceptar o rechazar, la información va directo a la bitácora del administrador, donde se registra la fecha y hora en la que aceptó o rechazó a un estudiante.

2. Si selecciona **"Ver Estudiantes del Sistema"**: Usted podrá visualizar en consola de forma ordenada según el carnet, los estudiantes previamente aceptados en el sistema. En este caso, se realiza una salida JSON con los usuarios aceptados con sus datos y se genera un .png donde figuran los estudiantes en una lista doble con su nombre, apellido y carnet, ordenados según el carnet.

3. En caso de seleccionar **"Registrar Nuevo Estudiante"**: Puede registrar de forma individual un estudiante ingresando manualmente sus datos, como nombre, apellido, carnet y contraseña. En este caso el nombre del estudiante será el usuario al momento de iniciar sesión. Recuerde que al ingresar un nuevo estudiante, este se dirigirá a la cola de espera para que usted proceda a aceptarlo.

4. Si usted selecciona **"Carga Masiva de Estudiantes"**: Podrá escribir el nombre de su archivo .csv con el formato correcto y el sistema podrá cargar automáticamente sus estudiantes y los enviará a cola para posteriormente ser aceptados al seleccionar "Ver Estudiantes Pendientes".

5. Si selecciona **"Bitácora de Administrador"**: Puede consultar la pila del administrador donde se registró previamente cuando se aceptó o rechazó a algún estudiante.

6. Si **cierra sesión** se le lleva al panel principal donde le consulta si usted desea iniciar sesión o cerrar el programa.

**Estructuras**
  Para la **doblemente enlazada** se creó un nodo de la siguiente manera:
  type Node struct {
    Carnet int
    Nombre string
    Apellido string
    Contrasena string
    Bitacora *bitacoraLogin.SimpleList
    Next   *Node
    Prev   *Node
  }
  Para la que se supone que recibiría una bitácora del paquete bitacoraLogin de tipo Simplelist, pero ese proceso no pudo ser culminado.
  La lista doblemente enlazada tiene métodos como: InsertEnd, para insertar los nodos de los estudiantes al final de la lista; OrdenarCarnet para ordenar la    lista cada vez que se le solicitaba; Print que es el método que imprime los datos en consola luego de ser ordenados; Login que busca en la lista que el carnet y  nombre dados existan en alguno de los nodos y retorne un boolean; GenerarJSON es para enviar la lista doble en datos ordenados a un archivo JSON que se usará en las siguientes fases.
  
  **Capturas de las susodichas**
  ![image](https://user-images.githubusercontent.com/99098604/222050990-edc5015f-fffc-4dcb-ad2d-4d874290c439.png)
![image](https://user-images.githubusercontent.com/99098604/222051058-bb240f49-290d-4e8c-93e5-409039a9ae13.png)
![image](https://user-images.githubusercontent.com/99098604/222051128-aa0f16f2-1cfd-4ab1-a161-891a9cd2fb8a.png)
![image](https://user-images.githubusercontent.com/99098604/222051165-c93c883d-04d3-4a4c-82f9-a687956a0aca.png)
![image](https://user-images.githubusercontent.com/99098604/222051222-7c35e788-3fc5-4a84-8a27-b8be5084e21b.png)
  
  Para la **simple** que se refleja en bitacoraAdmin, bitacoraLogin, colaAceptados y colaEstudiantes, se crearon nodos del tipo: 
  type Node struct {
	carnet int
	nombre string
	apellido string
	contrasena string
	queHizo string
	fecha string
	next  *Node
  }
  type NodeB struct {
	queHizo string
	fecha string
	Next  *NodeB
  }
  type Node struct {
	carnet int
	nombre string
	apellido string
	contrasena string
	next  *Node
  }
  Las listas están por separado pero llevan lógicas similares por tratarse de listas simples. La forma en que difieren es en el tipo de llenado y graficado de las mismas, porque algunas son consideradas pilas y otras consideradas colas. Los métodos que incluían éstas son: Encolar, que añadía los elementos al final de la lista; Apilar, que añadía los objetos al inicio de la lista; EnviarCadaElemento se utilizó para pasar los datos de cada estudiante a la lista doble, al momento; Aceptar y Rechazar eliminaban el nodo que se estaba viendo al principio y retornaba los datos para pasarlos a la lista doble ya estando como aceptados o a la pila ambos para que se registrara en la bitácora del Administrador que indicaba qué acciones realizó sobre los estudiantes; OrdenarCarnet y Login fueron usados al inicio pero retirados para se utilizados en la lista doble directamente; ObtenerDatosPrimero se encargaba de mostrar en consola los datos del primer estudiante para que se aceptara o rechazara en el sistema.
  
  **Capturas de las susodichas:**
  ![image](https://user-images.githubusercontent.com/99098604/222051356-f817709e-ca0e-44b7-805a-165bae0eeef8.png)
![image](https://user-images.githubusercontent.com/99098604/222051391-851cbe7e-6ae6-4e3c-aa2f-3b747d5e223e.png)
![image](https://user-images.githubusercontent.com/99098604/222051500-cee97ed8-a103-441f-981d-a362bc209276.png)
![image](https://user-images.githubusercontent.com/99098604/222051536-a614aa87-b72d-43ec-b61b-05a87f397e86.png)
![image](https://user-images.githubusercontent.com/99098604/222051562-bc210124-f0b6-4e8f-a389-4b2524b2f310.png)
![image](https://user-images.githubusercontent.com/99098604/222051644-25e62bcb-9408-4bdc-ae0c-b194d0ffadaa.png)
![image](https://user-images.githubusercontent.com/99098604/222051686-7e5143cf-d241-40db-857b-38c33de3072d.png)
![image](https://user-images.githubusercontent.com/99098604/222051754-a9dba120-a84a-4b43-b85b-adb27d9513b8.png)
  
**Por qué el proyecto es útil.**
Porque permite el almacenamiento, administración y manejo de los datos de los estudiantes y su acceso.

**Quién mantiene y contribuye con el proyecto.**
Diana Berducido, Carnet: 202000277.
