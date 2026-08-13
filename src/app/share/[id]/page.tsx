import React from 'react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Download, Plus } from 'lucide-react';
import type { Metadata } from 'next';
import { list } from '@vercel/blob';

interface SharePageProps {
  params: Promise<{ id: string }>;
}

async function getCardUrl(id: string) {
  try {
    const { blobs } = await list({ prefix: `hh-cards/${id}.jpg` });
    return blobs.length > 0 ? blobs[0].url : null;
  } catch (error) {
    console.error('Failed to fetch blob:', error);
    return null;
  }
}

// Generate dynamic metadata for web crawlers/scrapers to support rich cards
export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { id } = await params;
  
  const ogImageUrl = await getCardUrl(id);

  if (!ogImageUrl) {
    return {
      title: "Hacker House Goa 2026 — Builder Card",
      description: "Card not found.",
    };
  }

  return {
    title: "Hacker House Goa 2026 — Builder Card",
    description: "Built in Goa. Shipped for the world.",
    openGraph: {
      title: "Hacker House Goa 2026 — Builder Card",
      description: "Built in Goa. Shipped for the world.",
      images: [
        {
          url: ogImageUrl,
          width: 1080,
          height: 1620,
          alt: "Hacker House Goa 2026 Builder Card",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Hacker House Goa 2026 — Builder Card",
      description: "Built in Goa. Shipped for the world.",
      images: [ogImageUrl],
    },
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params;
  
  const cardImageUrl = await getCardUrl(id);

  if (!cardImageUrl) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-[#094222] text-white">
        <span className="text-4xl mb-4">⚠️</span>
        <h1 className="text-xl font-mono font-bold uppercase mb-2 tracking-wider">
          Card Not Found
        </h1>
        <p className="text-neutral-300 font-mono text-[10px] uppercase tracking-widest mb-6">
          The requested share ID does not exist or has expired.
        </p>
        <Link
          href="/"
          className="px-6 py-3.5 bg-[#F4D03F] text-[#094222] font-mono text-xs font-bold uppercase tracking-widest rounded border border-[#094222] shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] hover:shadow-[2px_2px_0px_0px_rgba(20,20,20,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer"
        >
          Create My Frame
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#094222] w-full flex flex-col items-center justify-center py-12 px-6 lg:px-16 overflow-hidden relative">
      {/* Decorative background subtle noise/texture could go here */}

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Copy & Call to Action */}
        <div className="flex flex-col items-start gap-6 w-full max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F1E8D9] text-[#A6533A] rounded shadow-sm">
            <span>🌴</span>
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase mt-0.5">Builder Card Verified</span>
          </div>

          {/* Massive Typography Title */}
          <div className="relative w-full">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif text-[#F4D03F] tracking-tighter leading-none" style={{ fontFamily: 'Times New Roman, serif' }}>
              HACKER<br />HOUSE
            </h1>
            {/* The overlapping Hindi text "गोवा" */}
            <div className="absolute top-[45%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 rotate-[-5deg]">
              <span className="text-5xl sm:text-6xl font-black text-[#FF1493] tracking-wider" style={{ WebkitTextStroke: '2px #F4D03F' }}>
                गोवा
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="font-mono text-[#F4D03F] text-lg sm:text-xl tracking-widest uppercase mt-2">
            GOA 2026 • 28 - 31 OCTOBER
          </p>
          
          {/* Wavy line separator */}
          <div className="w-16 h-1 border-b-[3px] border-dotted border-[#F4D03F] opacity-50 my-2"></div>

          {/* Description */}
          <div className="flex flex-col gap-4 text-[#C1D7C6]">
            <h2 className="text-xl sm:text-2xl font-mono font-bold uppercase text-[#F4D03F] tracking-wider">
              Built in Goa. Shipped for the world.
            </h2>
            <p className="font-mono text-sm leading-relaxed max-w-md">
              Join the brightest builders, ship your ideas, and vibe with the best community in the world.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 my-6 border-l-2 border-[#F4D03F] pl-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[#F4D03F]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" />
                  <path d="M18.1565 13.0601C20.4079 14.2259 22 16.4842 22 19.5V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V19.5C2 16.4842 3.59211 14.2259 5.84351 13.0601C7.74797 12.0739 9.87327 11.5 12 11.5C14.1267 11.5 16.252 12.0739 18.1565 13.0601Z" />
                </svg>
                <span className="font-bold text-lg">500+</span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C1D7C6]">Builders</span>
            </div>
            
            <div className="flex flex-col gap-1 border-l border-[#145C33] pl-4">
              <div className="flex items-center gap-1.5 text-[#F4D03F]">
                <span className="font-mono text-xl font-bold">&lt;/&gt;</span>
                <span className="font-bold text-lg">4</span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C1D7C6]">Days</span>
            </div>
            
            <div className="flex flex-col gap-1 border-l border-[#145C33] pl-4">
              <div className="flex items-center gap-1.5 text-[#F4D03F]">
                <span className="text-lg">🌴</span>
                <span className="font-bold text-lg">1</span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C1D7C6]">Epic Location</span>
            </div>
            
            <div className="flex flex-col gap-1 border-l border-[#145C33] pl-4">
              <div className="flex items-center gap-1.5 text-[#F4D03F]">
                <span className="font-bold text-xl">∞</span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C1D7C6]">Possibilities</span>
            </div>
          </div>

          {/* Primary CTA */}
          <Link
            href="/"
            className="w-full sm:w-auto px-12 py-5 bg-[#F4D03F] text-[#094222] font-serif text-xl font-bold uppercase tracking-widest border-2 border-[#8A7622] shadow-[6px_6px_0px_0px_#8A7622] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#8A7622] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all text-center"
          >
            Create Yours
          </Link>
        </div>

        {/* Right Column: Card Presentation */}
        <div className="flex flex-row items-center justify-end gap-6 relative">
          
          {/* Card Frame wrapper */}
          <div className="relative w-full max-w-[420px] aspect-[2/3] transform rotate-3 transition-transform hover:rotate-1 duration-500 z-10 border-[6px] border-[#1C1C1C] rounded-[16px] shadow-[16px_24px_40px_rgba(0,0,0,0.5)] overflow-hidden bg-neutral-900">
            <img
              src={cardImageUrl}
              alt="Hacker House Goa 2026 Builder Card"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right sidebar icons */}
          <div className="hidden sm:flex flex-col items-center justify-center gap-16 text-[#F4D03F] font-mono border-l-2 border-[#145C33] pl-6 h-[80%]">
            <div className="flex flex-col items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <div className="text-[10px] text-center tracking-widest uppercase">28 - 31 Oct<br/>2026</div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <div className="text-[10px] text-center tracking-widest uppercase">Goa, India</div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l2-2 4 4 4-4 4 4 2-2"></path></svg>
              <div className="text-[10px] text-center tracking-widest uppercase">Beach, Code<br/>& Community</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
