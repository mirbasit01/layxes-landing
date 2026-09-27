"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

export interface HomeHeroSlide {
  id: string;
  imageUrl: string;
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}

export function HomeHero({ mode = "slider", slides }: { mode?: "single" | "slider"; slides: HomeHeroSlide[] }) {
  const visibleSlides = slides.length ? slides : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = visibleSlides[Math.min(activeIndex, visibleSlides.length - 1)];

  if (!active) return null;
  return (
    <section className="layx-hero relative min-h-[calc(100svh-2.5rem)] overflow-hidden bg-black text-white">
      {visibleSlides.map((slide, index) => (
        <div key={slide.id} aria-hidden={index !== activeIndex} className={`absolute inset-0 transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <Link href={slide.href || "/products"} tabIndex={index === activeIndex ? 0 : -1} aria-label={`Explore ${slide.title}`} className="absolute inset-0 z-0">
            <Image src={slide.imageUrl} alt={`${slide.eyebrow}: ${slide.title}`} fill priority={index === 0} sizes="100vw" className="object-cover object-[center_38%] opacity-70" />
          </Link>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/5" />
        </div>
      ))}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-[1440px] items-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="max-w-4xl">
          <p className="eyebrow flex items-center gap-3 text-white"><span className="h-px w-8 bg-white" />{active.eyebrow}</p>
          <h1 key={active.id} className="mt-8 max-w-4xl animate-fade-in font-display text-[clamp(4rem,11vw,9.5rem)] font-bold uppercase leading-[.82] tracking-[-.09em]">{active.title}</h1>
          <p className="mt-8 max-w-md text-base leading-7 text-white/75 sm:text-lg">{active.description}</p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href={active.href || "/products"} className="inline-flex h-14 items-center gap-8 bg-white px-6 text-xs font-bold uppercase tracking-[.16em] text-black transition hover:bg-neutral-200">{active.buttonLabel}<ArrowRight className="h-4 w-4" /></Link>
            {mode === "slider" && visibleSlides.length > 1 && <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/65">{String(activeIndex + 1).padStart(2, "0")} / {String(visibleSlides.length).padStart(2, "0")} · LAYXES campaigns</span>}
          </div>
        </div>
        <div className="absolute bottom-7 right-8 hidden items-center gap-3 text-[9px] font-semibold uppercase tracking-[.2em] text-white/65 md:flex"><span className="grid h-9 w-9 place-items-center rounded-full border border-white/30"><ArrowDown className="h-3 w-3" /></span> Scroll to explore</div>
        {mode === "slider" && visibleSlides.length > 1 && <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2.5" role="group" aria-label="Homepage slides">
          {visibleSlides.map((slide, index) => <button key={slide.id} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show slide ${index + 1}`} aria-current={index === activeIndex} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-7 bg-white" : "w-1.5 bg-white/55 hover:bg-white"}`} />)}
        </div>}
      </div>
    </section>
  );
}
