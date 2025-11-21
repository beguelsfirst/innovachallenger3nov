// BANCO DE DADOS INTEGRADO — Home + Página de Produto
// Cada produto deve ter um "id" que será usado na URL: produtos.html?id=xxxx

const produtosDB = {

    // =========================================================
    // 1) FONE GAMER HYPERX
    // =========================================================
    "fone-gamer-hyperx": {
        id: "fone-gamer-hyperx",
        nome: "Fone Gamer HyperX",
        preco: 199.90,
        descricao: `
            Headset gamer HyperX com excelente conforto, som potente e microfone com cancelamento de ruído.
            Ideal para FPS, lives e uso diário.
        `,
        imagens: [
            "Eduarda/public/fone1.jpg",
            "public/fone4.jpg",
            "public/fone3.png",
            "public/fone2.jpg"
        ],
        detalhes: [
            "Drivers de 50mm",
            "Microfone com cancelamento de ruído",
            "Conchas com espuma Memory Foam",
            "Conector P2 3.5mm",
            "Compatível com PC, PS4, Xbox e celular"
        ]
    },

    // =========================================================
    // 2) TECLADO MECÂNICO RGB
    // =========================================================
    "teclado-mecanico-rgb": {
        id: "teclado-mecanico-rgb",
        nome: "Teclado Mecânico RGB",
        preco: 329.00,
        descricao: `
            Teclado mecânico com iluminação RGB dinâmica e switches de alta durabilidade.
            Ideal para jogos e produtividade.
        `,
        imagens: [
            "Eduarda/public/teclado2.webp",
            "public/teclado1.jpg",
            "public/teclado3.avif"
        ],
        detalhes: [
            "Switches mecânicos Blue",
            "Iluminação RGB com vários efeitos",
            "Estrutura em alumínio",
            "Anti-ghosting completo",
            "Software de personalização"
        ]
    },

    // =========================================================
    // 3) MOUSE GAMER 3600 DPI
    // =========================================================
    "mouse-gamer-3600dpi": {
        id: "mouse-gamer-3600dpi",
        nome: "Mouse Gamer 3600 DPI",
        preco: 89.50,
        descricao: `
            Mouse gamer ergonômico com sensor de 3600 DPI e iluminação LED RGB.
        `,
        imagens: [
            "Eduarda/public/mouse1.jpg",
            "public/mouse2.png" 
        ],
        detalhes: [
            "Sensor óptico 3600 DPI",
            "LED RGB dinâmico",
            "Botão de troca de DPI",
            "Design anatômico",
            "Cabo trançado reforçado"
        ]
    },

    // =========================================================
    // 4) MONITOR 24'' 244Hz
    // =========================================================
    "monitor-24-244hz": {
        id: "monitor-24-244hz",
        nome: "Monitor 24'' 244Hz",
        preco: 1299.99,
        descricao: `
            Monitor gamer de 24” com 244Hz, 1ms de resposta e painel IPS.
            Ideal para eSports.
        `,
        imagens: [
            "Eduarda/public/monitor1.webp",
            "public/monitor2.avif",
            "public/monitor3.webp"
        ],
        detalhes: [
            "244Hz • 1ms",
            "Painel IPS",
            "Tecnologia FreeSync",
            "Ajuste de altura",
            "Bordas ultrafinas"
        ]
    },

    // =========================================================
    // 5) WEBCAM 1080P
    // =========================================================
    "webcam-1080p": {
        id: "webcam-1080p",
        nome: "Webcam 1080p",
        preco: 179.90,
        descricao: `
            Webcam Full HD com autofocus e microfone integrado.
            Excelente para reuniões e aulas.
        `,
        imagens: [
            "Eduarda/public/webcam2.jpg",
            "public/webcam1.webp"
        ],
        detalhes: [
            "Resolução 1080p",
            "Microfone embutido",
            "Autofocus inteligente",
            "Compatível com Windows, Mac e Linux",
            "Clipe universal ajustável"
        ]
    },

    // =========================================================
    // 6) CADEIRA GAMER
    // =========================================================
    "cadeira-gamer": {
        id: "cadeira-gamer",
        nome: "Cadeira Gamer",
        preco: 899.00,
        descricao: `
            Cadeira gamer ergonômica com reclinação e apoio lombar.
            Confortável para longas horas de jogo ou estudo.
        `,
        imagens: [
            "Eduarda/public/cadeira1.webp",
            "public/cadeira2.webp",
            "public/cadeira3.jpg"
        ],
        detalhes: [
            "Reclinação até 150°",
            "Apoio lombar ajustável",
            "Revestimento premium",
            "Base reforçada",
            "Almofada de pescoço"
        ]
    },
};
