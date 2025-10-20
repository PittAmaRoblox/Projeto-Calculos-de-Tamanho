function converterParaMM(valor, unidade) {
    if (unidade === 'm') {
        return valor * 1000;
    } else if (unidade === 'cm') {
        return valor * 10;
    } else if (unidade === 'mm') {
        return valor;
    }
    return 0;
}

function calcularConversao() {
    // 1. Capturar os valores do HTML
    const valorReal = parseFloat(document.getElementById('ValorReal').value);
    const unidadeEntrada = document.getElementById('UnidadeEntrada').value;
    const escalaSelect = document.getElementById('Escala').value;
    
    let escalaDenominador;
    
    if (escalaSelect === 'outra') {
        escalaDenominador = parseFloat(document.getElementById('escalaCustomizada').value);
    } else {
        escalaDenominador = parseFloat(escalaSelect);
    }

    if (isNaN(valorReal) || isNaN(escalaDenominador) || valorReal <= 0 || escalaDenominador <= 0) {
        document.getElementById('resultadoTexto').textContent = 'Por favor, insira valores válidos.';
        return;
    }

    const valorRealEmMM = converterParaMM(valorReal, unidadeEntrada);

    const tamanhoNoDesenhoEmMM = valorRealEmMM / escalaDenominador;
    
    const tamanhoNoDesenhoEmCM = tamanhoNoDesenhoEmMM / 10;
    
    const resultadoFormatado = tamanhoNoDesenhoEmCM.toFixed(2);

    document.getElementById('resultadoTexto').innerHTML = 
        `O tamanho de ${valorReal} ${unidadeEntrada.toUpperCase()} na escala 1:${escalaDenominador} é de <span style="font-weight: bold; color: #007BFF;">${resultadoFormatado} cm</span>.`;
}

document.getElementById('escala').addEventListener('change', function() {
    const customInput = document.getElementById('escalaCustomizada');
    if (this.value === 'outra') {
        customInput.style.display = 'inline';
        customInput.focus(); 
    } else {
        customInput.style.display = 'none';
    }
});

calcularConversao();