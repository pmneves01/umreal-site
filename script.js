// Alternar Modo Escuro
document.getElementById("toggle-theme").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Buscar a cotação da moeda selecionada e converter automaticamente
async function converterMoeda() {
    const moedaOrigem = document.getElementById("moeda-origem").value;
    const moedaDestino = document.getElementById("moeda-destino").value;
    const valor = parseFloat(document.getElementById("valor-input").value);

    if (isNaN(valor) || valor <= 0) {
        document.getElementById("resultado").innerText = "Digite um valor válido";
        return;
    }

    if (moedaOrigem === moedaDestino) {
        document.getElementById("resultado").innerText = `1 ${moedaOrigem} = 1 ${moedaDestino}`;
        return;
    }

    const url = `https://economia.awesomeapi.com.br/json/last/${moedaOrigem}-${moedaDestino}`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        const taxa = parseFloat(dados[`${moedaOrigem}${moedaDestino}`]?.bid);

        if (!taxa) {
            document.getElementById("resultado").innerText = "Erro na conversão";
            return;
        }

        const resultado = (valor * taxa).toFixed(4);
        document.getElementById("resultado").innerText = `${valor} ${moedaOrigem} = ${resultado} ${moedaDestino}`;
    } catch (erro) {
        document.getElementById("resultado").innerText = "Erro na conversão";
        console.error("Erro ao buscar conversão:", erro);
    }
}

// Buscar e exibir notícias econômicas
async function carregarNoticias() {
    const apiKey = "SUA_API_KEY"; // Substitua pela sua chave da NewsAPI
    const url = `https://newsapi.org/v2/top-headlines?category=business&language=pt&apiKey=${apiKey}`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        const noticiasContainer = document.getElementById("noticias-container");
        noticiasContainer.innerHTML = "";

        dados.articles.slice(0, 5).forEach((noticia) => {
            const noticiaItem = document.createElement("p");
            noticiaItem.innerHTML = `<a href="${noticia.url}" target="_blank">${noticia.title}</a>`;
            noticiasContainer.appendChild(noticiaItem);
        });
    } catch (erro) {
        document.getElementById("noticias-container").innerText = "Erro ao carregar notícias";
        console.error("Erro ao buscar notícias:", erro);
    }
}

// Atualiza a conversão e as notícias ao carregar a página
window.onload = () => {
    converterMoeda();
    carregarNoticias();
};
