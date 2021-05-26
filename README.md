# Chat con socket.io y MongoDB (aprendizaje)

## Pasos
### Instalaciones
Se instala node.js
Se instalan las dependencias
- npm install socket.io
- npm install express@4

### Configurar servidor
Lo llamaremos server.js. Añadimos las dependencias
<p><img src="doc/img/dependencias.png" alt="dependencias"/>

se accederá por el puerto 3000
<p><img src="doc/img/var puerto.png" alt="puerto"/>

se indica que la raíz será /index.html
<p><img src="doc/img/route path raiz.png" alt="route path raiz"/>

"io" es como un broadcast, TODOS los clientes conectados
emit envía un mensaje, en el caso de ponerle io delante se envía a todos los clientes
<p><img src="doc/img/io connection, emit msg.png" alt="io connection, emit msg"/>

le dices el puerto a escuchar, puerto por el cual se conectan los clientes en el navegador
<p><img src="doc/img/listener.png" alt="listener"/>
 
#### Para arrancar el servidor
node server.js

### Configuración del cliente
Utilizamos index.html
Añadimos el script de socket
<p><img src="doc/img/index script socket.io.png" alt="index script socket.io"/>

Creamos la variables para recibir mensajes de chat y se añadimos un eventlistener al input para hacer emit del mensaje
<p><img src="doc/img/client recepcion mensajes.png" alt="client recepcion mensajes"/>

Función que muestra los mensajes que se reciben
<p><img src="doc/img/client emision mensajes.png" alt="client emision mensajes"/>

## webología
- socket io chat example: https://socket.io/get-started/chat
