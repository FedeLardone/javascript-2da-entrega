const app = document.getElementById('app');
const boton = document.getElementById('boton-iniciar');

class PromoBancaria {
    constructor(banco, descuento) {
        this.banco = banco;
        this.promocion = descuento;
    }

    mostrarInfo() {
        return `${this.banco} ${(this.promocion * 100)}%`;
    }
}

class Medialuna {
    constructor(nombre, sigla) {
        this.nombre = nombre;
        this.sigla = sigla;
    }
    
    mostrarInfo() {
        return `${this.nombre} (${this.sigla})`;
    }
}

const generarMenuDeSabores = (listaDeSabores) => {
    let mensajeDelMenu = 'Menu:';
    let opcion = 0;
    const copiaDeLista = listaDeSabores;
    copiaDeLista.forEach(sabor => {
        opcion++;
        mensajeDelMenu += '\nOpcion ' + opcion + ': '+ sabor.mostrarInfo();
    })
    return mensajeDelMenu;
};

const generarMenuPromociones = (listaDePromociones) => {
    let mensajeDelMenu = 'Tenemos las siguientes promociones bancarias:';
    let opcion = 0;
    const copiaDeLista = listaDePromociones;
    copiaDeLista.forEach(promo => {
        opcion++;
        mensajeDelMenu += '\nOpcion ' + opcion + ': '+ promo.mostrarInfo();
    })
    return mensajeDelMenu;
};

const precioUnidad = 550;
const descuentoMediaDocena = 0.10;
const descuentoDocena = 0.15;
const cantidadDeOpciones = 3;

const listaSabores = [
    new Medialuna('Salada', 'S'),
    new Medialuna('Dulce', 'D'),
    new Medialuna('Jamon y Queso', 'JQ'),
];

const promocionesBancarias = [
    new PromoBancaria('Banco Galicia', 0.15),
    new PromoBancaria('Banco Macro', 0.05),
    new PromoBancaria('Banco Santa Fe', 0.05),
    new PromoBancaria('Mercado Pago', 0.10),
];

const mensajeBienvenida = `¡Bienvenido a Luigi Panadería!

Precios medialunas:
- Por unidad $${precioUnidad}.
- Llevando 6 o más ${descuentoMediaDocena * 100}% off.
- Llevando 12 o más ${descuentoDocena * 100}% off.

Elegí a continuación la cantidad y los sabores.`;

const mensajeMenu = generarMenuDeSabores(listaSabores);

const mensajeSolicitarMedialuna = `${mensajeMenu}

Ingresa el número de opción elegida:`;

const mensajePago = `Modalidad de pago:
- Opción 1: Efectivo
- Opción 2: Tarjeta`;

const mensajePromos = generarMenuPromociones(promocionesBancarias);

const saludarUsuario = () => {
    alert (mensajeBienvenida);
};

const mostrarMenu = () => {
    alert (mensajeMenu);
};

const ingresarCantidad = () => {
    const cantidad = Number(parseInt(prompt('Ingresa la cantidad de medialunas que vas a llevar:')));
    return cantidad;
};

const verificarCantidadIngresada = (cantidad) => {
    return (cantidad <= 0 || cantidad === null || isNaN(cantidad)) ? 
        false : 
        true;
};

const solicitarCantidad = () => {
    let cantidad = ingresarCantidad();
    while (!verificarCantidadIngresada(cantidad)) {
        cantidad = ingresarCantidad();
    }
    return cantidad;
};

const solicitarOpcion = (mensaje, cantidad) => {
    let opcion = Number(parseInt(prompt(`${mensaje}`)));
    while (!verificarOpcion(opcion, cantidad)) {
        opcion = Number(parseInt(prompt(`${mensaje}`)));
    }
    return opcion;
};

const verificarOpcion = (opcion, cantidadDeOpciones) => {
    return (opcion > 0 && opcion <= cantidadDeOpciones && opcion !== null && !isNaN(opcion)) ?
        true :
        false;
};

let pedidoUsuario = [];

const mostrarPedidoEnConsola = (pedido) => {
    let mensaje = 'Los sabores elegidos son:';
    pedido.forEach(item => {
        mensaje += '\n- ' + item;
    })
    console.log(mensaje);
};

const agregarOpcionAlPedido = (opcion) => {
    const indice = opcion - 1;
    pedidoUsuario.push(listaSabores[indice].nombre);
};

const solicitarSabores = (cantidad) => {
    for (let i = 0; i < cantidad; i++) {
        let opcion = solicitarOpcion(mensajeSolicitarMedialuna, cantidadDeOpciones);
        agregarOpcionAlPedido(opcion);
    }
};

const calcularTotal = (cantidad) => {
    return cantidad * precioUnidad;
};

const aplicarDescuento = (total, promocion) => {
    const descuento = total * promocion;
    return total - descuento;
};

const calcularDescuentoCantidad = (cantidad, total) => {
    let totalAPagar = total;
    if (cantidad >= 6 && cantidad < 12) {
        totalAPagar = aplicarDescuento(total, descuentoMediaDocena);
    } else if (cantidad >= 12) {
        totalAPagar = aplicarDescuento(total, descuentoDocena);
    }
    return totalAPagar;
};

const mostrarTotal = (cantidad) => {
    const total = calcularTotal(cantidad);
    alert(`Tu total es: $${total}. A continuación elegí tu opción de pago.`);
};

const procesarPagoEfectivo = (total) => {
    alert(`Pago completo, tu total fue de $${total}`);
    console.log(`El pago final fue de: ${total}`);
};

const calcularDescuentoBancario = (opcion, total) => {
    let resultado;
    if (opcion === 1) {
        resultado = aplicarDescuento(total, promocionesBancarias[0].promocion);
    } else if (opcion === 2) {
        resultado = aplicarDescuento(total, promocionesBancarias[1].promocion);
    } else if (opcion === 3) {
        resultado = aplicarDescuento(total, promocionesBancarias[2].promocion);
    } else if (opcion === 4) {
        resultado = aplicarDescuento(total, promocionesBancarias[3].promocion);
    }
    return resultado;
};

const procesarPagoTarjeta = (opcion, total) => {
    const pago = calcularDescuentoBancario(opcion, total);
    alert(`Pago completo, tu total fue de $${pago}`);
    console.log(`El pago final fue de: ${pago}`);
};

const procesarPago = (total) => {
    const pagoElegido = solicitarOpcion(mensajePago, 2);
    if (pagoElegido === 1) {
        procesarPagoEfectivo(total);
    } else {
        const promoElegida = solicitarOpcion(mensajePromos, 4);
        procesarPagoTarjeta(promoElegida, total);
    }    
};

const finalizarPedido = () => {
    alert('¡Gracias por tu compra!')
};

const resetearPedido = () => {
    pedidoUsuario = [];
};

function ejecutarPrograma() {

    saludarUsuario();
    mostrarMenu();
    const cantidad = solicitarCantidad();
    console.log('La cantidad ingresada fue de: ' + cantidad);

    solicitarSabores(cantidad);
    mostrarPedidoEnConsola(pedidoUsuario);

    const totalSinDescuentos = calcularTotal(cantidad);
    console.log('El total sin descuentos es de: ' + totalSinDescuentos);
    const totalSegunCantidad = calcularDescuentoCantidad(cantidad, totalSinDescuentos);
    console.log('El total según la cantidad que lleva es: ' + totalSegunCantidad);
    mostrarTotal(cantidad);
    procesarPago(totalSegunCantidad);

    finalizarPedido();
    resetearPedido();
}

boton.onclick = ejecutarPrograma;

