let deporte, dia;
let reservada = false;
let disponible;

function reservaDeFutbol(deporte){
    disponible = verificarDia(deporte);
    if(disponible){
        dia=prompt("Qué día desea reservar?");
        return reservada=true;
    }
}

function reservaDePadel(deporte){
    disponible = verificarDia(deporte);
    if(disponible){
        dia=prompt("Qué día desea reservar?");
        return reservada=true;
    }
}

function reservaDeTenis(deporte){    
    disponible = verificarDia(deporte);
    if(disponible){
        dia=prompt("Qué día desea reservar?");
        return reservada=true;
    }
    
}

function verificarDia(deporteElegido){
    let diasDisponiblesPadel=["lunes","miercoles","jueves","sabado","domingo"];
    let diasDisponiblesTenis=["lunes","jueves", "sabado"];
    let diasDisponiblesFutbol=[];

    switch (deporteElegido) {
        case "tenis": if(diasDisponiblesTenis.length == 0){
            alert("No hay canchas disponibles"); 
            break;
        } else {
            alert ("Los días dipsonibles son: " + diasDisponiblesTenis);
            return disponible=true 
            }

        case "futbol": if(diasDisponiblesFutbol.length == 0){
            alert("No hay canchas disponibles"); 
            break;
        } else {
            alert("Los días dipsonibles son: " +diasDisponiblesFutbol); 
            return disponible=true 
        }

        case "padel": if(diasDisponiblesPadel.length == 0){
            alert("No hay canchas disponibles"); 
            break;
        } else {
            alert("Los días dipsonibles son: " +diasDisponiblesPadel);
            return disponible=true  
         
        }   
    }
}

alert ("Bienvenido a Kicker");
alert("Que deporte querés reservar?");
while (!reservada){
deporte = prompt("Tenis, fútbol o padel? (escriba en minúsculas y sin tilde)");
alert("elegiste: " + deporte);
    switch (deporte) {
        case "tenis": reservada = reservaDeTenis(deporte);
    //recordatorio: posibles secciones, cancha, horario, dia, y reserva de raqueta y pelotitas      
            break;

        case "futbol": reservada = reservaDeFutbol(deporte);
            break;
    //recordatorio: posibles secciones, cancha, horario, dia, y reserva de pelota

        case "padel": reservada = reservaDePadel(deporte) 
            break;
    //recordatorio: posibles secciones, cancha, horario, dia, y reserva de paleta y pelotitas

        default: alert("no tenemos canchas para " + deporte + ". Por favor, revise nuestras opciones nuevamente. ")
            break;
    }
}
alert("Te esperamos!");

