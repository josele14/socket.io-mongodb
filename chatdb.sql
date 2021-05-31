DROP TABLE room;
DROP DATABASE chatdb;
CREATE DATABASE chatdb;

CREATE TABLE room(
  room varchar(2),
  timestamp timestamp,
  user varchar(40),
  msg varchar(255),
  PRIMARY KEY (room, timestamp, user)
);

INSERT INTO room VALUES(2,'2021-06-01 00:21:56','Jose','Hola Paco!');
INSERT INTO room VALUES(2,'2021-06-01 00:22:04','Paco','que pachaa joseee?!');
INSERT INTO room VALUES(2,'2021-06-01 00:22:18','Jose','pues na aquí probando el socke tio');
INSERT INTO room VALUES(2,'2021-06-01 00:23:42','Paco','(͠≖ ͜ʖ͠≖)????');