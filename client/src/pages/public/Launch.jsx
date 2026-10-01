import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute, FaRocket, FaGem, FaStar } from 'react-icons/fa';
import PublicNavbar from '../../components/layout/PublicNavbar';
import Home from './Home';

// ==========================================
// 1. Web Audio API Synthesizer (Zero Dependencies)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playHover() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio fallback
    }
  }

  playBeep(count) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      // Ascending dramatic scale as countdown approaches 1
      const freqs = { 5: 523.25, 4: 587.33, 3: 659.25, 2: 783.99, 1: 1046.5 };
      const freq = freqs[count] || 600;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.38);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.38);
    } catch {
      // Audio fallback
    }
  }

  playGrandFanfare() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      // Majestic chord crescendo
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      notes.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.09, this.ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.0);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.06);
        osc.stop(this.ctx.currentTime + 2.0);
      });
    } catch {
      // Audio fallback
    }
  }
}

const sfx = new SoundFX();

// ==========================================
// 2. Interactive Canvas Particle Engine
// ==========================================
const InteractiveParticleEngine = ({ mode, intensity = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = mode === 'burst' ? 150 : 75;
    const particles = [];
    const colors = [
      'rgba(234, 179, 8, ',   // Gold
      'rgba(253, 224, 71, ',  // Bright Yellow
      'rgba(37, 99, 235, ',   // Royal Blue
      'rgba(96, 165, 250, ',  // Sky Blue
      'rgba(255, 255, 255, '  // Pure Diamond White
    ];

    for (let i = 0; i < particleCount; i++) {
      if (mode === 'burst') {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 16 + 4;
        particles.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 4.5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.015 + 0.007
        });
      } else {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.9 * intensity,
          vy: (Math.random() - 0.5) * 0.9 * intensity,
          radius: Math.random() * 2.8 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.65 + 0.25,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          pulse: Math.random() * Math.PI
        });
      }
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        if (mode === 'burst') {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.alpha -= p.decay;

          if (p.alpha > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + Math.max(0, p.alpha) + ')';
            ctx.shadowColor = p.color + '0.9)';
            ctx.shadowBlur = 14;
            ctx.fill();
            ctx.restore();
          }
        } else {
          p.pulse += p.pulseSpeed;
          const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.25;

          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.x -= (dx / dist) * force * 1.8;
            p.y -= (dy / dist) * force * 1.8;
          }

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.max(0.1, Math.min(1, currentAlpha)) + ')';
          ctx.shadowColor = p.color + '0.7)';
          ctx.shadowBlur = 9;
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mode, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

// ==========================================
// 3. Smoke & Shockwave Cloud on Unveil
// ==========================================
const GrandRevealSmoke = ({ active }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center overflow-hidden">
      {/* Light shockwave ring */}
      <motion.div
        initial={{ scale: 0.1, opacity: 0.95 }}
        animate={{ scale: 6, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-96 h-96 rounded-full border-4 border-amber-300 shadow-[0_0_100px_#fde047]"
      />

      {/* Billowing cloud bursts */}
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0.45, 0],
            scale: [0.3, 2.8, 5.5],
            x: (Math.random() - 0.5) * 900,
            y: (Math.random() - 0.5) * 650,
            rotate: (Math.random() - 0.5) * 140
          }}
          transition={{ duration: 2.2 + Math.random() * 0.8, ease: "easeOut" }}
          className="absolute w-40 h-40 bg-gradient-to-tr from-sky-100 via-blue-50 to-white rounded-full blur-2xl"
        />
      ))}
    </div>
  );
};

