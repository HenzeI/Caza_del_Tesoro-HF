"use strict"
// Hancel Fernando

// Variables enunciado
let nombre = ""
let posicionHeroe = "0-0"
let numeroTiradas = 0

// Variables
let botonTirarDado, botonJugar, textoNumeroDado, tablero, imgDado
let numeroDado = 0
let tabla
let heroe = "0-0"
let tesoro = "9-9"
let estaCerca = false
let contenido
let divDado

document.addEventListener("DOMContentLoaded", inicio)

function inicio(){

    nombre = document.getElementById("nombre")
    botonJugar = document.getElementById("jugar")

    contenido = document.createElement("div")
    contenido.setAttribute("class","contenido")
    tablero = document.createElement("div")
    tablero.setAttribute("class","tablero")
    divDado = document.createElement("div")
    divDado.setAttribute("class","divDado")

    botonTirarDado = document.createElement("button")
    botonTirarDado.textContent = "Tirar dado"

    imgDado = document.createElement("img")
    imgDado.src = "./img/dado.png"

    tabla = document.createElement("table")
    tabla.setAttribute("border","1")

    document.getElementById("btnNombre").addEventListener("click", iniciarJuego)

    botonJugar.addEventListener("click", generarTablero)

    botonTirarDado.addEventListener("click", tirarDado)

    tabla.addEventListener("click", moverHeroe)
    
}

function iniciarJuego(){

    // Se elimina la clase invalid cada vez que se accede al metodo
    nombre.classList.remove(`invalid`)
    // y el color por defecto
    document.getElementById("aLuchar").style.color = "#D5B386"

    if (!validarNombre(nombre.value)) {
        document.getElementById("aLuchar").textContent = `A luchar heroe: ${nombre.value}`
        botonJugar.removeAttribute('disabled')
    }
    else {
        // En casos de error se muestra un mensaje proveniente del metodo validarNombre()
        document.getElementById("aLuchar").style.color = "rgb(255, 48, 48)"
        nombre.classList.add(`invalid`)
        document.getElementById("aLuchar").textContent = `${validarNombre(nombre.value)}` 
    }
}

function generarTablero(e){

    document.getElementById("mainContenido").appendChild(contenido)
    contenido.appendChild(tablero)

    let fila, celda, botonCelda 

    // Creacion de la tabla 10x10
    for (let i = 0; i < 10; i++) {
        
        fila = document.createElement("tr")
        

        for (let j = 0; j < 10; j++) {

            celda = document.createElement("td")
            botonCelda = document.createElement("button")
            botonCelda.setAttribute("id",`${i}-${j}`)
            botonCelda.setAttribute("disabled","")
            botonCelda.textContent = `${i}-${j}`
            
            celda.appendChild(botonCelda)
            fila.appendChild(celda)
        }

        tabla.appendChild(fila)

    }

    tablero.appendChild(tabla)

    // Jugador
    document.getElementById("0-0").removeAttribute("disabled")
    document.getElementById("0-0").textContent = heroe
    document.getElementById("0-0").classList.add(`barco`)
    
    // Tesoro
    document.getElementById("9-9").removeAttribute("disabled")
    document.getElementById("9-9").textContent = tesoro
    document.getElementById("9-9").classList.add(`tesoro`)

    // Se oculta el boton de jugar
    botonJugar.setAttribute("hidden","")

    contenido.appendChild(divDado)
    divDado.appendChild(imgDado)
    divDado.appendChild(botonTirarDado)
}

