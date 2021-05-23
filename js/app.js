//Variables y selectores 
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

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

   nuevoGasto(gasto) {
       this.gastos = [...this.gastos, gasto];
       console.log(this.gastos);
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

    agregarGastoListado(gastos) {
        

        // Iterar sobre los gastos 
        gastos.forEach(gasto => {
            
            const { cantidad, nombre, id } = gasto;

            //Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between aling-items-center';
            nuevoGasto.dataset.id = id;

            //Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad} </span>`;

            //Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');

            nuevoGasto.appendChild(btnBorrar);

            //agregar al HTML
            gastoListado.appendChild(nuevoGasto); 
        });
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
    const cantidad = Number(document.querySelector('#cantidad').value);

    //validar
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son abligatorios', 'error');

        return;

    } else if ( cantidad <= 0 || isNaN(cantidad) ) {
        ui.imprimirAlerta('Cantidad no es valida', 'error');

        return;
    }

    // Generar un objeto con el gasto 
    const gasto = { nombre, cantidad, id: Date.now() }

    // Añade un nuevo gasto
    presupuesto.nuevoGasto( gasto );

    // Mensaje de todo bien 
    ui.imprimirAlerta('Gasto agregando correctamente')

    // Imprimir los gastos
    const { gastos } = presupuesto;
    ui.agregarGastoListado(gastos);

    // Reinicia el formulario 
    formulario.reset();

}