import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Telescope } from "lucide-react";

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;
    let time = 0;

    const animate = () => {
      // Sky gradient - deep blue to warm orange/red horizon
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGradient.addColorStop(0, "#0a1428");
      skyGradient.addColorStop(0.3, "#1a2a4e");
      skyGradient.addColorStop(0.6, "#2d3a5c");
      skyGradient.addColorStop(0.85, "#5a3a2a");
      skyGradient.addColorStop(1, "#8b4513");
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated sun 1 (large, warm glow)
      const sun1X = canvas.width * 0.75;
      const sun1Y = canvas.height * 0.25 + Math.sin(time * 0.0005) * 20;
      const sun1Size = 80;

      // Sun 1 glow layers
      ctx.fillStyle = "rgba(255, 100, 0, 0.15)";
      ctx.beginPath();
      ctx.arc(sun1X, sun1Y, sun1Size * 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 150, 0, 0.25)";
      ctx.beginPath();
      ctx.arc(sun1X, sun1Y, sun1Size * 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ff8800";
      ctx.beginPath();
      ctx.arc(sun1X, sun1Y, sun1Size, 0, Math.PI * 2);
      ctx.fill();

      // Animated sun 2 (smaller, cooler)
      const sun2X = canvas.width * 0.2;
      const sun2Y =
        canvas.height * 0.35 + Math.sin(time * 0.0003 + Math.PI) * 15;
      const sun2Size = 50;

      ctx.fillStyle = "rgba(200, 100, 255, 0.2)";
      ctx.beginPath();
      ctx.arc(sun2X, sun2Y, sun2Size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#d080ff";
      ctx.beginPath();
      ctx.arc(sun2X, sun2Y, sun2Size, 0, Math.PI * 2);
      ctx.fill();

      // Distant planet (small, in background)
      const planetX = canvas.width * 0.5;
      const planetY = canvas.height * 0.2;
      const planetSize = 35;

      ctx.fillStyle = "rgba(100, 200, 255, 0.3)";
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetSize * 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#64c8ff";
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetSize, 0, Math.PI * 2);
      ctx.fill();

      // Alien trees/plants - left side
      drawAlienTree(
        ctx,
        canvas.width * 0.1,
        canvas.height * 0.65,
        120,
        time,
        "#8b3a3a"
      );
      drawAlienTree(
        ctx,
        canvas.width * 0.25,
        canvas.height * 0.7,
        100,
        time + 1000,
        "#6b4a3a"
      );
      drawAlienTree(
        ctx,
        canvas.width * 0.05,
        canvas.height * 0.75,
        80,
        time + 500,
        "#a04a3a"
      );

      // Alien trees/plants - right side
      drawAlienTree(
        ctx,
        canvas.width * 0.85,
        canvas.height * 0.68,
        110,
        time + 2000,
        "#7a3a4a"
      );
      drawAlienTree(
        ctx,
        canvas.width * 0.92,
        canvas.height * 0.72,
        95,
        time + 1500,
        "#8b3a5a"
      );

      // Foreground landscape with color variation
      const landscapeGradient = ctx.createLinearGradient(
        0,
        canvas.height * 0.7,
        0,
        canvas.height
      );
      landscapeGradient.addColorStop(0, "rgba(139, 69, 19, 0.4)");
      landscapeGradient.addColorStop(0.5, "rgba(184, 92, 23, 0.6)");
      landscapeGradient.addColorStop(1, "rgba(139, 69, 19, 0.8)");
      ctx.fillStyle = landscapeGradient;
      ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);

      // Animated floating particles/dust
      for (let i = 0; i < 30; i++) {
        const x =
          (Math.sin(i * 12.9898 + time * 0.0002) * 0.5 + 0.5) * canvas.width;
        const y =
          (Math.cos(i * 78.233 + time * 0.0001) * 0.5 + 0.5) *
          canvas.height *
          0.6;
        const size = Math.sin(i * 45.164 + time * 0.001) * 0.5 + 1;
        const opacity = Math.sin(i * 23.456 + time * 0.0005) * 0.3 + 0.2;

        ctx.fillStyle = `rgba(255, 200, 100, ${opacity})`;
        ctx.fillRect(x, y, size, size);
      }

      // Twinkling stars
      for (let i = 0; i < 80; i++) {
        const x = (Math.sin(i * 12.9898) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(i * 78.233) * 0.5 + 0.5) * canvas.height * 0.5;
        const twinkle = Math.sin(i * 45.164 + time * 0.002) * 0.5 + 0.5;
        const size = Math.sin(i * 23.456) * 0.5 + 0.5;

        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.6})`;
        ctx.fillRect(x, y, size, size);
      }

      time++;
      animationId = requestAnimationFrame(animate);
    };

    function drawAlienTree(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      height: number,
      time: number,
      color: string
    ) {
      // Trunk
      ctx.fillStyle = color;
      ctx.fillRect(x - 8, y, 16, height);

      // Animated branches/leaves
      const branchCount = 5;
      for (let i = 0; i < branchCount; i++) {
        const branchY = y + (height / branchCount) * i;
        const sway = Math.sin(time * 0.0003 + i) * 15;

        // Left branch
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x, branchY);
        ctx.quadraticCurveTo(
          x - 30 + sway,
          branchY - 20,
          x - 50 + sway,
          branchY - 40
        );
        ctx.stroke();

        // Right branch
        ctx.beginPath();
        ctx.moveTo(x, branchY);
        ctx.quadraticCurveTo(
          x + 30 - sway,
          branchY - 20,
          x + 50 - sway,
          branchY - 40
        );
        ctx.stroke();

        // Leaf clusters
        ctx.fillStyle = `rgba(${Math.sin(time * 0.0002 + i) * 50 + 150}, ${
          Math.cos(time * 0.0002 + i) * 50 + 100
        }, 50, 0.7)`;
        ctx.beginPath();
        ctx.arc(x - 50 + sway, branchY - 40, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + 50 - sway, branchY - 40, 12, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-2xl">
          {/* Logo/Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                <Telescope className="w-8 h-8 text-cyan-400" />
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              ExoBrasilNet
            </h1>

            <p className="text-xl md:text-2xl text-amber-300 font-semibold tracking-widest">
              DESCOBERTA COLABORATIVA
            </p>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Analise curvas de luz e descubra exoplanetas. Contribua para a
              ciência enquanto explora os mistérios do universo.
            </p>

            <p className="text-sm md:text-base text-white/60">
              Junte-se a uma comunidade global de astrônomos amadores e
              profissionais na busca por novos mundos.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              onClick={onGetStarted}
              className="btn-primary px-8 py-6 text-lg font-semibold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-cyan-500/50"
            >
              Começar Análise
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-12 text-center">
            <div className="glass-card p-4 rounded-lg border border-white/10">
              <div className="text-2xl font-bold text-cyan-400">1.2K+</div>
              <div className="text-xs text-white/60 mt-1">Análises</div>
            </div>
            <div className="glass-card p-4 rounded-lg border border-white/10">
              <div className="text-2xl font-bold text-purple-400">340+</div>
              <div className="text-xs text-white/60 mt-1">Membros</div>
            </div>
            <div className="glass-card p-4 rounded-lg border border-white/10">
              <div className="text-2xl font-bold text-blue-400">12</div>
              <div className="text-xs text-white/60 mt-1">Descobertas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
