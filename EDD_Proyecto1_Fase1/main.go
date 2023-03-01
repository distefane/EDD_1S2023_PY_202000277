package main

// importar lista_doble.go
import (
	"encoding/csv"
	"fase1/bitacora"
	//"fase1/bitacoraLogin"
	"fase1/doubly"
	"fase1/simple"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"
	"fase1/dot"
	//nolint
)

// Recibe la ruta del archivo como parámetro
func readCsvFile(filePath string) [][]string {
	f, err := os.Open(filePath)
	if err != nil {
		log.Fatal("Archivo no existe "+filePath, err)
	}
	defer f.Close()

	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Error en la lectura del archivo"+filePath, err)
	}
	return records
}

//var listaEstudiantesD doubly.DoublyList
	//var listaEstudiantesO doubly.DoublyList
	var colaEstudiantes simple.SimpleList
	var colaAceptados simple.SimpleList
	var bitacoraAdmin bitacora.SimpleList
	var listaEstudiantesO doubly.DoublyList
	//var bitacoraLog bitacoraLogin.SimpleList
	//var bitacoraEstudiante bitacora.SimpleList

func main() {
	
	// Hacer un ciclo while para que el usuario pueda ingresar al sistema
	// hasta que el usuario decida salir del sistema
	for {
		// Mostrar el menú principal
		fmt.Println("•••••••••••••••••••••••••••••••••")
		fmt.Println("•••••••••• EDD GoDrive ••••••••••")
		fmt.Println("•	1. Iniciar Sesión	•")
		fmt.Println("•	2. Salir del Sistema	•")
		fmt.Println("•••••••••••••••••••••••••••••••••")

		// Leer la opción del usuario
		var opcion int
		fmt.Print("Ingrese una opción: ")
		fmt.Scanln(&opcion)

		// Evaluar la opción del usuario
		switch opcion {
		case 1:
			// Iniciar sesión
			iniciarSesion()
		case 2:
			// Salir del sistema
			fmt.Println("Gracias por usar EDD GoDrive")
			return
		default:
			fmt.Println("Opción inválida")
		}
	}
}

