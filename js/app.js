// campos del formulario
const mascotaImput = document.querySelector('#mascota');
const propietarioImput = document.querySelector('#propietario');
const telefonoImput = document.querySelector('#telefono');
const fechaImput = document.querySelector('#fecha');
const horaImput = document.querySelector('#hora');
const sintomasImput = document.querySelector('#sintomas');

// UI
const fomrmulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

}

class UI {
    imprimirAlerta(mensaje, tipo) {
        // crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // agregar clase en base altipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // mensaje de error
    divMensaje.textContent = mensaje;

        // agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // quitar la alerta despuesde 5 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 5000 );
    }

    imprimirCitas({citas}) {

        this.limpiarHTML();

        citas.forEach( cita => {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    const divCita = document.createElement('div');
    divCita.classList.add('cita', 'p-3');
    divCita.dataset.id = id;

    // Scripting de los elementos de la cita
    const mascotaParrafo = document.createElement('h2');
    mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
    mascotaParrafo.textContent = mascota;

    const propietarioParrafo = document.createElement('p');
    propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder"> Propietario: </span> ${propietario}
    `;

    const telefonoParrafo = document.createElement('p');
    telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder"> Telefono: </span> ${telefono}
    `;

    const fechaParrafo = document.createElement('p');
    fechaParrafo.innerHTML = `
            <span class="font-weight-bolder"> Fecha: </span> ${fecha}
    `;

    const horaParrafo = document.createElement('p');
    horaParrafo.innerHTML = `
            <span class="font-weight-bolder"> Hora: </span> ${hora}
    `;

    const sintomasParrafo = document.createElement('p');
    sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder"> Sintomas: </span> ${sintomas}
    `;

    // boton para eliminar esta cita
    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
    btnEliminar.innerHTML = 'eliminar <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>';

    btnEliminar.onclick = () => eliminarCita(id);

    // agregar los parrafos al divCita
    divCita.appendChild(mascotaParrafo);
    divCita.appendChild(propietarioParrafo);
    divCita.appendChild(telefonoParrafo);
    divCita.appendChild(fechaParrafo);
    divCita.appendChild(horaParrafo);
    divCita.appendChild(sintomasParrafo);
    divCita.appendChild(btnEliminar);

    // agregar las citas al HTML
    contenedorCitas.appendChild(divCita);

        })
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }

}

const ui = new UI();
const administrarCitas =  new Citas();


// REGISTRAR EVENTO
eventListeners()
function eventListeners() {
    mascotaImput.addEventListener('input', datosCitas);
    propietarioImput.addEventListener('input', datosCitas);
    telefonoImput.addEventListener('input', datosCitas);
    fechaImput.addEventListener('input', datosCitas);
    horaImput.addEventListener('input', datosCitas);
    sintomasImput.addEventListener('input', datosCitas);

    fomrmulario.addEventListener('submit', nuevaCita);
}

// OBJETO CON INFORMACION DE LA CITA
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// AGREGA DATOS AL OBJETO DE CITA
function datosCitas(e) {
    citaObj [e.target.name] = e.target.value;
    
}

// validar y agregar una nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault();

    // extraer la informacion del onbejto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
    
    // validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son onligatorios', 'error');

        return;
    }


    // generar un id unico
    citaObj.id = Date.now();

    // creando una nueva cita
   administrarCitas.agregarCita({...citaObj});

//    reinicar el objeto para la validacion
    reinicarObjeto();

//    reinicar formulario
fomrmulario.reset();

// mstrar el HTML de las citas
ui.imprimirCitas(administrarCitas);

}

function reinicarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id) {
    // eliminar la cita
    administrarCitas.eliminarCita(id);

    // muestra un mensaje
    ui.imprimirAlerta('la cita se elimino correctamente');

    // refrecar las citas
    ui.imprimirCitas(administrarCitas);
}