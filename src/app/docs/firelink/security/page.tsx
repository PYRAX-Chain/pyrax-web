"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, AlertTriangle, CheckCircle, Lock, Eye, Key, Smartphone, Globe } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-pyrax-orange">Documentation</Link>
          <span>/</span>
          <Link href="/docs/firelink" className="hover:text-pyrax-orange">Firelink</Link>
          <span>/</span>
          <span className="text-white">Security Best Practices</span>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-4">Security Best Practices</h1>
        <p className="text-xl text-gray-400 mb-8">
          Follow these security guidelines to keep your PYRAX wallet and funds safe.
        </p>

        {/* Critical Security */}
        <section className="mb-12">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-red-400 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Critical Security Rules</h2>
                <ul className="space-y-3">
                  {[
                    "NEVER share your recovery phrase with anyone",
                    "NEVER enter your recovery phrase on a website",
                    "NEVER store your recovery phrase digitally (screenshots, cloud, email)",
                    "NEVER give remote access to someone claiming to be support",
                    "PYRAX team will NEVER ask for your private key or recovery phrase",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Phrase Security */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-6 h-6 text-pyrax-orange" />
            <h2 className="text-2xl font-bold text-white">Protecting Your Recovery Phrase</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Do: Write It Down on Paper
              </h4>
              <p className="text-gray-400 text-sm">
                Use pen and paper. Store in a secure location like a safe or safety deposit box.
                Consider making multiple copies stored in different secure locations.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Do: Consider Metal Backup
              </h4>
              <p className="text-gray-400 text-sm">
                Steel or titanium seed phrase backup plates protect against fire, water, and physical damage.
                Worth the investment for significant holdings.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Don&apos;t: Take Screenshots
              </h4>
              <p className="text-gray-400 text-sm">
                Screenshots sync to cloud services, can be accessed by malware, and may appear in photo libraries.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Don&apos;t: Store in Password Managers
              </h4>
              <p className="text-gray-400 text-sm">
                While password managers are great for passwords, your recovery phrase should remain offline 
                to protect against data breaches.
              </p>
            </div>
          </div>
        </section>

        {/* Password Security */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-pyrax-orange" />
            <h2 className="text-2xl font-bold text-white">Password Security</h2>
          </div>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              Use a unique password not used anywhere else
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              At least 12 characters with letters, numbers, and symbols
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              Consider using a passphrase (multiple random words)
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              Store your password in a password manager
            </li>
          </ul>
          <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-blue-200 text-sm">
              <strong>Note:</strong> Your password encrypts your wallet on your device. If you forget it, 
              you can always restore using your recovery phrase.
            </p>
          </div>
        </section>

        {/* Avoiding Scams */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-pyrax-orange" />
            <h2 className="text-2xl font-bold text-white">Avoiding Scams</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2">Phishing Sites</h4>
              <p className="text-gray-400 text-sm mb-2">
                Scammers create fake websites that look like real dApps. Always:
              </p>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>• Verify the URL carefully (e.g., pyrax.org not pyraax.org)</li>
                <li>• Bookmark legitimate sites and use bookmarks</li>
                <li>• Be suspicious of links in DMs or emails</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2">Fake Support</h4>
              <p className="text-gray-400 text-sm">
                PYRAX team will NEVER DM you first or ask for your recovery phrase. 
                All official support is through public channels.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2">Malicious Transactions</h4>
              <p className="text-gray-400 text-sm">
                Always review transaction details before approving. Be especially careful of:
              </p>
              <ul className="space-y-1 text-gray-400 text-sm mt-2">
                <li>• Token approvals for unlimited amounts</li>
                <li>• Transactions to unknown contracts</li>
                <li>• Unexpected transaction requests</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2">&quot;Free&quot; Token Airdrops</h4>
              <p className="text-gray-400 text-sm">
                Be cautious of unsolicited tokens appearing in your wallet. Interacting with 
                them may trigger malicious contract calls.
              </p>
            </div>
          </div>
        </section>

        {/* Device Security */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6 text-pyrax-orange" />
            <h2 className="text-2xl font-bold text-white">Device Security</h2>
          </div>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              Keep your browser and operating system updated
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              Use antivirus software and run regular scans
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              Don&apos;t install browser extensions from unknown sources
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              Avoid using public WiFi for wallet transactions
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              Lock your computer when away from it
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              Consider a dedicated browser profile for crypto
            </li>
          </ul>
        </section>

        {/* Firelink Security Features */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-pyrax-orange" />
            <h2 className="text-2xl font-bold text-white">Firelink Security Features</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2">Auto-Lock</h4>
              <p className="text-gray-400 text-sm">
                Firelink automatically locks after 15 minutes of inactivity, requiring your password to unlock.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2">AES-256 Encryption</h4>
              <p className="text-gray-400 text-sm">
                Your private key is encrypted using industry-standard AES-256-GCM encryption.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2">Transaction Confirmations</h4>
              <p className="text-gray-400 text-sm">
                Every transaction requires explicit approval through a popup confirmation.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2">Site Permissions</h4>
              <p className="text-gray-400 text-sm">
                You control which sites can connect to your wallet and can revoke access anytime.
              </p>
            </div>
          </div>
        </section>

        {/* If Compromised */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">If You Think You&apos;re Compromised</h2>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <ol className="list-decimal list-inside space-y-3 text-gray-400">
              <li><strong className="text-white">Don&apos;t panic</strong> - Act quickly but carefully</li>
              <li><strong className="text-white">Create a new wallet</strong> on a secure device with a new recovery phrase</li>
              <li><strong className="text-white">Transfer remaining funds</strong> to your new wallet immediately</li>
              <li><strong className="text-white">Revoke all token approvals</strong> on the compromised wallet</li>
              <li><strong className="text-white">Scan your device</strong> for malware and change all related passwords</li>
              <li><strong className="text-white">Report the incident</strong> to help warn others</li>
            </ol>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Link href="/docs/firelink/networks" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Network Switching
          </Link>
          <Link href="/docs/firelink/troubleshooting" className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors">
            Troubleshooting
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