function tirarDado(){

    // Obtenemos un numero aletorio
    numeroDado = Math.floor(Math.random() * 6) + 1
    // Buscamos la imagen del dado correspondiente al numero aleatorio
    for (let i = 1; i <= 6 ; i++) {
        if (numeroDado == i)
            imgDado.src = `./img/dado${i}.png`
    }
    
    // Buscamos donde se encuentra actualmente en el tablero la posicion del heroe
    for (let i = 0; i < document.getElementsByTagName("button").length; i++) {
        if (document.getElementsByTagName("button")[i].textContent == heroe)
            posicionHeroe = document.getElementsByTagName("button")[i].getAttribute("id")
    }

    // Separamos y guardamos las filas y columnas en valos x e y
    let posicionHeroeX = parseInt(posicionHeroe.substring(2))
    let posicionHeroeY = parseInt(posicionHeroe.substring(0,1))

    // Sacamos la direccion apartir de los valores x e y
    let conteoDerecha = posicionHeroeX
    let conteoIzquierda = posicionHeroeX
    let conteoArriba = posicionHeroeY
    let conteoAbajo = posicionHeroeY

    // Habilitar celdas
    // derecha
    for (let d = 0; d < numeroDado; d++) {
        conteoDerecha++
        if (document.getElementById(`${posicionHeroeY}-${conteoDerecha}`))
            if (!(document.getElementById(`${posicionHeroeY}-${conteoDerecha}`).getAttribute("id") == "9-9")) 
                document.getElementById(`${posicionHeroeY}-${conteoDerecha}`).toggleAttribute("disabled")
            else
                estaCerca = true
    }
        
    // izquierda
    for (let d = 0; d < numeroDado; d++) {
        conteoIzquierda--
        if (document.getElementById(`${posicionHeroeY}-${conteoIzquierda}`))
            document.getElementById(`${posicionHeroeY}-${conteoIzquierda}`).toggleAttribute("disabled")
    }

    // arriba
    for (let d = 0; d < numeroDado; d++) {
        conteoArriba--
        if (document.getElementById(`${conteoArriba}-${posicionHeroeX}`))
            document.getElementById(`${conteoArriba}-${posicionHeroeX}`).toggleAttribute("disabled")
    }

    // abajo
    for (let d = 0; d < numeroDado; d++) {
        conteoAbajo++
        if (document.getElementById(`${conteoAbajo}-${posicionHeroeX}`))
            if (!(document.getElementById(`${conteoAbajo}-${posicionHeroeX}`).getAttribute("id") == "9-9")) 
                document.getElementById(`${conteoAbajo}-${posicionHeroeX}`).toggleAttribute("disabled")
            else
                estaCerca = true
    }
    
    botonTirarDado.setAttribute("disabled","")
}