// ==========================================
// 4. Masterpiece 3D Luxury Satin Ribbon Bow (No Outlines)
// ==========================================
const MasterpieceButterflyKnot = ({ onLaunch, isHovered, setIsHovered }) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <motion.button
        onClick={onLaunch}
        onMouseEnter={() => {
          setIsHovered(true);
          sfx.playHover();
        }}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="relative group focus:outline-none cursor-pointer select-none flex items-center justify-center"
      >
        {/* Ambient Warm Golden Aura Glow */}
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-amber-400/25 via-yellow-300/35 to-amber-500/25 blur-3xl pointer-events-none group-hover:scale-120 transition-transform duration-700" />

        {/* Photorealistic 3D Satin Bow SVG - Completely Outline-Free */}
        <svg
          width="400"
          height="300"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-[0_18px_32px_rgba(180,83,9,0.35)] transition-all duration-500 group-hover:drop-shadow-[0_26px_50px_rgba(234,179,8,0.55)]"
        >
          <defs>
            {/* Main Gold Satin Gradient - Upper Loops */}
            <linearGradient id="gold-satin-upper-left" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="25%" stopColor="#fef08a" />
              <stop offset="55%" stopColor="#f59e0b" />
              <stop offset="85%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>

            <linearGradient id="gold-satin-upper-right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="25%" stopColor="#fef08a" />
              <stop offset="55%" stopColor="#f59e0b" />
              <stop offset="85%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>

            {/* Lower Loops Gradient */}
            <linearGradient id="gold-satin-lower-left" x1="80%" y1="10%" x2="0%" y2="90%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            <linearGradient id="gold-satin-lower-right" x1="20%" y1="10%" x2="100%" y2="90%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Inner Fold Depth (Warm golden amber, zero stark black) */}
            <linearGradient id="gold-inner-fold-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="60%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <linearGradient id="gold-inner-fold-right" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="60%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Draped Tails Gradient */}
            <linearGradient id="gold-tail-left" x1="50%" y1="0%" x2="20%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            <linearGradient id="gold-tail-right" x1="50%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Pillowy Center Knot Gradient */}
            <radialGradient id="gold-pillow-knot" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="30%" stopColor="#fef08a" />
              <stop offset="65%" stopColor="#f59e0b" />
              <stop offset="90%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>

            {/* Gloss Specular Light Sheen */}
            <linearGradient id="gold-gloss-sweep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Soft Ambient Knot Drop Shadow */}
            <filter id="soft-knot-shadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="#78350f" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Symmetrical Center Anchor at (200, 125) */}
          <g transform="translate(200, 125)">

            {/* --- 1. DRAPING RIBBON TAILS (ELEGANT SWALLOWTAIL CUT) --- */}
            {/* Left Tail */}
            <path
              d="M -12 15 C -28 55, -55 105, -48 160 L -25 135 L -8 152 C -10 100, -8 55, -4 15 Z"
              fill="url(#gold-tail-left)"
            />
            {/* Left Tail Soft Crease Accent */}
            <path
              d="M -12 15 C -20 55, -38 105, -25 135 L -8 152 C -10 100, -8 55, -4 15 Z"
              fill="#78350f"
              opacity="0.18"
            />

            {/* Right Tail */}
            <path
              d="M 12 15 C 28 55, 55 105, 48 160 L 25 135 L 8 152 C 10 100, 8 55, 4 15 Z"
              fill="url(#gold-tail-right)"
            />
            {/* Right Tail Soft Crease Accent */}
            <path
              d="M 12 15 C 20 55, 38 105, 25 135 L 8 152 C 10 100, 8 55, 4 15 Z"
              fill="#78350f"
              opacity="0.18"
            />

            {/* --- 2. REAR BACKGROUND LOOPS (LUSH MULTI-LOOP VOLUME) --- */}
            {/* Rear Upper Left */}
            <path
              d="M -16 -12 C -60 -65, -120 -60, -135 -20 C -142 5, -100 20, -18 2 Z"
              fill="url(#gold-satin-lower-left)"
              opacity="0.8"
            />
            {/* Rear Upper Right */}
            <path
              d="M 16 -12 C 60 -65, 120 -60, 135 -20 C 142 5, 100 20, 18 2 Z"
              fill="url(#gold-satin-lower-right)"
              opacity="0.8"
            />

            {/* --- 3. FOREGROUND MAIN LOOPS (ORGANIC FLOWING SATIN WINGS) --- */}
            {/* Main Left Loop */}
            <path
              d="M -14 -8 C -55 -55, -145 -45, -165 -5 C -178 26, -135 60, -78 38 C -42 24, -20 8, -8 0 Z"
              fill="url(#gold-satin-upper-left)"
            />
            {/* Natural Inner Silk Fold Left (Soft warm amber, NO dark hole) */}
            <path
              d="M -32 -6 C -75 -32, -135 -18, -142 0 C -142 16, -100 24, -55 12 C -40 8, -32 0, -32 -6 Z"
              fill="url(#gold-inner-fold-left)"
              opacity="0.75"
            />
            {/* Top Gloss Sheen Left */}
            <path
              d="M -16 -6 C -50 -42, -125 -32, -155 0 C -142 -14, -85 -30, -22 -6 Z"
              fill="url(#gold-gloss-sweep)"
            />

            {/* Main Right Loop */}
            <path
              d="M 14 -8 C 55 -55, 145 -45, 165 -5 C 178 26, 135 60, 78 38 C 42 24, 20 8, 8 0 Z"
              fill="url(#gold-satin-upper-right)"
            />
            {/* Natural Inner Silk Fold Right (Soft warm amber, NO dark hole) */}
            <path
              d="M 32 -6 C 75 -32, 135 -18, 142 0 C 142 16, 100 24, 55 12 C 40 8, 32 0, 32 -6 Z"
              fill="url(#gold-inner-fold-right)"
              opacity="0.75"
            />
            {/* Top Gloss Sheen Right */}
            <path
              d="M 16 -6 C 50 -42, 125 -32, 155 0 C 142 -14, 85 -30, 22 -6 Z"
              fill="url(#gold-gloss-sweep)"
            />

            {/* --- 4. PILLOWY REALISTIC SILK CENTER KNOT --- */}
            {/* Rounded Organic Fabric Knot */}
            <path
              d="M -22 -26 C -14 -28, 14 -28, 22 -26 C 18 -6, 19 6, 23 26 C 14 28, -14 28, -23 26 C -19 6, -18 -6, -22 -26 Z"
              fill="url(#gold-pillow-knot)"
              filter="url(#soft-knot-shadow)"
            />

            {/* Natural Soft Wrinkles (No outlines) */}
            <path
              d="M -18 -12 C -6 -8, 6 -8, 18 -12 C 14 -15, -14 -15, -18 -12 Z"
              fill="#78350f"
              opacity="0.25"
            />
            <path
              d="M -16 2 C -5 5, 5 5, 16 2 C 12 -1, -12 -1, -16 2 Z"
              fill="#78350f"
              opacity="0.2"
            />
            <path
              d="M -18 15 C -6 19, 6 19, 18 15 C 14 12, -14 12, -18 15 Z"
              fill="#78350f"
              opacity="0.25"
            />

            {/* Radiant Specular Gleam on Center Knot */}
            <ellipse cx="0" cy="-2" rx="8" ry="14" fill="#ffffff" opacity="0.4" />
          </g>
        </svg>

        {/* Floating Call to Action Pill */}
        <div className="absolute -bottom-8 z-20">
          <div className="px-5 py-2 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center gap-2 group-hover:scale-105 transition-all">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[11px] font-black text-amber-200 tracking-widest uppercase font-outfit">
              CLICK TO UNVEIL
            </span>
            <FaStar className="text-amber-300 text-xs ml-0.5" />
          </div>
        </div>
      </motion.button>
    </div>
  );
};

