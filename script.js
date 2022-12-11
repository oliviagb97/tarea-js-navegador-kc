function guardarTrasaccion() {

    var concepto = document.getElementById("concepto").value;
    var cantidadElement = document.getElementById("cantidad").value

    if (concepto != "" && !isNaN(cantidadElement)) {

        var cantidad = Number.parseFloat(cantidadElement);
        var cantElement = Number.parseInt(localStorage.getItem("cantTrasacciones"));

        //Actualizar memoria local
        //var obj = { concep: concepto, cant: cantidad }
        //localStorage.setItem("concepto" + cantElement, JSON.stringify(obj));
        //cantElement++;
        //localStorage.setItem("cantTrasacciones", cantElement);


        // Actualizamos los historicos
        var historico = document.getElementById("historicoBody")
        var historicoItem = getItemHistory(cantidad, concepto);
        historico.append(historicoItem);

        //Actualizamos los gastos e ingresos
        updateGastosIngresos(cantidad);

        //Actualizamos los ahorros
        updateAhorros();
    }

}

function getItemHistory(cantidad, concepto) {

    var historicalItem = document.createElement('div');
    historicalItem.className = `historial-item ${cantidad <= 0 ? "item-gasto" : "item-ingreso"}`;

    var historicaText = document.createElement('div');
    historicaText.className = "historial-text";
    historicaText.innerText = concepto;

    var historicaAmount = document.createElement('div');
    historicaAmount.className = "historial-amount";
    historicaAmount.innerText = cantidad;

    historicalItem.append(historicaText);
    historicalItem.append(historicaAmount);

    return historicalItem;
}

function updateAhorros() {

    var ahorro = document.getElementById("totalAhorro");

    var gastos = document.getElementById("totalGasto");
    var gastosTotal = Number.parseFloat(gastos.innerText);

    var ingresos = document.getElementById("totalIngreso");
    var ingresosTotal = Number.parseFloat(ingresos.innerText);

    ahorro.innerText = ingresosTotal - gastosTotal;
}

function updateGastosIngresos(cantidad) {

    if (cantidad < 0) {
        var gastos = document.getElementById("totalGasto");
        var gastosTotal = Number.parseFloat(gastos.innerText);
        gastos.innerText = gastosTotal + (cantidad * -1);
    } else {
        var ingresos = document.getElementById("totalIngreso");
        var ingresosTotal = Number.parseFloat(ingresos.innerText);
        ingresos.innerText = ingresosTotal + cantidad
    }
}