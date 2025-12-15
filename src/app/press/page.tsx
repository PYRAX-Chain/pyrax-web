import Image from "next/image";
import Link from "next/link";
import { Download, FileText, Palette, Image as ImageIcon, Type, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Press Kit - PYRAX",
  description: "Official PYRAX brand assets, logos, and media resources for press and partners.",
};

const brandColors = [
  { name: "PYRAX Orange", hex: "#F68724", rgb: "246, 135, 36" },
  { name: "PYRAX Amber", hex: "#EC7B23", rgb: "236, 123, 35" },
  { name: "PYRAX Red", hex: "#A01D20", rgb: "160, 29, 32" },
  { name: "PYRAX Dark Red", hex: "#A61E22", rgb: "166, 30, 34" },
  { name: "PYRAX Dark", hex: "#0A0A0B", rgb: "10, 10, 11" },
  { name: "PYRAX Darker", hex: "#050506", rgb: "5, 5, 6" },
];

const logoAssets = [
  {
    name: "PYRAX Logo",
    description: "Primary horizontal logo with text. Use for website headers, documents, and general branding.",
    files: [
      { format: "SVG", path: "/brand/pyrax-logo.svg", size: "13 KB" },
      { format: "PNG", path: "/brand/pyrax-logo.png", size: "356 KB" },
    ],
  },
  {
    name: "PYRAX Coin",
    description: "Coin/token icon for representing the PYRX token in applications, exchanges, and wallets.",
    files: [
      { format: "SVG", path: "/brand/pyrax-coin.svg", size: "13 KB" },
      { format: "PNG", path: "/brand/pyrax-coin.png", size: "203 KB" },
    ],
  },
];

const guidelines = [
  "Always maintain clear space around the logo equal to the height of the 'P' in PYRAX.",
  "Do not stretch, distort, or rotate the logo.",
  "Do not change the logo colors outside of approved variations.",
  "Use the SVG version whenever possible for best quality.",
  "On dark backgrounds, use the standard full-color logo.",
  "Minimum size: 100px width for digital, 25mm for print.",
];

export default function PressPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Press Kit
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Official PYRAX brand assets for press, partners, and community. 
            Download logos, access brand guidelines, and find everything you need to represent PYRAX.
          </p>
        </div>

        {/* Logo Preview */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-pyrax-dark to-pyrax-darker rounded-2xl p-12 border border-white/10 text-center">
            <Image
              src="/brand/pyrax-logo.svg"
              alt="PYRAX Logo"
              width={400}
              height={140}
              className="mx-auto mb-8"
            />
            <div className="flex items-center justify-center gap-8">
              <Image
                src="/brand/pyrax-coin.svg"
                alt="PYRAX Coin"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="text-left">
                <p className="text-white font-semibold text-lg">PYRX Token</p>
                <p className="text-gray-400">The native token of PYRAX Chain</p>
              </div>
            </div>
          </div>
        </section>

        {/* Download Assets */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Download className="h-6 w-6 text-pyrax-orange" />
            <h2 className="text-2xl font-bold text-white">Download Assets</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {logoAssets.map((asset) => (
              <div
                key={asset.name}
                className="bg-pyrax-dark/50 rounded-xl p-6 border border-white/5"
              >
                <div className="flex items-start gap-4 mb-4">
                  <ImageIcon className="h-6 w-6 text-pyrax-orange mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{asset.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{asset.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {asset.files.map((file) => (
                    <a
                      key={file.format}
                      href={file.path}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      {file.format}
                      <span className="text-gray-500">({file.size})</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Download All Button */}
          <div className="mt-8 text-center">
            <a
              href="https://github.com/PYRAX-Chain/pyrax-brand"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pyrax-orange hover:bg-pyrax-amber text-white font-semibold rounded-lg transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              View All Assets on GitHub
            </a>
          </div>
        </section>

        {/* Brand Colors */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Palette className="h-6 w-6 text-pyrax-orange" />
            <h2 className="text-2xl font-bold text-white">Brand Colors</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandColors.map((color) => (
              <div key={color.hex} className="group">
                <div
                  className="aspect-square rounded-xl mb-3 border border-white/10 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="font-medium text-white text-sm">{color.name}</p>
                <p className="text-xs text-gray-400 font-mono">{color.hex}</p>
                <p className="text-xs text-gray-500 font-mono">RGB: {color.rgb}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Type className="h-6 w-6 text-pyrax-orange" />
            <h2 className="text-2xl font-bold text-white">Typography</h2>
          </div>

          <div className="bg-pyrax-dark/50 rounded-xl p-8 border border-white/5">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-pyrax-orange mb-2">Primary Font</p>
                <p className="text-4xl font-bold text-white mb-2">Inter</p>
                <p className="text-gray-400">
                  Used for headings, body text, and UI elements. Available on Google Fonts.
                </p>
              </div>
              <div>
                <p className="text-sm text-pyrax-orange mb-2">Monospace Font</p>
                <p className="text-4xl font-mono text-white mb-2">JetBrains Mono</p>
                <p className="text-gray-400">
                  Used for code snippets, addresses, and technical content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-6 w-6 text-pyrax-orange" />
            <h2 className="text-2xl font-bold text-white">Usage Guidelines</h2>
          </div>

          <div className="bg-pyrax-dark/50 rounded-xl p-8 border border-white/5">
            <ul className="space-y-4">
              {guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pyrax-orange/20 text-pyrax-orange text-sm flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-gray-300">{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-pyrax-orange/10 to-pyrax-red/10 rounded-2xl p-12 border border-pyrax-orange/20">
            <h2 className="text-2xl font-bold text-white mb-4">Need Something Else?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              For press inquiries, partnership requests, or custom brand assets, 
              please contact our team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:press@pyrax.org"
                className="px-6 py-3 bg-pyrax-orange hover:bg-pyrax-amber text-white font-semibold rounded-lg transition-colors"
              >
                press@pyrax.org
              </a>
              <Link
                href="/docs"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
