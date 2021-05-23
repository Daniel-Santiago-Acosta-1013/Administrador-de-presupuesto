//Variables y selectores 
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos-ul');

//Eventos

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
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


