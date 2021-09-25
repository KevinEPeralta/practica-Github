class Cancha{
    horarioApertura;
    horarioCierre;

    constructor(horarioApertura,horarioCierre){
        this.horarioApertura = horarioApertura;
        this.horarioCierre = horarioCierre;
    }
}

class Reserva{
    id;
    dia;
    horario;
    cliente;
    cancha;

    constructor(dia,horario,cliente,cancha){
        this.id = cancha + dia + horario;
        this.dia = dia;
        this.horario = horario;
        this.cliente = cliente;
        this.cancha = cancha;
    }

    reservar = () => {
        
        let reservasStorage = JSON.parse(localStorage.getItem("reservas"))

        if(reservasStorage){
            reservasStorage.push(this)         
        }else{    
            reservasStorage=[this]        
        }
          
        $(`#${this.id}`).html(`<button class="reservado" onclick = "verReserva('${this.id}')">Reservado</button>`)      
        localStorage.setItem("reservas", JSON.stringify(reservasStorage));
    }

    eliminarReserva = () =>{
        const reservasStorage = JSON.parse(localStorage.getItem("reservas"));
        let reservaCancelar;
        const reservasFiltradas = reservasStorage.filter(reserva => {

            if(reserva.id === this.id){
                reservaCancelar = reserva
                return false;
            }
            return true;
        })
        
        $(`#${this.id}`).html(`<button class="reservar" onclick = "reservar('${reservaCancelar.cancha}',${reservaCancelar.dia},${reservaCancelar.horario})">Reservar</button>`) 
        localStorage.setItem("reservas", JSON.stringify(reservasFiltradas));        
    }
}

//Inicializo cada cancha, con sus horarios de apertura y cierre
const canchas = {
    Futbol: new Cancha(10,23),
    Tenis: new Cancha(8,17),
    Padel: new Cancha(16,23)
}
 
const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

$(() => {
    $("#deportes").change ( evento => {
        const deporte = evento.target.value;
        let elementosDias='';

        for (const dia of dias) {
            elementosDias += `<th class='bordeTurnos'>${dia}</th>` 
        }
        $("#datosReserva").fadeOut();
         
        $("#reservas").html("<tr><th class='bordeTurnos'>Horarios</th>"+elementosDias+"</tr>")

            for (let horario = canchas[deporte].horarioApertura; horario <= canchas[deporte].horarioCierre; horario++) {    
                const fila = $(`<tr><td class="bordeTurnos">${horario}:00</td></tr>`)

                for (let dia = 0; dia < 7; dia++) {
                    const reservasStorage = JSON.parse(localStorage.getItem("reservas"))
                    if (reservasStorage) {             
                        const reserva = reservasStorage.find(reserva => reserva.id === `${deporte}${dia}${horario}`)                     
                        if (reserva) {
                            fila.append(`<td id='${deporte}${dia}${horario}'><button class="reservado" onclick = "verReserva('${deporte}${dia}${horario}')">Reservado</button></td>`)
                        }else{
                            fila.append(`<td id='${deporte}${dia}${horario}'><button class="reservar" onclick = "reservar('${deporte}',${dia},${horario})">Reservar</button></td>`)
                        }                    
                    }else{
                        fila.append(`<td id='${deporte}${dia}${horario}'><button class="reservar" onclick = "reservar('${deporte}',${dia},${horario})">Reservar</button></td>`)
                    }
                }     
                $("#reservas").append(fila);           
        }            
    })    
})  

const reservar = (deporte, dia, horario) =>{
    $("#datosReserva").fadeOut()
    const cliente = $("#cliente").val();
    if (cliente ===""){
        $("#alerta").fadeIn(2000)
        $("#alerta").fadeOut(3000)
    }else{
        new Reserva(dia,horario,cliente,deporte).reservar();
    }
}

const verReserva = id => {
    const reservasStorage = JSON.parse(localStorage.getItem("reservas"));
    const reserva = reservasStorage.find(reserva => reserva.id === id)  

    $(`#datosReserva`).html(
        `<div class="reserva">
        <h3>Reserva</h3>
        <p>Cliente:${reserva.cliente}</p>
        <p>Cancha:${reserva.cancha}</p>
        <p>Día:${dias[reserva.dia]} Horario:${reserva.horario}:00</p>
        <button class="reservado"onclick ="eliminarReserva('${reserva.id}')">Cancelar reserva</button>
        </div>
        `)
        $(`#datosReserva`).fadeIn()
}

const eliminarReserva = id =>{    
    const reserva = new Reserva()
    reserva.id = id
    reserva.eliminarReserva()
}

