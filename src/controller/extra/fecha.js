function obtenerFecha (numeroHoras=0, fecha = new Date()) {
    function pad(s) { return (s.length < 2) ? '0' + s : s; };
    fecha.setTime(fecha.getTime() + numeroHoras * 60 * 60 * 1000);
    let options = {
        timeZone: 'America/Guayaquil',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    };
    let formatter = new Intl.DateTimeFormat('en-us', options);
    fecha = formatter.format(fecha).replace(/,/g, '').replace(/\//g, '-');
    let divicion = fecha.split('-');
    let mes = pad(divicion[0]);
    let dia = pad(divicion[1]);
    let anio = divicion[2];
    return `${mes}-${dia}-${anio}`;
}

module.exports = obtenerFecha;