"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Flame,
  Zap,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Brain,
  Shield,
  Monitor,
} from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  primaryCta: { label: string; href: string; icon?: React.ElementType };
  secondaryCta: { label: string; href: string };
  gradient: string;
  icon: React.ElementType;
}

const heroSlides: HeroSlide[] = [
  {
    id: "main",
    badge: "Working Technology, Not Promises",
    badgeColor: "bg-green-500/20 border-green-500/30 text-green-400",
    title: "PYRAX",
    titleHighlight: "The Future of Blockchain",
    subtitle: "Next-Gen L1 with Native AI Compute",
    description:
      "PYRAX is a revolutionary Proof-of-Work blockchain featuring TriStream architecture, native AI inference, decentralized ML training, and 100,000+ TPS. Our nodes, mining, and AI compute are already built—not roadmap items.",
    primaryCta: { label: "Join Presale", href: "/presale", icon: ArrowRight },
    secondaryCta: { label: "Explore Ecosystem", href: "/technology" },
    gradient: "from-pyrax-orange via-pyrax-amber to-pyrax-orange",
    icon: Zap,
  },
  {
    id: "crucible",
    badge: "AI Compute Layer",
    badgeColor: "bg-purple-500/20 border-purple-500/30 text-purple-400",
    title: "Crucible",
    titleHighlight: "Where GPU Compute Forges Intelligence",
    subtitle: "Native AI Inference on Blockchain",
    description:
      "The first Layer 1 with native AI compute. GPU miners process AI inference jobs alongside mining, earning additional PYRAX rewards while powering decentralized AI. Run LLMs, generate images, and call AI from smart contracts.",
    primaryCta: { label: "Explore Crucible", href: "/crucible", icon: Sparkles },
    secondaryCta: { label: "Read Docs", href: "/docs/crucible" },
    gradient: "from-purple-500 via-pyrax-orange to-amber-400",
    icon: Sparkles,
  },
  {
    id: "foundry",
    badge: "ML Training Platform",
    badgeColor: "bg-orange-500/20 border-orange-500/30 text-orange-400",
    title: "Foundry",
    titleHighlight: "Where Raw Data is Forged into AI Models",
    subtitle: "Decentralized Machine Learning",
    description:
      "Train models on community GPUs at 70% lower cost than cloud providers. Federated learning, LoRA fine-tuning, and Byzantine-resistant aggregation. Train on Foundry, deploy on Crucible—complete AI lifecycle.",
    primaryCta: { label: "Explore Foundry", href: "/foundry", icon: Flame },
    secondaryCta: { label: "Read Docs", href: "/docs/foundry" },
    gradient: "from-orange-500 via-red-500 to-amber-400",
    icon: Flame,
  },
  {
    id: "technology",
    badge: "Revolutionary Architecture",
    badgeColor: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    title: "Technology",
    titleHighlight: "Built Different",
    subtitle: "TriStream ZK-DAG Architecture",
    description:
      "Stream A provides ASIC-grade security. Stream B enables GPU/CPU decentralization. Stream C delivers 100,000+ TPS with 100ms blocks. ZK-STARK proofs ensure cryptographic finality. No admin keys—true decentralization.",
    primaryCta: { label: "Learn More", href: "/technology", icon: Cpu },
    secondaryCta: { label: "Read Whitepaper", href: "/whitepaper" },
    gradient: "from-blue-500 via-cyan-400 to-purple-500",
    icon: Shield,
  },
  {
    id: "network-hub",
    badge: "Desktop Application",
    badgeColor: "bg-cyan-500/20 border-cyan-500/30 text-cyan-400",
    title: "Network Hub",
    titleHighlight: "Your Command Center",
    subtitle: "All-in-One Desktop App",
    description:
      "The ultimate PYRAX desktop application. Manage nodes, mine with CPU/GPU, stake PYRAX, run AI workers, and monitor your entire operation from one beautiful interface. Available for Windows, macOS, and Linux.",
    primaryCta: { label: "Download Now", href: "/network-hub", icon: Monitor },
    secondaryCta: { label: "View Features", href: "/network-hub#features" },
    gradient: "from-cyan-500 via-teal-400 to-green-500",
    icon: Monitor,
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = heroSlides[currentSlide];
  const Icon = slide.icon;

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://pyrax-assets.nyc3.cdn.digitaloceanspaces.com/media/EmberBG.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-10 transition-all duration-1000`} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 transition-all duration-500 ${slide.badgeColor}`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{slide.badge}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            <span className="block">{slide.title}</span>
            <span
              className={`block bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}
            >
              {slide.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-xl sm:text-2xl text-gray-300 font-medium">
            {slide.subtitle}
          </p>

          {/* Description */}
          <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto">
            {slide.description}
          </p>

          {/* CTAs */}
          <div className="mt-10 mb-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={slide.primaryCta.href}
              className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${slide.gradient} hover:opacity-90 text-white font-semibold rounded-lg transition-all shadow-lg`}
            >
              {slide.primaryCta.icon && <slide.primaryCta.icon className="h-5 w-5" />}
              {slide.primaryCta.label}
            </Link>
            <Link
              href={slide.secondaryCta.href}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-colors"
            >
              {slide.secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4">
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {heroSlides.map((s, index) => (
              <button
                key={s.id}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-pyrax-orange"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Slide Indicators with Labels */}
        <div className="hidden lg:flex absolute bottom-28 left-0 right-0 justify-center gap-4">
          {heroSlides.map((s, index) => {
            const SlideIcon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => goToSlide(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  index === currentSlide
                    ? "bg-white/10 text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <SlideIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;
