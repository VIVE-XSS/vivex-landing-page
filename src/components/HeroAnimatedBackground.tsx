import { useEffect, useRef } from "react";

interface HeroAnimatedBackgroundProps {
  isDarkMode: boolean;
}

export default function HeroAnimatedBackground({ isDarkMode }: HeroAnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // Responsive sizing
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Particle class for circuit nodes
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      maxConnections: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Float very slowly for a professional, calm experience
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.radius = Math.random() * 2 + 1.5;
        this.maxConnections = Math.floor(Math.random() * 2) + 2; // Limit wires for clean looks
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce from bounds slowly
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Keep inside bounds
        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }

      draw(context: CanvasRenderingContext2D, dark: boolean) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Node color
        if (dark) {
          context.fillStyle = "rgba(34, 211, 238, 0.4)"; // Cyan 400
        } else {
          context.fillStyle = "rgba(15, 23, 42, 0.25)"; // Deep Slate
        }
        
        context.fill();
      }
    }

    // Adapt particle count to width (fewer on mobile for amazing performance)
    const particleCount = Math.min(width < 768 ? 25 : 55, 60);
    const nodes: Node[] = [];
    for (let i = 0; i < particleCount; i++) {
      nodes.push(new Node());
    }

    // Animation Loop
    const drawAndLink = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw connecting traces/links (lines)
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        let currentConnections = 0;

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect nodes that are close to simulate circuit traces
          const connectionLimit = width < 768 ? 100 : 150;
          if (dist < connectionLimit && currentConnections < nodeA.maxConnections) {
            currentConnections++;
            
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);

            const alpha = (1 - dist / connectionLimit) * 0.15;
            if (isDarkMode) {
              // Custom gradient color trace (Cyan/Blue feel)
              ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
              ctx.lineWidth = 0.8;
            } else {
              // Soft slate lines in light mode
              ctx.strokeStyle = `rgba(15, 23, 42, ${alpha * 0.8})`;
              ctx.lineWidth = 0.6;
            }
            
            ctx.stroke();
          }
        }
      }

      // 2. Draw and update actual nodes
      nodes.forEach((node) => {
        node.update();
        node.draw(ctx, isDarkMode);
      });

      animationId = requestAnimationFrame(drawAndLink);
    };

    drawAndLink();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-80"
    />
  );
}
