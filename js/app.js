//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const buscador = document.querySelector('#buscador');
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

const datosBusqueda = {
	marca: '',
	year: '',
	minimo: '',
	maximo: '',
	puertas: '',
	transmision: '',
	color: '',
};

//Eventos
document.addEventListener('DOMContentLoaded', () => {
	mostrarAutos(autos); //Carga los autos al iniciar

	mostrarYears(); //Muestra los años en el select de year
});

//Listener para los select
buscador.addEventListener('change', (e) => {
	datosBusqueda[e.target.id] = e.target.value;
	// console.log(datosBusqueda);
	filtrarAuto();
});

//Funciones
//Carga los autos al iniciar
function mostrarAutos(autos) {
	limpiarHTML();

	autos.forEach((auto) => {
		const autoHTML = document.createElement('p');

		const { marca, modelo, year, puertas, transmision, precio, color } = auto;

		autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - Puertas: ${puertas} - Transmisión: ${transmision} - Precio: $${precio}, - Color: ${color}
        `;

		resultado.appendChild(autoHTML);
	});
}

function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}

//Muestra los años en el select de year
function mostrarYears() {
	for (let i = max; i >= min; i--) {
		const opcion = document.createElement('option');
		opcion.value = i;
		opcion.textContent = i;

		year.appendChild(opcion);
	}
}

function filtrarAuto() {
	const resultado = autos
		.filter(filtrarMarca)
		.filter(filtrarYear)
		.filter(filtrarMinimo)
		.filter(filtrarMaximo)
		.filter(filtrarPuertas)
		.filter(filtrarTransmision)
		.filter(filtrarColor);

	if (resultado.length) {
		mostrarAutos(resultado);
	} else {
		noHayResultados();
	}
}

function noHayResultados() {
	limpiarHTML();
	const noHayResultados = document.createElement('div');
	noHayResultados.classList.add('alerta', 'error');
	noHayResultados.textContent = 'No hay resultados, intenta con otros términos de búsqueda';

	resultado.appendChild(noHayResultados);
}

function filtrarMarca(auto) {
	const { marca } = datosBusqueda;
	if (marca) {
		return auto.marca === marca;
	}
	return auto;
}

function filtrarYear(auto) {
	const { year } = datosBusqueda;
	if (year) {
		return auto.year === parseInt(year);
	}
	return auto;
}

function filtrarMinimo(auto) {
	const { minimo } = datosBusqueda;
	if (minimo) {
		return auto.precio >= minimo;
	}
	return auto;
}

function filtrarMaximo(auto) {
	const { maximo } = datosBusqueda;
	if (maximo) {
		return auto.precio <= maximo;
	}
	return auto;
}

function filtrarPuertas(auto) {
	const { puertas } = datosBusqueda;
	if (puertas) {
		return auto.puertas === parseInt(puertas);
	}
	return auto;
}

function filtrarTransmision(auto) {
	const { transmision } = datosBusqueda;
	if (transmision) {
		return auto.transmision === transmision;
	}
	return auto;
}

function filtrarColor(auto) {
	const { color } = datosBusqueda;
	if (color) {
		return auto.color === color;
	}
	return auto;
}
