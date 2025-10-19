import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Telescope } from "lucide-react";

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated Canvas Background */}

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
