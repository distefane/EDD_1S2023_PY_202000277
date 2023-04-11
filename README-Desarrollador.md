**Descripción General:** La segunda fase del proyecto pretende implementar una interfaz para usuario y administrador utilizando JavaScript y HTML/CSS. Para empezar, va a recibir un archivo JSON por parte de la interfaz del administrador que manejará los usuarios contenidos en éste. Posteriormente se puede manejar la forma en que se muestran los usuarios y mostrar un árbol AVL con los mismos. A partir de aquí, los usuarios ingresados en el sistema a través de ese archivo pueden acceder sin problema  a su interfaz. En ésta podrán crear carpetas y subir/descargar archivos (imagen, pdf, txt) desde su equipo. Además, tendrá la opción de cambiar los permisos sobre los archivos, pudiendo dar acceso a otros usuarios, que también estarán en el sistema, a leer y/o editarlos.

**Estado del proyecto:** Se encuentra en segunda fase, a partir de aquí se procederá en algunos cambios para la visualización de permisos y cómo hacerlos efectivos posteriormente, en tercera fase. 

**Estructura del proyecto de forma local:**

![image](https://user-images.githubusercontent.com/99098604/231024643-4a0e8b55-ceee-4b67-8755-12da58893e98.png)

Podrá notar los index variados, éstos manejan las estructuras (n-ary-tree, sparase-matrix and avl-tree) dentro de los html que ve fuera de las carpetas. Los html como user.html no está en uso, pero se dejó para hacer pruebas. El mismo caso para sparse-matrix y demás. Podrá visualizar que hay una carpeta de imgs y css, son solamente para los estilos de los html y página en general.

**AVL-TREE:**

![image](https://user-images.githubusercontent.com/99098604/231025124-27e57e17-c9bd-4ecb-871c-61928e5e4eba.png)

Creación de nodo y abajo se encuentran los métodos para manejar inserción y rotaciones. Nótese al cargar un .JSON en forma ordenada que se encuentra un problema en la inserción, ya que de esta forma no maneja las rotaciones, pero sí lo maneja en archivos que vienen de forma desordenada. 

Clase:

![image](https://user-images.githubusercontent.com/99098604/231025345-65d36208-a88d-4946-909c-6eaa4133d9c5.png)


Algunos de sus métodos podrían ser:

![image](https://user-images.githubusercontent.com/99098604/231025398-6fb2ee11-5fb2-4910-a8ec-e35b68cf9f84.png)

![image](https://user-images.githubusercontent.com/99098604/231025429-b01d3a86-9ef1-4c66-9059-300347c4d798.png)

![image](https://user-images.githubusercontent.com/99098604/231025448-3367c96d-ce1c-406c-850e-534e3024419c.png)

El problema que se encuentra con las rotaciones, es que por lo que se ve, al insertar un nodo nuevo se cambia la ubicación de la raíz y ya no se puede encontrar, haciendo que al necesitar rotar la raíz no sea posible, algunos intentos pueden verse en los comentarios y en métodos o funciones que no se usaron después:

![image](https://user-images.githubusercontent.com/99098604/231025554-c4643bca-2a31-42a6-8b95-94f527cd0826.png)

![image](https://user-images.githubusercontent.com/99098604/231025602-f94b6bec-5528-4751-af4f-a6198175109f.png)

Intentos y más intentos:

![image](https://user-images.githubusercontent.com/99098604/231025720-60696a27-6570-492d-bec7-2d7561b55d2b.png)

Cálculo de factor de equilibrio, que luego se usó en la impresión de los nodos:

![image](https://user-images.githubusercontent.com/99098604/231025777-cca6da3d-eee8-42c7-8601-14ae47bd6736.png)

Y, uno de los recorridos:

![image](https://user-images.githubusercontent.com/99098604/231025824-af7a3400-e3ee-4198-b803-9f9abc924dfe.png)

**Clase N-ARY-TREE:**

![image](https://user-images.githubusercontent.com/99098604/231025897-2d845971-8514-40f5-a375-53bd0783b269.png)

Construcción y creación de métodos:

![image](https://user-images.githubusercontent.com/99098604/231025951-d849f0f8-7797-4561-8ad9-dae1e172c773.png)

Alguno de los métodos, como de búsqueda sirvieron para poder ver la cantidad de folders o archivos para evitar que se repitieran los nombres al cargarlos:

![image](https://user-images.githubusercontent.com/99098604/231026040-6f8e6019-0d0c-4beb-a075-0b37d805afa4.png)

Intentos con la matriz dispersa:

![image](https://user-images.githubusercontent.com/99098604/231026076-d8b5d9da-7927-48ef-8885-3838701e4ee5.png)

**Hablando de la matriz dispersa:**

Se puede ver intentos de construcción, ésta debía recibir carnet, nombre de archivo y permisos brindados al usuario:

![image](https://user-images.githubusercontent.com/99098604/231026130-daa45eea-bd48-4033-b0ce-1f0b33cfbd83.png)

![image](https://user-images.githubusercontent.com/99098604/231026311-1dd94bb8-a66a-4461-adb9-2fea743eb26d.png)

**Login.js:**

![image](https://user-images.githubusercontent.com/99098604/231026512-7a2fd15e-5f6e-49d8-8ff0-59d3f5affe2f.png)

**Index e Index2:** Trabajan de manera similar, por eso el poco detalle:

![image](https://user-images.githubusercontent.com/99098604/231026701-5b24a0bb-cfc4-4f37-a97f-c686d5a3a851.png)

![image](https://user-images.githubusercontent.com/99098604/231026719-106c9cab-14ff-4f52-be5f-cb53039dd547.png)

Mi intento de manejar los permisos para agregarlo a la matriz dispersa:

![image](https://user-images.githubusercontent.com/99098604/231026767-ca2fd88a-faa8-48e0-bff1-23897a02933f.png)

Subida de archivo comprobando que no existiera previamente:

![image](https://user-images.githubusercontent.com/99098604/231026833-24c7c400-e73a-4a3f-bb01-0dfb0eb86719.png)

Igual con las carpetas:

![image](https://user-images.githubusercontent.com/99098604/231026998-7cff0112-64da-4349-b07a-b302ccb6086c.png)

**Index.html - login.js:**

![image](https://user-images.githubusercontent.com/99098604/231027067-9b724a37-980a-4e27-810f-62e375371c28.png)

**suser.html - Index2.js:**

![image](https://user-images.githubusercontent.com/99098604/231027176-20aeb42c-c307-4853-95fd-65744ce556a2.png)

**sadmin.html - Index.js:**

![image](https://user-images.githubusercontent.com/99098604/231027231-6bb15e4c-1ce6-4f75-8615-d27ba69cc9c8.png)

**Creación y soporte:** Diana Berducido - 202000277.
