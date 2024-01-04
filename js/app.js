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
}