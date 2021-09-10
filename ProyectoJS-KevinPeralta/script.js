class Cancha{
    horarioApertura;
    horarioCierre;

    constructor(horarioApertura,horarioCierre){
        this.horarioApertura = horarioApertura;
        this.horarioCierre = horarioCierre;
    }
}

class Reserva{
    dia;
    horario;
    cliente;
    cancha;

    constructor(dia,horario,cliente,cancha){
        this.dia = dia;
        this.horario = horario;
        this.cliente = cliente;
        this.cancha = cancha;
    }

    reservar = () => {
        
        let reservasStorage = JSON.parse(localStorage.getItem("reservas"))

        const reserva = {dia: this.dia, 
            horario:this.horario,
            cliente: this.cliente,
            cancha:this.cancha
        }

        if(reservasStorage){
            reservasStorage.push(reserva)         
        }else{    
            reservasStorage=[reserva]        
        }
        
        document.getElementById(`${reserva.cancha}${reserva.dia}${reserva.horario}`).innerHTML = `<button style="background-color:red">Reservado</button>`        
        localStorage.setItem("reservas", JSON.stringify(reservasStorage));
    }
}

//Inicializo cada cancha, con sus horarios de apertura y cierre
const canchas = {
    futbol: new Cancha(10,23),
    tenis: new Cancha(8,17),
    padel: new Cancha(16,23)
}
 
if(!localStorage.getItem("dias")){
     dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
    localStorage.setItem("dias", JSON.stringify(dias))
}else{
     dias = JSON.parse(localStorage.getItem("dias"))
}
 
window.onload = () =>{
    document.getElementById("deportes").onchange = evento => {
        const deporte = evento.target.value;
        let elementosDias='';

        for (const dia of dias) {
            elementosDias += `<th>${dia}</th>` 
        }

        document.getElementById("reservas").innerHTML = 
            `<tr>
            <th>Horarios</th>
            ${elementosDias}           
            </tr>`;

        for (let horario = canchas[deporte].horarioApertura; horario <= canchas[deporte].horarioCierre; horario++) {    
            const fila = document.createElement("tr");  
            fila.innerHTML = `<td>${horario}:00</td>`;

            for (let dia = 0; dia < 7; dia++) {
                let reservasStorage = JSON.parse(localStorage.getItem("reservas"))
                if (reservasStorage) {                    
                    const reservado = () =>{
                        let encontrado;
                        encontrado = reservasStorage.find(reserva => reserva.dia === dia && reserva.horario === horario && reserva.cancha === deporte)                        
                        return encontrado;                                                       
                    }
                    if (reservado()) {
                        fila.innerHTML += `<td id='${deporte}${dia}${horario}'><button style="background-color:red">Reservado</button></td>`
                    }else{
                        fila.innerHTML += `<td id='${deporte}${dia}${horario}'><button onclick = "reservar('${deporte}',${dia},${horario})">Reservar</button></td>`
                    }                    
                }else{
                    fila.innerHTML += `<td id='${deporte}${dia}${horario}'><button onclick = "reservar('${deporte}',${dia},${horario})">Reservar</button></td>`
                }
            }     
            document.getElementById("reservas").appendChild(fila);           
        }            
    }    
}  

const reservar = (deporte, dia, horario) =>{
    const cliente = prompt("Ingrese su nombre")
    new Reserva(dia,horario,cliente,deporte).reservar();
}