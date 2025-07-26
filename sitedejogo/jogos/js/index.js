// Esconde o loading quando a página carregar
window.addEventListener('load', () => {
    document.getElementById('loading').style.display = 'none';
});

// Animação dos elementos com classe 'reveal' ao aparecer na viewport
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, index) => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(el);
    });
});

// Scroll bloqueado para snap vertical suave
let locked = false;
window.addEventListener('wheel', e => {
    if (locked) return;
    const pos = window.scrollY;
    const h = window.innerHeight;
    let target = null;

    if (e.deltaY > 0 && pos < h * 0.5) target = h;
    else if (e.deltaY < 0 && pos >= h * 0.5) target = 0;
    if (target !== null) {
        e.preventDefault();
        locked = true;
        window.scrollTo({ top: target, behavior: 'smooth' });
        setTimeout(() => locked = false, 800);
    }
}, { passive: false });

// Troca da navbar transparente para cor sólida ao rolar
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > window.innerHeight - 60) {
        nav.classList.add('navbar-scroll');
        nav.classList.remove('navbar-transparent');
    } else {
        nav.classList.add('navbar-transparent');
        nav.classList.remove('navbar-scroll');
    }
});

// Perfis (exemplo de prompt)
function selecionarPerfil() {
    const nome = prompt("Digite seu nome de jogador:");
    if (nome) {
        localStorage.setItem('nomePerfil', nome);
        alert("Bem-vindo, " + nome + "!");
    }
}

// Dados dos mapas/versões
const mapas = {
    zurich: { url: "https://subwaysurfersgame.online/embed/zurich", nome: "Zurich" },
    tokyo: { url: "https://subwaysurfersgame.online/embed/tokyo", nome: "Tóquio" },
    newyork: { url: "https://subwaysurfersgame.online/embed/new-york", nome: "Nova York" }
};

// Função para carregar o jogo e vídeo correspondente
function carregarJogo(versao) {
    const data = mapas[versao];
    if (!data) return;

    // Atualiza iframe e título
    document.getElementById('gameFrame').src = data.url;
    document.getElementById('tituloJogo').textContent = "Subway Surfers " + data.nome;

    // Atualiza vídeo do banner
    const video = document.getElementById('bannerVideo');
    const source = video.querySelector('source');
    source.src = `jogos/video/${versao}.mp4`;
    video.load();
    video.play();
}

// Botão fullscreen para iframe
document.getElementById('fullscreenBtn').addEventListener('click', () => {
    const iframe = document.getElementById('gameFrame');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    } else {
        alert("Seu navegador não suporta tela cheia para este elemento.");
    }
});

// Envio do formulário de contato
document.getElementById('formContato').addEventListener('submit', e => {
    e.preventDefault();
    alert("Obrigado por entrar em contato!");
    e.target.reset();
});