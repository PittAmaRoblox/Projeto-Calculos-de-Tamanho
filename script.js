// Garante que o script só rode após o HTML estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Converte um valor de uma unidade de medida (m, cm, mm) para milímetros (mm).
     * @param {number} valor - O valor a ser convertido.
     * @param {string} unidade - A unidade de medida de entrada ('m', 'cm', 'mm').
     * @returns {number} O valor em milímetros.
     */
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

    /**
     * Realiza o cálculo da escala e exibe o resultado.
     */
    function calcularConversao() {
        const valorRealInput = document.getElementById('ValorReal');
        const unidadeEntrada = document.getElementById('UnidadeEntrada').value;
        const escalaSelect = document.getElementById('escala').value;
        const escalaCustomizadaInput = document.getElementById('escalaCustomizada');
        const resultadoTexto = document.getElementById('resultadoTexto');

        const valorReal = parseFloat(valorRealInput.value);
        let escalaDenominador;

        // 1. Determina o denominador da escala
        if (escalaSelect === 'outra') {
            escalaDenominador = parseFloat(escalaCustomizadaInput.value);
        } else {
            escalaDenominador = parseFloat(escalaSelect);
        }

        // 2. Validação dos inputs
        if (isNaN(valorReal) || isNaN(escalaDenominador) || valorReal <= 0 || escalaDenominador <= 0) {
            resultadoTexto.textContent = 'Por favor, insira valores válidos e positivos para o Tamanho Real e a Escala.';
            return;
        }
        
        // Impede o cálculo se o valor de escala customizada não estiver visível (apenas um reforço)
        if (escalaSelect === 'outra' && escalaCustomizadaInput.style.display !== 'inline') {
             // Isto pode ocorrer se o input for disparado por um evento no campo errado
             return;
        }


        // 3. Conversão e Cálculo
        const valorRealEmMM = converterParaMM(valorReal, unidadeEntrada);

        // Tamanho no desenho = (Tamanho Real em mm) / Escala
        const tamanhoNoDesenhoEmMM = valorRealEmMM / escalaDenominador;
        
        // Conversão do resultado para CM, pois é a unidade padrão para desenhos técnicos
        const tamanhoNoDesenhoEmCM = tamanhoNoDesenhoEmMM / 10;

        // 4. Exibição do Resultado
        const resultadoFormatado = tamanhoNoDesenhoEmCM.toFixed(2);
        
        // Normaliza a unidade para exibição
        const unidadeDisplay = unidadeEntrada === 'm' ? 'm' : unidadeEntrada.toUpperCase();
        
        resultadoTexto.innerHTML =
            `O tamanho de <span style="font-weight: bold;">${valorReal} ${unidadeDisplay}</span> na escala 1:${escalaDenominador} é de <span style="font-weight: bold; color: #007BFF;">${resultadoFormatado} cm</span>.`;
    }

    // Exporta a função para que possa ser chamada pelo onclick do botão (opcional)
    window.calcularConversao = calcularConversao;

    // --- Configuração dos Eventos (Listeners) ---

    const escalaSelect = document.getElementById('escala');
    const escalaCustomizadaInput = document.getElementById('escalaCustomizada');

    // 1. Lógica para mostrar/esconder o campo de escala customizada
    escalaSelect.addEventListener('change', function() {
        if (this.value === 'outra') {
            escalaCustomizadaInput.style.display = 'inline';
            escalaCustomizadaInput.focus(); // Coloca o foco no campo
        } else {
            escalaCustomizadaInput.style.display = 'none';
        }
        // Dispara o cálculo em qualquer mudança na escala
        calcularConversao();
    });

    // 2. Dispara o cálculo ao mudar qualquer input ou select
    // Seu código original fazia isso, mas ajustei para ser mais seletivo e eficiente.
    const inputsToWatch = [
        'ValorReal', 
        'UnidadeEntrada', 
        'escalaCustomizada'
    ];
    
    inputsToWatch.forEach(id => {
        const element = document.getElementById(id);
        // Usamos 'input' para inputs de texto/número e 'change' para selects,
        // mas o 'input' no campo de número customizado também é importante.
        if(element) element.addEventListener('input', calcularConversao);
    });

    // 3. Execução inicial para mostrar um resultado ao carregar a página
    calcularConversao(); 

});