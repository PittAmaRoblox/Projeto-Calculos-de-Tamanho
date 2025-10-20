// Função para converter unidades para milímetros
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

// Função para calcular a conversão para a escala
function calcularConversao() {
    const valorReal = parseFloat(document.getElementById('ValorReal').value);
    const unidadeEntrada = document.getElementById('UnidadeEntrada').value;
    const escalaSelect = document.getElementById('escala').value;

    let escalaDenominador;

    // Verifica se a escala personalizada foi selecionada
    if (escalaSelect === 'outra') {
        escalaDenominador = parseFloat(document.getElementById('escalaCustomizada').value);
    } else {
        escalaDenominador = parseFloat(escalaSelect);
    }

    // Validação dos valores inseridos
    if (isNaN(valorReal) || isNaN(escalaDenominador) || valorReal <= 0 || escalaDenominador <= 0) {
        document.getElementById('resultadoTexto').textContent = 'Por favor, insira valores válidos.';
        return;
    }

    // Converte o valor real para milímetros
    const valorRealEmMM = converterParaMM(valorReal, unidadeEntrada);

    // Calcula o tamanho no desenho (em milímetros e depois em centímetros)
    const tamanhoNoDesenhoEmMM = valorRealEmMM / escalaDenominador;
    const tamanhoNoDesenhoEmCM = tamanhoNoDesenhoEmMM / 10;

    // Exibe o resultado formatado
    const resultadoFormatado = tamanhoNoDesenhoEmCM.toFixed(2);
    document.getElementById('resultadoTexto').innerHTML =
        `O tamanho de ${valorReal} ${unidadeEntrada.toUpperCase()} na escala 1:${escalaDenominador} é de <span style="font-weight: bold; color: #007BFF;">${resultadoFormatado} cm</span>.`;
}

// Exibe o campo de entrada para escala personalizada
document.getElementById('escala').addEventListener('change', function() {
    const customInput = document.getElementById('escalaCustomizada');
    if (this.value === 'outra') {
        customInput.style.display = 'inline';
        customInput.focus(); 
    } else {
        customInput.style.display = 'none';
        calcularConversao(); // Atualiza o resultado ao mudar para uma escala padrão
    }
});

// Atualiza o resultado ao digitar ou mudar os valores
document.querySelectorAll('input, select').forEach(item => {
    item.addEventListener('input', calcularConversao);
});

calcularConversao(); // Chama a função inicial para calcular
