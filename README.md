# EDD_1S2023_PY_202000277
**¿Qué hace el proyecto?** 
A través de un menú de inicio se puede iniciar sesión como estudiante o administrador. En el caso de iniciar sesión como estudiante, se busca que exista en el sistema y se procede a pasar. En el caso que se realice un inicio de sesión como administrador se tiene acceso a opciones como: Ver Estudiantes Pendientes, Ver Estudiantes Del Sistema, Registrar Nuevo Estudiante, Carga Masiva de Estudiantes, Bitácora de Administrador, Cerrar Sesión.

1. En el caso de seleccionar "Ver Estudiantes Pendientes": Si usted cargó previamente a la cola de espera estudiantes, aquí podrá visualizar el que aparece de primero en la cola y podrá aceptarlo o rechazarlo. En caso que aparezca algún carnet que ya exista en el sistema, sin importar si lo acepta o rechaza, el sistema lo descarta. Al aceptar o rechazar, la información va directo a la bitácora del administrador, donde se registra la fecha y hora en la que aceptó o rechazó a un estudiante.

2. Si selecciona "Ver Estudiantes del Sistema": Usted podrá visualizar en consola de forma ordenada según el carnet, los estudiantes previamente aceptados en el sistema. En este caso, se realiza una salida JSON con los usuarios aceptados con sus datos y se genera un .png donde figuran los estudiantes en una lista doble con su nombre, apellido y carnet, ordenados según el carnet.

3. En caso de seleccionar "Registrar Nuevo Estudiante": Puede registrar de forma individual un estudiante ingresando manualmente sus datos, como nombre, apellido, carnet y contraseña. En este caso el nombre del estudiante será el usuario al momento de iniciar sesión. Recuerde que al ingresar un nuevo estudiante, este se dirigirá a la cola de espera para que usted proceda a aceptarlo.

4. Si usted selecciona "Carga Masiva de Estudiantes": Podrá escribir el nombre de su archivo .csv con el formato correcto y el sistema podrá cargar automáticamente sus estudiantes y los enviará a cola para posteriormente ser aceptados al seleccionar "Ver Estudiantes Pendientes".

5. Si selecciona "Bitácora de Administrador": Puede consultar la pila del administrador donde se registró previamente cuando se aceptó o rechazó a algún estudiante.

6. Si cierra sesión se le lleva al panel principal donde le consulta si usted desea iniciar sesión o cerrar el programa.

**Por qué el proyecto es útil.**
Porque permite el almacenamiento, administración y manejo de los datos de los estudiantes y su acceso.

**Quién mantiene y contribuye con el proyecto.**
Diana Berducido, Carnet: 202000277.
