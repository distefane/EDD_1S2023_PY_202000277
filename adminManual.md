PARA LA PARTE ADMINISTRATIVA: 
1. Para empezar, podrá ver el login:

![image](https://user-images.githubusercontent.com/99098604/236711742-cab42899-2841-438b-b957-32fc961beef4.png)

2. Usted, como administrador, puede ingresar con los siguientes datos: Usuario: "admin", Contraseña: "admin":

![image](https://user-images.githubusercontent.com/99098604/236711783-00ab59a5-69b5-4657-afad-078e05374c7a.png)

3. Habiendo ingresado sus credenciales, tendrá una página de inicio como esta:

![image](https://user-images.githubusercontent.com/99098604/236711851-fc56af06-059c-4be8-8e1c-aa0e56181aa2.png)

4. De inicio, podrá ver una tabla que contiene los datos de los usuarios registrados en la carga masiva anterior. Podrá ver su nombre, carné y contraseña encriptada:

![image](https://user-images.githubusercontent.com/99098604/236712024-1766eb14-4c31-4777-a251-27886234823b.png)

5. El botón negro que dice "Cargar desde AVL", se refiere a la transferencia de datos desde la estructura anterior a la estructura dentro de una tabla hash.

![image](https://user-images.githubusercontent.com/99098604/236712062-24805b5c-7684-44d5-8a01-e2313b9e66af.png)

6. Abajo de la tabla de usuarios, podrá encontrar la tabla de Permisos, que puede llenar dando clic al botón negro que dice "Mostrar Permisos":

![image](https://user-images.githubusercontent.com/99098604/236712154-f74b7fe2-9bd8-4a65-9a10-dd1a6c3cbbf9.png)
En esa tabla encontrará quién otorgó permisos y a quién. Además, le muestra qué tipo de permiso le brindó y dónde está ubicado el archivo.

PARA LA PARTE DESARROLLADORA: 
1. El proyecto fue desarrollado usando JS, CSS/HTML y archivos JSON:

![image](https://user-images.githubusercontent.com/99098604/236712427-b88af663-dd10-40e8-906b-82b714117699.png)

2. Lo que contiene la carpeta CSS:

![image](https://user-images.githubusercontent.com/99098604/236712463-f9fc60a5-60e0-47ef-8700-0e3647cd4307.png)

3. Contenido de carpeta js:

![image](https://user-images.githubusercontent.com/99098604/236712505-e3949d08-b34a-4918-879b-d7be4324b903.png)
![image](https://user-images.githubusercontent.com/99098604/236712526-78f93e61-a46e-44a8-8ef8-f8748a3e96de.png)

4. Ahora, con el tema de las estructuras utilizadas en esta fase, se encuentran: Árbol AVL, Árbol N-ario como Grafo No Dirigido y Tabla Hash.
5. Revisando la estructura de N-ario y Hash:

HASH:
![image](https://user-images.githubusercontent.com/99098604/236712830-ef05659f-adb8-4259-b240-dad31f3dae3d.png)
El uso de encriptarXOR fue para las contraseñas y los recorridos son para enviar los datos de la tabla hash a las demás estructuras y en general para hacer recorridos en sus datos.

![image](https://user-images.githubusercontent.com/99098604/236713025-4ff61d0a-fab2-46c1-8479-af6ba793e0bc.png)
![image](https://user-images.githubusercontent.com/99098604/236713056-b59bd45c-d9b4-4078-b47a-cdee6bd7c50e.png)
Estos métodos son propios de la tabla hash como tal.

N-ario como Grafo ND: 

![image](https://user-images.githubusercontent.com/99098604/236713220-f5e3e45c-f975-4e0e-908c-f501fa8845cd.png)
En este caso, se utilizan los mismos métodos del N-ario en la fase anterior, porque la estructura es muy similar. Sólo se cambia la forma de invocar a la estructura como tal.

5. En el caso de los index, podemos ver cambios relacionados con los permisos:
![image](https://user-images.githubusercontent.com/99098604/236713302-6621f8e7-e4b0-4dda-81c2-0a2107dda917.png)
También con el intercambio de datos entre tablas dependiendo del usuario de la aplicación:
![image](https://user-images.githubusercontent.com/99098604/236713339-9ec25f97-a982-4585-b5c2-cccaab4e02b8.png)
Y, con mantener las tablas llenas:
![image](https://user-images.githubusercontent.com/99098604/236713419-587576cc-1dd5-4605-adda-bc5574309c00.png)

6. En el caso del login, podremos notar que cambia la forma en que busca los usuarios y sus credenciales, estos ahora los busca en la tabla relacionada con la que recibe datos hash.
![image](https://user-images.githubusercontent.com/99098604/236713591-3bf03123-4c83-4e7e-914d-f7ec4f7b19d1.png)

7. Tabla de permisos que ve el admin:
![image](https://user-images.githubusercontent.com/99098604/236713720-afb95e94-1f9e-4fb7-be6f-653107231fe7.png)

8. Tabla de permisos que ve cada user:
![image](https://user-images.githubusercontent.com/99098604/236713758-d880f69d-c9f1-4787-b1a8-190b9a8c0bbd.png)

9. Llenado de tabla hash desde el avl:
![image](https://user-images.githubusercontent.com/99098604/236713806-87d00f97-a621-4e9f-938c-7bf6a0bac1d8.png)

10. Datos: Diana Berducido. Carné: 202000277.
11. Objetivo de la tercera fase: Incremento de comunicación entre compañeros mediante compartir archivos e intercambio de mensajes. Incremento de la seguridad de los datos ingresados que representen información delicada o privada y la supervisión del manejo de los archivos. 
12. Estructuras utilizadas en esta fase: HASH TABLE, GRAFO NO DIRIGIDO.
13. Utilización de programación orientada a objetos.

