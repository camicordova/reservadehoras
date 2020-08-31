function esCorreo(correo) {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(correo);
}

function esRut(rutCompleto) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';
    return (dv(rut) == digv);
}

function dv(T) {
    var M = 0,
        S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}

function imprimirMensaje(esValido, error) {
    var mensajeHTML = document.getElementById("mensajeconsola");
    if (esValido) {
        mensajeHTML.innerHTML = "Estimado " + nombre + " " + apellidos + ", su hora para " + especialidad + " ha sido reservada para el día " + fecha + " a las " + hora + ". Además, se le envió un mensaje a su correo " + email + " con el detalle de su cita. Gracias por preferirnos.";
    } else {
        mensajeHTML.innerHTML = error;
        return false;
    }

}

function validar() {
    var esValido = true;
    var error = "";
    var rut = document.getElementById("rut").value;
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var edad = document.getElementById("edad").value;
    var email = document.getElementById("email").value;
    var especialidad = document.getElementById("especialidad").value;
    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;

    if (rut == "" || !esRut(rut)) {
        esValido = false;
        error += "Rut inválido<br>";
    }

    if (nombre == "" || !/^[A-Z]+$/i.test(nombre)) {
        esValido = false;
        error += "Nombre inválido<br>";
    }
    if (apellidos == "" || !/^[A-Z]+$/i.test(apellidos)) {
        esValido = false;
        error += "Apellidos inválidos<br>";
    }
    if (edad == "" || isNaN(edad)) {
        esValido = false;
        error += "Edad inválida<br>";
    }
    if (email == "" || !esCorreo(email)) {
        esValido = false;
        error += "Email inválido<br>";
    }
    if (especialidad == "-1") {
        esValido = false;
        error += "Debe elegir una especialidad<br>";
    }
    if (fecha == "" || !/^(\d{1,2})-(\d{1,2})-(\d{4})$/.test(fecha)) {
        esValido = false;
        error += "Fecha inválida<br>";
    }
    if (hora == "-1") {
        esValido = false;
        error += "Debe elegir una hora<br>";
    }

    imprimirMensaje(esValido, error);
}

document.getElementById("reservar").addEventListener("click", validar);