func iniciarSesion() {
	

	// Leer el nombre de usuario
	var nombreUsuario string
	fmt.Print("Ingrese su nombre de usuario: ")
	fmt.Scanln(&nombreUsuario)

	// Leer la contraseña
	var contrasena string
	fmt.Print("Ingrese su contraseña: ")
	fmt.Scanln(&contrasena)

	// Validar el nombre de usuario y la contraseña
	if nombreUsuario == "admin" && contrasena == "admin" {
		// Mostrar el menú de usuario
		fmt.Println("Bienvenido", nombreUsuario)
		for {
			fmt.Println("••••••••• Dashboard Administrador - EDD GoDrive •••••••••")
			fmt.Println("•		1. Ver Estudiantes Pendientes		•")
			fmt.Println("•		2. Ver Estudiantes Del Sistema		•")
			fmt.Println("•		3. Registrar Nuevo Estudiante		•")
			fmt.Println("•		4. Carga Masiva de Estudiantes		•")
			fmt.Println("•		5. Bitácora de Administrador		•")
			fmt.Println("•		6. Cerrar Sesión			•")
			fmt.Println("•••••••••••••••••••••••••••••••••••••••••••••••••••••••••")
			// Leer la opción del usuario
			var opcionAdmin int
			fmt.Print("Ingrese una opción: ")
			fmt.Scanln(&opcionAdmin)

			// Evaluar la opción del usuario
			switch opcionAdmin {
			case 1:
				a := colaEstudiantes.Contador() 
				if len(a) != 0 {
					// Obtener la ruta de directorio actual
					path, err := os.Getwd()
					if err != nil {
						log.Println(err)
					}
					// Escribir el archivo .dot
					dot.WriteDotFile(colaEstudiantes.Graph(), "colaAR.dot", path)
					// Ejecutar COmando en consola
					dot.GeneratePNG("colaAR.dot", path)
					L:
					for {
						a := colaEstudiantes.Contador()
						// Obtener la ruta de directorio actual
						path, err := os.Getwd()
						if err != nil {
							log.Println(err)
						}
						// Escribir el archivo .dot
						dot.WriteDotFile(colaEstudiantes.Graph(), "colaAcep_Rech.dot", path)
						// Ejecutar COmando en consola
						dot.GeneratePNG("colaAcep_Rech.dot", path)

						fmt.Println("Cantidad de Estudiantes Pendientes: ", len(a))
						if len(a) == 0 {
							break
						}
						b, c, d := colaEstudiantes.ObtenerDatosPrimero()
						if d == 0 {
							fmt.Println("No hay más estudiantes pendientes.")
							fmt.Println("----------------------------------")
							fmt.Println("Regresando al menú principal...")
							break
						}
						fmt.Println("Actual: ", b, c, d)
						fmt.Println("¿Desea aceptar o rechazar al estudiante?")
						fmt.Println("1. Aceptar")
						fmt.Println("2. Rechazar")
						fmt.Println("3. Regresar")
						var opcion int
						fmt.Scanln(&opcion)
						name := ""
						apel := ""
						car := 0
						cont := ""
						switch opcion {
						case 1:
							// Aceptar estudiante
							if len(a) == 0 {
								fmt.Println("-----------------------------------------")
								fmt.Println("No hay estudiantes pendientes por aceptar")
								fmt.Println("-----------------------------------------")
							} else {
								// verificar que el carnet del nuevo alumno no exista en la listaEstudiantesO
								if listaEstudiantesO.Existe(d) {
									fmt.Println("El carnet ya existe en el sistema")
									fmt.Println("Rechazando estudiante...")
									colaEstudiantes.Rechazar()
									// Obtener la ruta de directorio actual
									path, err := os.Getwd()
									if err != nil {
										log.Println(err)
									}

									// Escribir el archivo .dot
									dot.WriteDotFile(colaEstudiantes.Graph(), "colaAR.dot", path)
									// Ejecutar COmando en consola
									dot.GeneratePNG("colaAR.dot", path)
									break
								}	
								name, apel, car, cont = colaEstudiantes.Aceptar()
								fmt.Println("Estudiante aceptado: ", name, apel, car, cont)
								colaAceptados.Encolar(name, apel, car, cont)

								colaAceptados.OrdenarCarnet()
								//var bitacora *bitacoraLogin.SimpleList
								listaEstudiantesO.InsertEnd(car, name, apel, cont)
								t := time.Now()
								//bitacoraAdmin.Apilar(name, apel, car, cont, "Se aceptó a", t.Format("2006-01-02 15:04:05"))
								bitacoraAdmin.InsertarFinal(name, apel, car, cont, "Se aceptó a", t.Format("2006-01-02 15:04:05"))
								fmt.Println(bitacoraAdmin.Graph())
								// Obtener la ruta de directorio actual
								path, err := os.Getwd()
								if err != nil {
									log.Println(err)
								}

								// Escribir el archivo .dot
								dot.WriteDotFile(bitacoraAdmin.Graph(), "bitacoraAdmin.dot", path)
								// Ejecutar COmando en consola
								dot.GeneratePNG("bitacoraAdmin.dot", path)
								fmt.Println("Doble sin ordenar")
								listaEstudiantesO.Graph()
								listaEstudiantesO.Ordenar()
								fmt.Println("Doble ordenada")
								listaEstudiantesO.Graph()
								//colaEstudiantes.Encolar(name, apel, car, cont)
								// Obtener la ruta de directorio actual

								// Escribir el archivo .dot
								dot.WriteDotFile(colaEstudiantes.Graph(), "colaAR.dot", path)
								// Ejecutar COmando en consola
								dot.GeneratePNG("colaAR.dot", path)
							}
						case 2:
							// Rechazar estudiante
							name, apel, car, cont = colaEstudiantes.Rechazar()
							t := time.Now()
							//bitacoraAdmin.Apilar(name, apel, car, cont, "Se rechazó a", t.Format("2006-01-02 15:04:05"))
							bitacoraAdmin.InsertarFinal(name, apel, car, cont, "Se rechazó a", t.Format("2006-01-02 15:04:05"))
							bitacoraAdmin.Graph()
							// Escribir el archivo .dot
							dot.WriteDotFile(bitacoraAdmin.Graph(), "bitacoraAdmin.dot", path)
							// Ejecutar COmando en consola
							dot.GeneratePNG("bitacoraAdmin.dot", path)
							// Obtener la ruta de directorio actual
							path, err := os.Getwd()
							if err != nil {
								log.Println(err)
							}

							// Escribir el archivo .dot
							dot.WriteDotFile(colaEstudiantes.Graph(), "colaAR.dot", path)
							// Ejecutar COmando en consola
							dot.GeneratePNG("colaAR.dot", path)
						case 3:
							// Regresar al menú anterior	
							fmt.Println("Regresando al menú anterior...")
							break L
						default:
							fmt.Println("Opción inválida")
						}
						}
				} else {
					fmt.Println("No hay estudiantes pendientes por aceptar")
					fmt.Println("-----------------------------------------")
				}

			case 2:
				// Recorrer lista de estudiantes ingresados previamente en el sistema
				listaEstudiantesO.OrdenarCarnet()
				listaEstudiantesO.Print()
				// Obtener la ruta de directorio actual
				path, err := os.Getwd()
				if err != nil {
					log.Println(err)
				}

				// Escribir el archivo .dot
				dot.WriteDotFile(listaEstudiantesO.Graph(), "dobleEstudiantesSistema.dot", path)
				// Ejecutar COmando en consola
				dot.GeneratePNG("dobleEstudiantesSistema.dot", path)
				listaEstudiantesO.GenerarJSON()


			case 3:
				// Registrar nuevo estudiante pidiendo datos individualmente
				fmt.Println("Registrar nuevo estudiante")
				fmt.Println("Ingrese el carnet del estudiante: ")
				var carnet int
				fmt.Scanln(&carnet)
				fmt.Println("Ingrese el nombre del estudiante: ")
				var nombre string
				fmt.Scanln(&nombre)
				fmt.Println("Ingrese el apellido del estudiante: ")
				var apellido string
				fmt.Scanln(&apellido)
				fmt.Println("Ingrese la contraseña del estudiante: ")
				var contrasena string
				fmt.Scanln(&contrasena)

				// Agregar el nuevo nodo a la lista de estudiantes pendientes
				colaEstudiantes.Encolar(nombre, apellido, carnet, contrasena)
				//la segudna
				colaEstudiantes.Graph()

			case 4:
				// Carga masiva de estudiantes através de un archivo .csv
				fmt.Println("Carga masiva de estudiantes")
				fmt.Println("Ingrese el nombre del archivo: ")
				var nombreArchivo string
				fmt.Scanln(&nombreArchivo)
				// Leer el archivo .csv
				records := readCsvFile("./" + nombreArchivo + ".csv")

				// Descripción del array
				// [[carnet, nombre, contraseña], [201780044,Leonardo Martinez,leo1234], ....]
				for index, row := range records { // EJEMPLO DE FOR EACH EN GOLANG
					if index > 0 { // Ignorar la primera línea de encabezado
						fmt.Printf("%d: %s\t%s\n", index, row[0], row[1])
						carnet := row[0]
						//convertir carnet a int
						carnetInt, err := strconv.Atoi(carnet)
						fmt.Println(err)
						nombre := strings.Split(row[1], " ")[0]
						apellido := strings.Split(row[1], " ")[1]
						contrasena := row[2]
						colaEstudiantes.Encolar(nombre, apellido, carnetInt, contrasena)
					}
				}

			case 5:
				// Ver bitácora de administrador
				bitacoraAdmin.Graph()
				fmt.Println("Bitácora de administrador")

			case 6:
				// Cerrar sesión, llevar a menú principal
				fmt.Println("Sesión cerrada")
				return
			default:
				fmt.Println("Opción inválida")
			}
		}
	} else {
		//Se recorre la lista doble para ver si el usuario existe
		logear := listaEstudiantesO.Login(nombreUsuario, contrasena)
		fmt.Println("logear: ", logear)

		if logear {
			horaFecha := time.Now()
			fmt.Println("Bienvenido", nombreUsuario)
			fmt.Println("Hora y fecha de inicio de sesión: ", horaFecha.Format("2006-01-02 15:04:05"))
			//recorrer la lista doble para ver si el usuario existe e insertar la fecha como nodo en la bitacora
			carnetN := listaEstudiantesO.BuscarNombreContrasena(nombreUsuario, contrasena)
			//logi := "Inicio de sesión el:"
			fmt.Println("Carnet del usuario: ", carnetN)

			//------------------------------------------------------------------------
			//esto todavía no lo he logrado hacer
			
			//listaEstudiantesO.BuscarInsertarFecha(logi, carnetN, horaFecha.Format("2006-01-02 15:04:05"))

			//fmt.Println("Imprimiendo la bitácora del usuario")
			//listaEstudiantesO.PrintB()
			//------------------------------------------------------------------------


		
		for {
			fmt.Println("•••••••••••••••••••••••••••••••••")
			fmt.Println("•••••••• Dashboard Usuario - EDD GoDrive ••••••••")
			fmt.Println("•		1. Ver Bitácora			•")
			fmt.Println("•		2. Cerrar Sesión		•")
			fmt.Println("•••••••••••••••••••••••••••••••••••••••••••••••••")
			// Leer la opción del usuario
			var opcionUser int
			fmt.Print("Ingrese una opción: ")
			fmt.Scanln(&opcionUser)

			// Evaluar la opción del usuario
			switch opcionUser {
			case 1:
				// Recorrer lista de las sesiones iniciadas por el usuario
				fmt.Println("Bitácora")
			case 2:
				// Cerrar sesión, llevar a menú principal
				fmt.Println("Sesión cerrada")
				return
			default:
				fmt.Println("Opción inválida")
			}
		}
	} else {
		fmt.Println("Usuario o contraseña incorrectos")
	}
	}
}