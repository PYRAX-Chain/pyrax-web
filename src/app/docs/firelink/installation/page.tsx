"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Copy, Check, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { useState } from "react";

export default function FirelinkInstallationPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-pyrax-orange">Documentation</Link>
          <span>/</span>
          <Link href="/docs/firelink" className="hover:text-pyrax-orange">Firelink</Link>
          <span>/</span>
          <span className="text-white">Installation</span>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-4">Installation Guide</h1>
        <p className="text-xl text-gray-400 mb-8">
          Learn how to install the Firelink browser extension on Chrome and other Chromium-based browsers.
        </p>

        {/* Download Button */}
        <div className="bg-pyrax-orange/10 border border-pyrax-orange/30 rounded-xl p-6 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Download Firelink v1.0.0</h3>
              <p className="text-gray-400 text-sm">ZIP file, ~1.2 MB</p>
            </div>
            <a
              href="/downloads/pyrax-firelink-v1.0.0.zip"
              className="flex items-center gap-2 px-6 py-3 bg-pyrax-orange text-black font-bold rounded-lg hover:bg-pyrax-amber transition-colors"
            >
              <Download className="w-5 h-5" />
              Download
            </a>
          </div>
        </div>

        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Prerequisites</h2>
          <ul className="space-y-3">
            {[
              "A Chromium-based browser (Chrome, Brave, Edge, Opera)",
              "Chrome version 88 or later (for Manifest V3 support)",
              "Administrator access to install extensions",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-400">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Installation Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Installation Steps</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Download the Extension</h3>
                <p className="text-gray-400 mb-4">
                  Click the download button above to get the <code className="text-pyrax-orange">pyrax-firelink-v1.0.0.zip</code> file.
                  Save it to a location you can easily access (like your Desktop or Downloads folder).
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Extract the ZIP File</h3>
                <p className="text-gray-400 mb-4">
                  Right-click the downloaded ZIP file and select &quot;Extract All&quot; (Windows) or double-click to extract (macOS).
                  This will create a folder named <code className="text-pyrax-orange">pyrax-firelink-v1.0.0</code> containing all extension files.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-yellow-200 text-sm">
                      <strong>Important:</strong> Keep this folder in a permanent location. If you delete or move it, 
                      the extension will stop working.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Open Chrome Extensions Page</h3>
                <p className="text-gray-400 mb-4">
                  Open your browser and navigate to the extensions page:
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <code className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-pyrax-orange font-mono">
                    chrome://extensions
                  </code>
                  <button
                    onClick={() => handleCopy("chrome://extensions")}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-sm">
                  Or click Menu (⋮) → More Tools → Extensions
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Enable Developer Mode</h3>
                <p className="text-gray-400 mb-4">
                  In the top-right corner of the extensions page, find the &quot;Developer mode&quot; toggle and turn it ON.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">
                    Developer mode allows you to load extensions from local files instead of the Chrome Web Store.
                    This is required for self-hosted extensions like Firelink.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Load the Extension</h3>
                <p className="text-gray-400 mb-4">
                  Click the &quot;Load unpacked&quot; button that appears after enabling Developer mode. In the file 
                  browser that opens, navigate to and select the extracted <code className="text-pyrax-orange">pyrax-firelink-v1.0.0</code> folder.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                ✓
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Done!</h3>
                <p className="text-gray-400 mb-4">
                  The Firelink icon should now appear in your browser toolbar. Click it to open the wallet and 
                  create or import your first wallet!
                </p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-blue-200 text-sm">
                      <strong>Tip:</strong> Pin Firelink to your toolbar for quick access. Click the puzzle piece 
                      icon (Extensions) and click the pin icon next to PYRAX Firelink.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Updating the Extension */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Updating Firelink</h2>
          <p className="text-gray-400 mb-4">
            To update Firelink to a new version:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-400">
            <li>Download the new version from <Link href="/firelink" className="text-pyrax-orange hover:underline">pyrax.org/firelink</Link></li>
            <li>Extract the new ZIP file to the same location (replace old files)</li>
            <li>Go to <code className="text-pyrax-orange">chrome://extensions</code></li>
            <li>Click the refresh icon on the Firelink extension card</li>
          </ol>
          <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-200 text-sm">
              <strong>Your wallet data is preserved</strong> during updates. Your wallets, settings, and 
              transaction history are stored separately from the extension files.
            </p>
          </div>
        </section>

        {/* Uninstalling */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Uninstalling Firelink</h2>
          <p className="text-gray-400 mb-4">
            To uninstall Firelink:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-400">
            <li>Go to <code className="text-pyrax-orange">chrome://extensions</code></li>
            <li>Find PYRAX Firelink in the list</li>
            <li>Click &quot;Remove&quot; and confirm</li>
          </ol>
          <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">
                <strong>Warning:</strong> Uninstalling will delete all wallet data. Make sure you have 
                backed up your recovery phrase before uninstalling!
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Common Issues</h2>
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">&quot;Load unpacked&quot; button not visible</h4>
              <p className="text-gray-400 text-sm">Make sure Developer mode is enabled (toggle in top-right corner).</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">&quot;Manifest file is missing or unreadable&quot;</h4>
              <p className="text-gray-400 text-sm">Make sure you&apos;re selecting the extracted folder, not the ZIP file.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Extension icon not appearing in toolbar</h4>
              <p className="text-gray-400 text-sm">Click the puzzle piece icon (Extensions) and pin Firelink to your toolbar.</p>
            </div>
          </div>
          <p className="mt-4 text-gray-400">
            For more help, see the <Link href="/docs/firelink/troubleshooting" className="text-pyrax-orange hover:underline">Troubleshooting Guide</Link>.
          </p>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Link
            href="/docs/firelink"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Firelink
          </Link>
          <Link
            href="/docs/firelink/create-wallet"
            className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors"
          >
            Creating a Wallet
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
