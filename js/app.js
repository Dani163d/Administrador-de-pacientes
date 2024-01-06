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

let editando;

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

    editarCita(citaActualiza) {
        this.citas = this.citas.map( cita => cita.id === citaActualiza .id ? citaActualiza : cita )
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
    btnEliminar.innerHTML = 'Eliminar <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>';
    btnEliminar.onclick = () => eliminarCita(id);

    // agregar un boton para editar
    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btn', 'btn-info');
    btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>';
    btnEditar.onclick = () => cargarEdicion(cita);


    // agregar los parrafos al divCita
    divCita.appendChild(mascotaParrafo);
    divCita.appendChild(propietarioParrafo);
    divCita.appendChild(telefonoParrafo);
    divCita.appendChild(fechaParrafo);
    divCita.appendChild(horaParrafo);
    divCita.appendChild(sintomasParrafo);
    divCita.appendChild(btnEliminar);
    divCita.appendChild(btnEditar);

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

    if(editando) {
        ui.imprimirAlerta('Editado correctamente');

        // pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj})

        // regresar el texto a su estado original
        fomrmulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // quitar modo edicion
        editando = false;

    } else {
        // generar un id unico
    citaObj.id = Date.now();

    // creando una nueva cita
   administrarCitas.agregarCita({...citaObj});

//    mensaje de agregado correctamente
    ui.imprimirAlerta('Se agrego correctamente');
    }

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

// cargar los datos y el modo edicion
function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // llenar los inputs
    mascotaImput.value = mascota;
    propietarioImput.value = propietario;
    telefonoImput.value = telefono;
    fechaImput.value = fecha;
    horaImput.value = hora;
    sintomasImput.value = sintomas;

    // llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // cambiar el texto del boton
    fomrmulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;


}