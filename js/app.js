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

// REGISTRAR EVENTO
eventListeners()
function eventListeners() {
    mascotaImput.addEventListener('input', datosCitas);
    propietarioImput.addEventListener('input', datosCitas);
    telefonoImput.addEventListener('input', datosCitas);
    fechaImput.addEventListener('input', datosCitas);
    horaImput.addEventListener('input', datosCitas);
    sintomasImput.addEventListener('input', datosCitas);
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
    console.log(citaObj);
}