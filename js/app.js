//Variables y selectores 
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos-ul');

//Eventos

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto)
}

//clases
class Presupuesto {
   constructor(presupuesto) {
       this.presupuesto = Number(presupuesto);
       this.restante = Number(presupuesto);
       this.gastos = [];
   }
}

class UI {
    insertarPresupuesto( cantidad ) {
        // Extrayendo los valores
        const {presupuesto, restante} = cantidad;
        
        //Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        //  crear el div 
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // mensaje de error
        divMensaje.textContent = mensaje;

        //Insertar en el HTML 
        document.querySelector('.primario').insertBefore( divMensaje, formulario );

        //Quitar del HTML
        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
    }
}

//iinstanciar 
const ui = new UI();
let presupuesto;

//funciones 

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?')

    // console.log( Number(presupuestoUsuario) );

    if( presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ) {
        window.location.reload();
    }

     presupuesto = new Presupuesto(presupuestoUsuario);
     console.log(presupuesto);

     ui.insertarPresupuesto(presupuesto)
}


// Añade de gastos 

function agregarGasto(e) {
    e.preventDefault();

    //leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    //validar
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son abligatorios', 'error');

        return;

    } else if ( cantidad <= 0 || isNaN(cantidad) ) {
        ui.imprimirAlerta('Cantidad no es valida', 'error');

        return;
    }

    console.log('Agregando Gasto')
}