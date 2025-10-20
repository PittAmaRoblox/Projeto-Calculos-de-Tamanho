document.addEventListener('DOMContentLoaded', () => {

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
        const valorRealInput = document.getElementById('ValorReal');
        const unidadeEntrada = document.getElementById('UnidadeEntrada').value;
        const escalaSelect = document.getElementById('escala').value;
        const escalaCustomizadaInput = document.getElementById('escalaCustomizada');
        const resultadoTexto = document.getElementById('resultadoTexto');

        const valorReal = parseFloat(valorRealInput.value);
        let escalaDenominador;

        if (escalaSelect === 'outra') {
            escalaDenominador = parseFloat(escalaCustomizadaInput.value);
        } else {
            escalaDenominador = parseFloat(escalaSelect);
        }

        if (isNaN(valorReal) || isNaN(escalaDenominador) || valorReal <= 0 || escalaDenominador <= 0) {
            resultadoTexto.textContent = 'Por favor, insira valores válidos e positivos para o Tamanho Real e a Escala.';
            return;
        }
        
        if (escalaSelect === 'outra' && escalaCustomizadaInput.style.display !== 'inline') {
             return;
        }

        const valorRealEmMM = converterParaMM(valorReal, unidadeEntrada);

        const tamanhoNoDesenhoEmMM = valorRealEmMM / escalaDenominador;
        
        const tamanhoNoDesenhoEmCM = tamanhoNoDesenhoEmMM / 10;

        const resultadoFormatado = tamanhoNoDesenhoEmCM.toFixed(2);
        
        const unidadeDisplay = unidadeEntrada === 'm' ? 'm' : unidadeEntrada.toUpperCase();
        
        resultadoTexto.innerHTML =
            `O tamanho de <span style="font-weight: bold;">${valorReal} ${unidadeDisplay}</span> na escala 1:${escalaDenominador} é de <span style="font-weight: bold; color: #007BFF;">${resultadoFormatado} cm</span>.`;
    }

    window.calcularConversao = calcularConversao;

    const escalaSelect = document.getElementById('escala');
    const escalaCustomizadaInput = document.getElementById('escalaCustomizada');

    escalaSelect.addEventListener('change', function() {
        if (this.value === 'outra') {
            escalaCustomizadaInput.style.display = 'inline';
            escalaCustomizadaInput.focus();
        } else {
            escalaCustomizadaInput.style.display = 'none';
        }
        calcularConversao();
    });

    const inputsToWatch = [
        'ValorReal', 
        'UnidadeEntrada', 
        'escalaCustomizada'
    ];
    
    inputsToWatch.forEach(id => {
        const element = document.getElementById(id);
        if(element) element.addEventListener('input', calcularConversao);
    });

    calcularConversao(); 

});