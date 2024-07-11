document.addEventListener('DOMContentLoaded', () => {
    // 1. Crear un array de cartas con pares de imágenes.
    const cartaArray = [
        { name: 'manzana', img: 'imagenes/manzana.png' },
        { name: 'piña', img: 'imagenes/piña.jpeg' },
        { name: 'fresa', img: 'imagenes/fresa.jpeg' },
        { name: 'naranja', img: 'imagenes/naranja.jpeg' },
        { name: 'sandia', img: 'imagenes/sandia.png' },
        { name: 'uva', img: 'imagenes/uva.jpeg' },
        { name: 'manzana', img: 'imagenes/manzana.png' },
        { name: 'piña', img: 'imagenes/piña.jpeg' },
        { name: 'fresa', img: 'imagenes/fresa.jpeg' },
        { name: 'naranja', img: 'imagenes/naranja.jpeg' },
        { name: 'sandia', img: 'imagenes/sandia.png' },
        { name: 'uva', img: 'imagenes/uva.jpeg' }
    ];

    // 2. Mezclar aleatoriamente las cartas.
    cartaArray.sort(() => 0.5 - Math.random());

    // 3. Obtener los elementos del DOM.
    const grid = document.getElementById('memoria-cartas');
    const reiniciarBtn = document.getElementById('reiniciar-btn');

    // 4. Inicializar variables para el juego.
    let cartasElegidas = [];
    let cartasElegidasId = [];
    let cartasIguales = [];

    // 5. Crear el tablero de cartas.
    function crearTablero() {
        grid.innerHTML = ''; // Limpiar el tablero antes de crear las cartas
        for (let i = 0; i < cartaArray.length; i++) {
            const carta = document.createElement('div');
            carta.classList.add('carta');
            carta.dataset.id = i;

            const imagenCarta = document.createElement('img');
            imagenCarta.src = cartaArray[i].img;
            imagenCarta.style.display = 'none';
            carta.appendChild(imagenCarta);

            carta.addEventListener('click', voltearCarta);
            grid.appendChild(carta);
        }
    }

    // 6. Verificar si las cartas elegidas son iguales.
    function verificarIguales() {
        if (cartasElegidas.length === 2 && cartasElegidasId.length === 2) {
            const [opcionUnoId, opcionDosId] = cartasElegidasId;
            const [opcionUno, opcionDos] = cartasElegidas.map(nombre => nombre.toLowerCase());

            const carta1 = document.querySelector(`.carta[data-id="${opcionUnoId}"]`);
            const carta2 = document.querySelector(`.carta[data-id="${opcionDosId}"]`);

            if (opcionUno === opcionDos && opcionUnoId !== opcionDosId) {
                cartasIguales.push(opcionUnoId, opcionDosId);
                carta1.classList.add('iguales');
                carta2.classList.add('iguales');
            } else {
                setTimeout(() => {
                    carta1.classList.remove('vuelta');
                    carta2.classList.remove('vuelta');
                    carta1.querySelector('img').style.display = 'none';
                    carta2.querySelector('img').style.display = 'none';
                }, 1000);
            }

            cartasElegidas = [];
            cartasElegidasId = [];
        }
    }

    // 7. Función para voltear una carta.
    function voltearCarta() {
        const cartaId = this.dataset.id;
        if (!cartasElegidasId.includes(cartaId) && !cartasIguales.includes(cartaId)) {
            this.classList.add('vuelta');
            this.querySelector('img').style.display = 'block';
            cartasElegidas.push(cartaArray[cartaId].name);
            cartasElegidasId.push(cartaId);

            if (cartasElegidas.length === 2) {
                setTimeout(verificarIguales, 500);
            }
        }
    }

    // 8. Función para reiniciar el juego.
    window.reiniciarJuego = function() {
        cartasElegidas = [];
        cartasElegidasId = [];
        cartasIguales = [];
        cartaArray.sort(() => 0.5 - Math.random());
        crearTablero();
    };

    // 9. Agregar evento de click al botón de reiniciar.
    reiniciarBtn.addEventListener('click', reiniciarJuego);

    // 10. Crear el tablero al cargar la página.
    crearTablero();
});
