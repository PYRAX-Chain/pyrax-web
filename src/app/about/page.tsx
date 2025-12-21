"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheckIcon, 
  EyeIcon, 
  ScaleIcon,
  DocumentCheckIcon 
} from "@heroicons/react/24/outline";

const teamMembers = [
  {
    name: "Shawn Wilson",
    role: "President/CTO & Lead Developer",
    location: "Location Coming Soon",
    bio: "Bio coming soon.",
    image: null, // Placeholder
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      facebook: "#",
    },
  },
  {
    name: "Gabriel Mascioli",
    role: "Senior Vice President",
    location: "Location Coming Soon",
    bio: "Bio coming soon.",
    image: null, // Placeholder
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      facebook: "#",
    },
  },
  {
    name: "Tekky Natale",
    role: "Chief Financial Officer",
    location: "Location Coming Soon",
    bio: "Bio coming soon.",
    image: null, // Placeholder
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      facebook: "#",
    },
  },
];

const transparencyValues = [
  {
    icon: ShieldCheckIcon,
    title: "Financial Integrity",
    description: "Every transaction, every allocation, every financial decision is documented and available for community review. We maintain the highest standards of fiscal responsibility.",
  },
  {
    icon: EyeIcon,
    title: "Open Operations",
    description: "Our corporate operations are conducted with full visibility. From development updates to strategic decisions, our community is kept informed every step of the way.",
  },
  {
    icon: ScaleIcon,
    title: "Regulatory Compliance",
    description: "PYRAX LLC operates in full compliance with applicable regulations. We work proactively with legal counsel to ensure our operations meet the highest standards.",
  },
  {
    icon: DocumentCheckIcon,
    title: "Audited & Verified",
    description: "Our smart contracts are audited, our financials are reviewed, and our processes are documented. Trust is earned through verification, not promises.",
  },
];

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "twitter":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "github":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      );
    case "facebook":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-pyrax-darker">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pyrax-orange/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pyrax-orange/10 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Meet the <span className="text-pyrax-orange">PYRAX</span> Team
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The founders and core team behind PYRAX are committed to building the future of 
            decentralized AI compute with unwavering integrity and transparency.
          </p>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Transparency is Our Foundation
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              At PYRAX LLC, corporate and financial transparency aren&apos;t just buzzwords—they&apos;re 
              the bedrock of everything we do. We believe that trust in the cryptocurrency space 
              must be earned through complete openness and accountability. Our commitment to 
              transparency is second to none, ensuring that every stakeholder has clear visibility 
              into our operations, finances, and decision-making processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transparencyValues.map((value) => (
              <div
                key={value.title}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-pyrax-orange/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-pyrax-orange/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-pyrax-orange" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Founders & Core Team
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Led by experienced professionals with a shared vision for decentralized innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-gradient-to-b from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10 hover:border-pyrax-orange/30 transition-all duration-300 group"
              >
                {/* Profile Image Placeholder */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-pyrax-orange/20 to-pyrax-red/20 flex items-center justify-center border-2 border-pyrax-orange/30 group-hover:border-pyrax-orange/50 transition-colors">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-pyrax-orange/60">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  )}
                </div>

                {/* Name & Role */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-pyrax-orange font-medium text-sm">{member.role}</p>
                  <p className="text-gray-500 text-sm mt-1">{member.location}</p>
                </div>

                {/* Bio */}
                <p className="text-gray-400 text-center text-sm mb-6 min-h-[3rem]">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <Link
                    href={member.social.twitter}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Twitter / X"
                  >
                    <SocialIcon platform="twitter" />
                  </Link>
                  <Link
                    href={member.social.linkedin}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="LinkedIn"
                  >
                    <SocialIcon platform="linkedin" />
                  </Link>
                  <Link
                    href={member.social.github}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="GitHub"
                  >
                    <SocialIcon platform="github" />
                  </Link>
                  <Link
                    href={member.social.facebook}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Facebook"
                  >
                    <SocialIcon platform="facebook" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-b from-pyrax-orange/10 to-transparent rounded-3xl p-12 border border-pyrax-orange/20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              PYRAX LLC
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              PYRAX LLC is a registered company committed to advancing decentralized AI compute 
              infrastructure. We operate with full regulatory compliance and maintain the highest 
              standards of corporate governance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/whitepaper"
                className="px-6 py-3 bg-pyrax-orange hover:bg-pyrax-orange/90 text-white font-semibold rounded-lg transition-colors"
              >
                Read Whitepaper
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