// ==========================================
// 5. Cinematic Holographic Countdown HUD
// ==========================================
const CountdownHUD = ({ count }) => {
  const statusMessages = {
    5: 'INITIALIZING SYSTEM ARCHITECTURE...',
    4: 'ENERGIZING GLOBAL LEARNER NETWORK...',
    3: 'SYNCING INDUSTRY LABS & COURSES...',
    2: 'DISENGAGING SECURITY SEALS...',
    1: 'UNVEILING SKILLTECH ACADEMY...',
    0: 'WELCOME TO THE FUTURE'
  };

  const progress = ((5 - count) / 5) * 100;
  const strokeDashoffset = 565 - (565 * progress) / 100;

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      {/* Outer Pulse Rings */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-88 h-88 rounded-full border-2 border-amber-400/35 blur-sm"
      />
      <motion.div
        animate={{ scale: [1.1, 1.38, 1.1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        className="absolute w-[26rem] h-[26rem] rounded-full border border-blue-400/35 blur-md"
      />

      {/* Main Glassmorphic Sphere */}
      <div className="relative w-64 h-64 rounded-full bg-white/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(37,99,235,0.25)] border-4 border-amber-300/90 flex items-center justify-center overflow-hidden">
        {/* SVG Circular Progress Meter */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="8"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#countdown-grad)"
            strokeWidth="10"
            strokeDasharray="565"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
          <defs>
            <linearGradient id="countdown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic Countdown Number */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={count}
            initial={{ scale: 0.3, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="flex items-center justify-center relative z-10"
          >
            <span className="text-[7.5rem] font-black font-outfit tracking-tighter bg-gradient-to-br from-blue-700 via-blue-600 to-amber-500 bg-clip-text text-transparent drop-shadow-md">
              {count}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* High-Tech Status Pill */}
      <motion.div
        key={`status-${count}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 px-6 py-2.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-amber-400/40 shadow-xl flex items-center gap-3 text-center max-w-md"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-xs font-mono font-bold tracking-widest text-cyan-200 uppercase">
          {statusMessages[count] || 'PREPARING UNVEIL...'}
        </span>
      </motion.div>
    </div>
  );
};

// ==========================================
// 6. Main High-End Launch Page Component
// ==========================================
const Launch = () => {
  const [countdown, setCountdown] = useState(5);
  const [launched, setLaunched] = useState(false);
  const [opening, setOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();

  // Handle Launch Trigger
  const handleStartLaunch = () => {
    if (launched) return;
    sfx.init();
    sfx.playBeep(5);
    setLaunched(true);
  };

  // Toggle Audio Mute
  const toggleMute = () => {
    sfx.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // 5-Second Countdown Logic
  useEffect(() => {
    if (!launched) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        const next = countdown - 1;
        setCountdown(next);
        if (next > 0) {
          sfx.playBeep(next);
        } else {
          sfx.playGrandFanfare();
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown finished: Trigger Grand Opening
      setOpening(true);
      const navTimer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 1600);
      return () => clearTimeout(navTimer);
    }
  }, [countdown, launched, navigate]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-900 z-[9999] font-outfit select-none">
      
      {/* ========================================================
          BACKGROUND LAYER 0: LIVE WEBSITE STAGE
          (Smoothly revealed as doors part with zero black screen!)
          ======================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none select-none">
        <PublicNavbar />
        <div className="pt-20">
          <Home />
        </div>
      </div>

      {/* ========================================================
          DOOR STAGE OVERLAY (z-10 to z-50)
          ======================================================== */}
      <div className="relative w-full h-full flex">
        {/* Ambient Canvas Lighting & Dust Sparks */}
        <InteractiveParticleEngine mode={opening ? 'burst' : 'ambient'} intensity={launched ? 2.5 : 1} />

        {/* Top Header Status Bar */}
        <div className="absolute top-6 left-0 right-0 z-40 flex items-center justify-between px-8 pointer-events-none">
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-xl px-5 py-2.5 rounded-full border border-gray-200/80 shadow-lg pointer-events-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black tracking-widest text-slate-800 uppercase font-outfit">
              SKILLTECH ACADEMY
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
              OFFICIAL LAUNCH
            </span>
          </div>

          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            className="pointer-events-auto w-10 h-10 rounded-full bg-white/95 backdrop-blur-xl border border-gray-200/80 shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600 hover:scale-105 transition-all cursor-pointer"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>

        {/* ========================================================
            LEFT SLIDING ARCHITECTURAL DOOR (White Pearl Luxury Surface)
            ======================================================== */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: opening ? '-105%' : 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-1/2 h-full relative z-10 flex items-center justify-end border-r border-amber-300/40"
          style={{
            background: 'radial-gradient(ellipse at 80% 50%, #ffffff 0%, #f8fafc 55%, #e2e8f0 100%)',
            boxShadow: '15px 0 50px rgba(15, 23, 42, 0.2)'
          }}
        >
          {/* Subtle Luxury Lattice Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
        </motion.div>

        {/* ========================================================
            RIGHT SLIDING ARCHITECTURAL DOOR (White Pearl Luxury Surface)
            ======================================================== */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: opening ? '105%' : 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-1/2 h-full relative z-10 flex items-center justify-start border-l border-amber-300/40"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, #ffffff 0%, #f8fafc 55%, #e2e8f0 100%)',
            boxShadow: '-15px 0 50px rgba(15, 23, 42, 0.2)'
          }}
        >
          {/* Subtle Luxury Lattice Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
        </motion.div>

        {/* Billowing Smoke & Light Shockwave on Unveil */}
        <GrandRevealSmoke active={opening} />

        {/* Radiant Seam Light Beam Between Doors */}
        {!opening && (
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-amber-300/80 to-transparent pointer-events-none z-20 shadow-[0_0_12px_#fde047]" />
        )}

        {/* ========================================================
            CENTER STAGE: BUTTERFLY KNOT OR COUNTDOWN HUD
            (Positioned precisely at 50% / 50% over the ribbon seam)
            ======================================================== */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center">
          <AnimatePresence>
            {!launched ? (
              <motion.div
                key="knot-view"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className="pointer-events-auto"
              >
                <MasterpieceButterflyKnot
                  onLaunch={handleStartLaunch}
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                />
              </motion.div>
            ) : !opening ? (
              <motion.div
                key="hud-view"
                initial={{ opacity: 0, scale: 0.6, x: '100vw' }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.8, transition: { duration: 0.3 } }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="pointer-events-auto"
              >
                <CountdownHUD count={countdown} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* ========================================================
            LOWER CARD: INVITATION CARD (Positioned comfortably below)
            ======================================================== */}
        <AnimatePresence>
          {!launched && (
            <motion.div
              key="invite-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30, transition: { duration: 0.25 } }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-auto px-8 py-5 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.14)] text-center flex flex-col items-center max-w-sm w-[90%] md:w-auto"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-[11px] font-extrabold tracking-widest text-blue-600 uppercase font-outfit">
                  THE FUTURE OF EDUCATION
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              </div>

              <h1 className="text-2xl font-black text-slate-800 tracking-tight font-outfit">
                Skill Tech Academy
              </h1>
              <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed">
                Join thousands of learners unlocking premier certified technical masteries.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 w-full text-amber-600 font-bold text-xs tracking-wider uppercase font-outfit">
                <FaRocket className="text-amber-500 animate-bounce" />
                <span>Tap Golden Knot to Launch</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Launch;