function moverHeroe(e){

    // Recorremos todos los botones en busca del boton que coincide con el target el usuario
    for (let i = 0; i < document.getElementsByTagName("button").length; i++) {
        // Excluimos solos los botones que estan dentro del trablero
        if (tabla.getElementsByTagName("button")[i] === e.target) {
            // Tambien excluimos el boton del tesoro y el del heroe
            if (!(tabla.getElementsByTagName("button")[i].getAttribute("id") == "9-9") && !(tabla.getElementsByTagName("button")[i].getAttribute("id") == posicionHeroe)) {
                // Antes asignarle la una posicion al heroe hacemos que su posicion anterior vuelva a estar por defecto
                document.getElementById(posicionHeroe).textContent = document.getElementById(posicionHeroe).getAttribute("id")
                document.getElementById(posicionHeroe).classList.remove(`barco`)
                // Le asignamos la nueva posicion
                posicionHeroe = tabla.getElementsByTagName("button")[i].getAttribute("id")
                tabla.getElementsByTagName("button")[i].textContent = heroe
                tabla.getElementsByTagName("button")[i].classList.add(`barco`)
                estaCerca = false // Decimos que no se encuentra cerca del tesoro
                // Deshabilitamos todos los botones excepto el teroso y el heroe
                for (let j = 0; j < document.getElementsByTagName("td").length; j++) {
                    if (!(tabla.getElementsByTagName("button")[j].getAttribute("id") == posicionHeroe))
                        if (!(tabla.getElementsByTagName("button")[j].getAttribute("id") == "9-9"))
                            tabla.getElementsByTagName("button")[j].setAttribute("disabled","")
                }
                // Incrementamos el variable de tiradas ya que ha realizado un movimiento
                numeroTiradas++
                // Habilitamos el boton de tirar dado
                botonTirarDado.removeAttribute("disabled")
            }
            else{
                // Si esta cerda del tesoro
                if (estaCerca) {
                    // Y el target no es el propio heroe
                    if (!(tabla.getElementsByTagName("button")[i].getAttribute("id") == posicionHeroe)) {
                        // Al la posicion anterior le asignamos los valores por defecto
                        document.getElementById(posicionHeroe).textContent = document.getElementById(posicionHeroe).getAttribute("id")
                        document.getElementById(posicionHeroe).classList.remove(`barco`)
                        // Cambiamos la nueva posicion del heroe
                        posicionHeroe = tabla.getElementsByTagName("button")[i].getAttribute("id")
                        tabla.getElementsByTagName("button")[i].textContent = heroe
                        tabla.getElementsByTagName("button")[i].classList.remove(`tesoro`)
                        tabla.getElementsByTagName("button")[i].classList.add(`tesoroObtenido`) // Junto con la imagen del tesoro abierto
                        // Deshabilitamos todos los botones excepto la posicion del heroe 
                        for (let j = 0; j < document.getElementsByTagName("td").length; j++) {
                            if (!(tabla.getElementsByTagName("button")[j].getAttribute("id") == posicionHeroe))
                                tabla.getElementsByTagName("button")[j].setAttribute("disabled","")
                        }
                        // Establecemos un tiempo de esperar de medio segundo para que se muestre la imagen del tesoro abierto
                        // para luego pasarle el metodo de victoria()
                        setTimeout(victoria, 500)
                    }
                }
            }
        }
    }
}

function validarNombre(nombre){

    let caracteresRegex = /^.{4,}$/
    let numerosRegex = /\d/
    
    if (numerosRegex.test(nombre) && !caracteresRegex.test(nombre)){
        return "El nombre debe tener 4 o más letras y no debe contener números"
    }
    else {
        if (!caracteresRegex.test(nombre))
            return "El nombre debe tener 4 o más letras"

        else if (numerosRegex.test(nombre))
            return "Números no permitidos"   
    }
}

function victoria(){

    // Incrementamos el numero de tiradas del heroe en 1 ya que la llegada tambien cuenta
    numeroTiradas++

    // Creamos un Map que guarda el ranking de tiradas
    let ranking = new Map()
    
    // Extraemos los datos del localStorage y los guardamos en el map
    for (let i = 0; i < localStorage.length; i++) {
        ranking.set(localStorage.key(i), localStorage.getItem(localStorage.key(i)))
    }
    
    // Convertimos el map en un array de clave valor
    ranking = Array.from(ranking)
    // Para luego hacer un metodo de ordenacion por el valor de cada elemento(clave)
    ranking.sort((a, b) => a[1] - b[1])
 
    // Comprobamos de el array contenga puesto en el ranking
    if(ranking.length > 0){
        // Y mostramos un mensaje dependiendo de su numero de tiradas
        if (numeroTiradas == ranking[0][1])
            alert(`VICTORIA \nNumero de tiradas: ${numeroTiradas}`)
        else if (numeroTiradas < ranking[0][1])
            alert(`VICTORIA \nNumero de tiradas: ${numeroTiradas} \nNuevo récord`)
        else
            alert(`VICTORIA \nNumero de tiradas: ${numeroTiradas} \nRécord no superado, el actual récord es de ${ranking[0][1]}`)

        localStorage.setItem(nombre.value, numeroTiradas)
    }
    // Si el ranking esta vacio añadimos al jugador al ranking y le mostramos un mensaje
    else {
        localStorage.setItem(nombre.value, numeroTiradas)

        alert(`VICTORIA \nNumero de tiradas: ${numeroTiradas}`)
    } 
}