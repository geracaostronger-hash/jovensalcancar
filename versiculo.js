const versiculos = [
    "O Senhor é o meu pastor; nada me faltará. — Salmos 23:1",
    "Tudo posso naquele que me fortalece. — Filipenses 4:13",
    "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito. — João 3:16",
    "Entrega o teu caminho ao Senhor; confia nele, e ele o fará. — Salmos 37:5",
    "O choro pode durar uma noite, mas a alegria vem pela manhã. — Salmos 30:5",
    "Buscai primeiro o reino de Deus e a sua justiça. — Mateus 6:33",
    "Sede fortes e corajosos, não temais. — Deuteronômio 31:6",
    "Em tudo dai graças. — 1 Tessalonicenses 5:18",
    "O Senhor é bom, um refúgio em tempos de angústia. — Naum 1:7",
    "Clama a mim, e responder-te-ei. — Jeremias 33:3",
    "O Senhor lutará por vocês; tão somente acalmem-se. — Êxodo 14:14",
    "Se Deus é por nós, quem será contra nós? — Romanos 8:31",
    "Alegrai-vos sempre no Senhor. — Filipenses 4:4",
    "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho. — Salmos 119:105",
    "O Senhor te guardará de todo mal; guardará a tua alma. — Salmos 121:7",
    "Perto está o Senhor dos que têm o coração quebrantado. — Salmos 34:18",
    "Confia no Senhor de todo o teu coração. — Provérbios 3:5",
    "Não temas, porque eu sou contigo. — Isaías 41:10",
    "O Senhor é a minha luz e a minha salvação. — Salmos 27:1",
    "Bem-aventurados os pacificadores. — Mateus 5:9",
    "E conhecereis a verdade, e a verdade vos libertará. — João 8:32",
    "Regozijai-vos na esperança, sede pacientes na tribulação, perseverai na oração. — Romanos 12:12",
    "Deus é o nosso refúgio e fortaleza. — Salmos 46:1",
    "O amor é paciente, o amor é bondoso. — 1 Coríntios 13:4",
    "O justo viverá pela fé. — Romanos 1:17",
    "Grandes coisas fez o Senhor por nós, e por isso estamos alegres. — Salmos 126:3",
    "O Senhor cumprirá o seu propósito em mim. — Salmos 138:8",
    "A graça do Senhor Jesus Cristo seja com o vosso espírito. — Filipenses 4:23",
    "Sede firmes e constantes, sempre abundantes na obra do Senhor. — 1 Coríntios 15:58",
    "Elevo os meus olhos para os montes; de onde me virá o socorro? O meu socorro vem do Senhor. — Salmos 121:1-2"
];

function versiculoDoDia() {
    const agora = new Date();
    const utc = agora.getTime() + (agora.getTimezoneOffset() * 60000);
    const brasilia = new Date(utc - (3 * 3600000)); // UTC-3

    const inicioAno = new Date(brasilia.getFullYear(), 0, 0);
    const diff = brasilia - inicioAno;
    const umDia = 1000 * 60 * 60 * 24;
    const diaDoAno = Math.floor(diff / umDia);

    const index = diaDoAno % versiculos.length;
    document.getElementById("versiculo").textContent = versiculos[index];

    atualizarContagemRegressiva(brasilia);
}

function atualizarContagemRegressiva(agora) {
    const proximaTroca = new Date(agora);
    proximaTroca.setHours(24, 0, 0, 0); // próxima meia-noite

    function atualizar() {
        const agoraAtualizado = new Date();
        const utc = agoraAtualizado.getTime() + (agoraAtualizado.getTimezoneOffset() * 60000);
        const brasiliaAtual = new Date(utc - (3 * 3600000));

        const tempoRestante = proximaTroca - brasiliaAtual;

        if (tempoRestante <= 0) {
            versiculoDoDia(); // troca automaticamente quando chegar a 00:00
            return;
        }

        const horas = Math.floor((tempoRestante / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((tempoRestante / (1000 * 60)) % 60);
        const segundos = Math.floor((tempoRestante / 1000) % 60);

        document.getElementById("contador").textContent =
            `Próximo versículo em ${horas.toString().padStart(2, '0')}:${minutos
                .toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }

    atualizar();
    setInterval(atualizar, 1000);
}

versiculoDoDia();
