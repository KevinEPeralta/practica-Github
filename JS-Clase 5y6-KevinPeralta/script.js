let deporte, dia;
let reservando = true;
let disponible;

//Clase cancha, que va a instanciar los objetos de los diferentes deportes y sus horarios.
class cancha{
    constructor(deporte,dias){
    this.deporte = deporte;
    this.diasReservados = dias ;
    }

    reservaDeCancha() {
        let reserva = true; 
        let dia;   
        while (reserva) {
            if(this.diasReservados.length == 7){
                alert("No hay días libres para reservar " + this.deporte)
                return;
            }
            dia = prompt("Actualmente, los siguientes días ya están reservados: " + this.deporte + ": " + this.diasReservados + ". Qué día desea reservar?");      
            let encontrado = this.diasReservados.find(elemento => elemento === dia)
            if (dia === encontrado) {
              reserva = confirm("El dia " + dia + " ya está reservado para " + this.deporte + " ¿Querés reservar otro día?")
              if (!reserva){
                  return;
                }
            } else {
                this.diasReservados.push(dia);
                alert("Reserva realizada para el día: " + dia)
                alert("Te esperamos!");
                return;                       
            }                                  
        } 
    }
}

let canchaPadel = new cancha("padel",["lunes","martes","jueves"]);
let canchaFutbol = new cancha("futbol",["lunes","martes","sabado","miercoles"]);
let canchaTenis = new cancha("tenis",["lunes","martes","miercoles","jueves","viernes","sabado","domingo"]);

alert ("Bienvenido a Kicker");
alert("Qué deporte querés reservar?");

while (reservando === true){    
    deporte = prompt("Tenis, futbol o padel? (escriba en minúsculas y sin tilde)");

    alert("Elegiste: " + deporte);
        switch (deporte) {
            case "tenis": canchaTenis.reservaDeCancha();  
                break;
            case "futbol": canchaFutbol.reservaDeCancha();
                break;
            case "padel": canchaPadel.reservaDeCancha();
                break;
            default: alert("No tenemos canchas para " + deporte + ". Por favor, revise nuestras opciones nuevamente. ")
                break;
        }
    reservando = confirm("Desea seguir realizando otra reserva?")
}    
alert("Gracias por utilizar nuestro sistema")