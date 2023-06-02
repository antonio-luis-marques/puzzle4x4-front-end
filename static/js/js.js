function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Criar um array com os números de 1 a 16
var numeros = Array.from({ length: 16 }, (_, index) => index + 1);

// Embaralhar o array aleatoriamente
numeros = shuffleArray(numeros);

// Obter a referência do elemento <div> do tabuleiro
var numerosAleatoriosDiv = document.querySelector('.puzzle');

// Gerar números aleatórios e adicionar ao elemento <div>

for (var i = 0; i < 4; i++) {
  for(var j = 0; j < 4; j++) {
    index = i * 4 + j
    var numeroAleatorio = numeros[index];
    var numeroElemento = document.createElement('button');
    const atributos = {
      'data-linha': i,
      'data-coluna': j
    };
    for (const chave in atributos) {
      if (atributos.hasOwnProperty(chave)) {
        numeroElemento.setAttribute(chave, atributos[chave]);
      }
    }
    numeroElemento.textContent = numeroAleatorio === 16 ? '' : numeroAleatorio;
    numerosAleatoriosDiv.appendChild(numeroElemento);
  }
}
    // Obter todos os botões do jogo
    const botoes = document.querySelectorAll('.puzzle button');
    var estadoDoJogo = "parado"; // Inicialmente, o jogo este parado


    let tempoRestante, contadorMovimentos;

    tempoRestante = 250;
    contadorMovimentos = 0;

    let intervalo; // armazena o ID do intervalo
    const botaoIniciar = document.querySelector('.menu button');

    // Adicionar evento de clique em cada botão
    let jogoIniciado = false;
    perder = document.querySelector('.perder');
    ganhar = document.querySelector('.ganhar');
    fim = document.querySelector('.fim');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {

            if (!jogoIniciado) {
                return;
            }
            // Obter a linha e coluna do botão clicado
            const linha = parseInt(botao.dataset.linha);
            const coluna = parseInt(botao.dataset.coluna);

            // Verificar se o botão vazio está na mesma linha ou coluna que o botão clicado
            const adjacentes = [
              { linha: -1, coluna: 0 }, // cima
              { linha: 1, coluna: 0 },  // baixo
              { linha: 0, coluna: -1 }, // esquerda
              { linha: 0, coluna: 1 }   // direita
            ];

            // Verificar se o botão vazio está em uma posição adjacente ao botão clicado
            let botaoVazio;
            for (const adjacente of adjacentes) {
              const linhaAdjacente = linha + adjacente.linha;
              const colunaAdjacente = coluna + adjacente.coluna;
              const botaoAdjacente = document.querySelector(`[data-linha="${linhaAdjacente}"][data-coluna="${colunaAdjacente}"]`);
              if (botaoAdjacente && botaoAdjacente.innerHTML === '') {
                botaoVazio = botaoAdjacente;
                break;
              }
            }

            // Se houver um botão vazio adjacente, mover o botão clicado para o espaço vazio
            if (botaoVazio) {
              botaoVazio.innerHTML = botao.innerHTML;
              botao.innerHTML = '';
              contadorMovimentos++; // atualizar o contador de movimentos
              document.querySelector('.menu span').textContent = `move: ${contadorMovimentos}`; // atualizar o texto do span

              // Verificar se o jogo foi concluído
              let jogoConcluido = true;
              let numeroEsperado = 1;
              botoes.forEach(botao => {
                if (botao.innerHTML !== '' && parseInt(botao.innerHTML) !== numeroEsperado) {
                  jogoConcluido = false;
                }
                numeroEsperado++;
              });

                //verificar se o jogador ganhou
              if (jogoConcluido) {
                jogada(true);
                clearInterval(intervalo); // parar o temporizador
                ganhar.classList.remove('d-none');
                ganhar.classList.add('d-flex');
                fim.classList.remove('d-none');
                fim.classList.add('d-flex');

              }
            }
        });

    });
    botaoIniciar.addEventListener('click', () => {
       if(estadoDoJogo === 'parado'){
        jogoIniciado = true;
        estadoDoJogo = 'jogando';
        botaoIniciar.innerHTML = 'Recomeçar';
        // Obter o elemento span do tempo
        const tempoSpan = document.querySelector('.menu .time');

        // Definir o tempo inicial em segundos

        // Definir o temporizador para atualizar o tempo a cada segundo
            intervalo = setInterval(() => {
              tempoRestante--;
              tempoSpan.textContent = `time: ${tempoRestante}`;
              if (tempoRestante === 0) {

                 jogada(false);
                clearInterval(intervalo);
                perder.classList.remove('d-none');
                perder.classList.add('d-flex');
                fim.classList.remove('d-none');
                fim.classList.add('d-flex');


              }
            }, 1000);
       }else{
        if(estadoDoJogo === 'jogando'){
           window.location.reload();
        }
       }
    });

    const okPerder = document.querySelector('.perder button');
    okPerder.addEventListener('click', ()=>{
        window.location.reload();
    });
    const okGanhar = document.querySelector('.ganhar button');
    okGanhar.addEventListener('click', ()=>{
        window.location.reload();
    });


  function atualizarCodigo(codigo) {
    document.querySelector("#codigo").innerText = 'Voce ganhou';
  }

  function jogada(estado) {
    const operadora = document.querySelector('.select-operadora').value;
    const valor = document.querySelector('.select-valor').value;
    const tempo_jogo = 250-tempoRestante; // subtrair o tempo de espera antes do jogo iniciar
    const movimentos = contadorMovimentos;

  }
