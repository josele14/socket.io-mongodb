# socket.io-tutorial

## Pasos
### Instalaciones
Se instala node.js
Se instalan las dependencias
- npm install socket.io
- npm install express@4

### Configurar servidor
Utilizamos index.js. Añadimos las dependencias 
<img src="https://drive.google.com/file/d/1enldUROdO-EhpitIgCn4pEuxGzUXlRv1/view?usp=sharing" alt="dependencias"/>

se accederá por el puerto 3000
<img src="https://drive.google.com/file/d/1k_sWys9iyqu5ehflhWZW2US3mIFzrjTu/view?usp=sharing" alt="puerto"/>

se indica que la raíz será /index.html
<img src="https://drive.google.com/file/d/1q8DBLY32I5-klhkLzvS7kv9s_RzT4Cbd/view?usp=sharing" alt="route: path raiz"/>

"io" es como un broadcast, TODOS los clientes conectados
emit envía un mensaje, en el caso de ponerle io delante se envía a todos los clientes
<img src="https://drive.google.com/file/d/1B9baC1ES0Orc88dLyUIsDf5on-nqnpbv/view?usp=sharing" alt="io: connection, emit msg"/>

le dices el puerto a escuchar, puerto por el cual se conectan los clientes en el navegador
<img src="https://drive.google.com/file/d/13ixM1jrnKRFMDNaWyf3haOEL7M742cLa/view?usp=sharing" alt="listenner"/>
 
#### Para arrancar el servidor
node index.js

### Configuración del cliente
Utilizamos index.html
Añadimos el script de socket
<img src="https://drive.google.com/file/d/1-l9C10-PWFelpu85iRIqgjNvUQCQCXNq/view?usp=sharing" alt="index script socket.io"/>

Creamos la variables para recibir mensajes de chat y se añadimos un eventlistener al input para hacer emit del mensaje
<img src="https://drive.google.com/file/d/1r2orTBv7VoHX40hLYLosVjnrLn5H5I8o/view?usp=sharing" alt="client recepcion mensajes"/>

Función que muestra los mensajes que se reciben
<img src="https://drive.google.com/file/d/1ki3wG-K2sfJFVrKxPh1ZCevhBV_BQiWy/view?usp=sharing" alt="client emision mensajes"/>

## webología
- socket io chat example: https://socket.io/get-started/chat
