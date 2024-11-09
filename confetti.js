class Confetti {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        
        // Ajustar cantidad de partículas para dispositivos móviles
        this.particleCount = Math.max(15, Math.floor(window.innerWidth /15)); // Menos partículas en pantallas pequeñas
        
        this.resizeCanvas();
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            const newCount = Math.max(80, Math.floor(window.innerWidth / 100)); // Actualiza la cantidad de partículas
            if (newCount !== this.particleCount) {
                this.particleCount = newCount;
                this.particles = [];
                this.createParticles();
            }
        });
        
        this.createParticles();
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const baseSize = Math.max(40, window.innerWidth / 100); // Tamaño de las partículas adaptado al tamaño de la pantalla
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: -10,
                size: Math.random() * baseSize + 5,
                speedY: Math.random() * 5 + 1, // Rango de velocidad más bajo para mejor rendimiento
                speedX: Math.random() * 2 - 1,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 0.5, // Velocidad de rotación reducida
                color: `hsl(${Math.random() * 30 + 345}, 100%, 50%)`
            });
        }
    }
    
    drawHeart(x, y, size, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation * Math.PI / 180);
        this.ctx.beginPath();
        this.ctx.moveTo(0, size / 4);
        this.ctx.bezierCurveTo(
            size / 2, -size / 2,
            size, size / 4,
            0, size
        );
        this.ctx.bezierCurveTo(
            -size, size / 4,
            -size / 2, -size / 2,
            0, size / 4
        );
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            p.y += p.speedY; // Caída de partículas
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            
            this.ctx.fillStyle = p.color;
            this.drawHeart(p.x, p.y, p.size, p.rotation);
            
            // Resetear partículas cuando lleguen al fondo
            if (p.y > this.canvas.height + p.size) {
                p.y = -p.size;
                p.x = Math.random() * this.canvas.width;
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Iniciar el confeti cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('confetti-canvas');
    new Confetti(canvas);
});