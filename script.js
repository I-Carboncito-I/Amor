// script.js
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('heart-words');
    const totalWords = 45; // Número de "Te amo" que formarán el corazón

    function createHeart() {
        // Obtener el tamaño del contenedor para centrar el corazón
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        
        // Calcular el centro del contenedor
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        
        for(let i = 0; i < totalWords; i++) {
            const span = document.createElement('span');
            span.className = 'heart-text';
            span.textContent = 'Te amo';
            
            // Calcular la posición usando ecuaciones paramétricas del corazón
            const angle = (i / totalWords) * 2 * Math.PI;
            let x, y;
            
            // Ecuación paramétrica del corazón
            const t = angle;
            x = 12 * Math.pow(Math.sin(t), 3);
            y = -(11 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            
            // Aplicar el escalado y las posiciones fijas
            x = x * 15 + 275; // Centrado horizontalmente con el desplazamiento fijo
            y = y * 15 + 130; // Centrado verticalmente con el desplazamiento fijo
            
            // Ajustar la posición del corazón con respecto al centro
            x += (centerX - 300); // Ajustar con el centro dinámico
            y += (centerY - 25); // Ajustar con el centro dinámico
            
            // Rotar cada palabra para que siga la curva del corazón
            const rotation = (angle * 180 / Math.PI) + 90;
            
            // Aplicar las posiciones y rotaciones al elemento
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;
            span.style.transform = `rotate(${rotation}deg)`;
            
            container.appendChild(span);
        }
    }

    createHeart();

    // Actualizar la creación del corazón si se cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        container.innerHTML = ''; // Limpiar el contenedor
        createHeart(); // Volver a crear el corazón con el nuevo tamaño
    });
});
