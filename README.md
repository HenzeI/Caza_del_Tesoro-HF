<h1>Caza del Tesoro <img src="https://raw.githubusercontent.com/HenzeI/Caza_del_Tesoro-HF/refs/heads/main/img/cofreCerrado.png" height=30px></h1>

Este programa es un minijuego de mesa que consiste en moverte en un tablero utilizando un dado con el objetivo de llegar al tesoro que se encuentra al otro lado del tablero.

### Flujo del programa

- El usuario introduce su nombre.

- Pulsa en el botón de jugar y aparece un tablero.

- Se mueve por el tablero utilizando el dado.

- Se muestra un cartel indicando su victoria y el número de movimientos que ha realizado si ha llegado al destino.

## Funciones

Funciones de flujo del programa

- iniciarJuego() - Comprueba el nombre y determina en función de si es correcto o no, dependiendo del mensaje transmitido por la función validarNombre(), además de activar el botón de "jugar".

- generarTablero(e) - Genera un tablero con el héroe y el tesoro en sus respectivas posiciones.

- tirarDado() - Genera un número aleatorio entre el 1 y el 6 correspondiente a la imagen del dado mostrada en el programa y habilita y deshabilita los movimientos que puede realizar el jugador en función del número aleatorio generado.

- moverHeroe(e) - Capta el movimiento del jugador en el tablero y restablece por defecto las antiguas posiciones del héroe.

- victoria() - Almacena el ranking de jugadores y comprueba el número de tiradas del jugador actual con el jugador de mejor posición en el ranking, mostrándole un mensaje al respecto.

Función de comprobación de nombre

- validarNombre(nombre) - Pide por parámetro el nombre a comprobar y devuelve un mensaje en función de las restricciones que se han incumplido en el nombre.

<img src="https://raw.githubusercontent.com/HenzeI/Caza_del_Tesoro-HF/refs/heads/main/img/cofreCerrado.png" height=30px>
