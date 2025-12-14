import { Shield, Bug, AlertTriangle, Lock, Mail, ExternalLink } from "lucide-react";

const bountyRewards = [
  { severity: "Critical", range: "$10,000 - $50,000", color: "bg-red-500" },
  { severity: "High", range: "$5,000 - $10,000", color: "bg-orange-500" },
  { severity: "Medium", range: "$1,000 - $5,000", color: "bg-yellow-500" },
  { severity: "Low", range: "$100 - $1,000", color: "bg-blue-500" },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Security
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Security is foundational to PYRAX. We maintain rigorous security
            practices and encourage responsible disclosure of vulnerabilities.
          </p>
        </div>

        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="p-8 rounded-xl bg-gradient-to-b from-red-500/10 to-transparent border border-red-500/20">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-8 w-8 text-red-400" />
                <h2 className="text-2xl font-bold text-white">
                  Report a Vulnerability
                </h2>
              </div>
              <p className="text-gray-400 mb-6">
                If you discover a security vulnerability, please report it
                responsibly. Do NOT disclose publicly until the issue is
                resolved.
              </p>
              <div className="p-4 rounded-lg bg-white/5 mb-6">
                <div className="flex items-center gap-2 text-white">
                  <Mail className="h-5 w-5 text-pyrax-orange" />
                  <span className="font-mono">security@pyrax.org</span>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-400">
                <p>
                  <strong className="text-white">Include:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Description of the vulnerability</li>
                  <li>Steps to reproduce</li>
                  <li>Potential impact assessment</li>
                  <li>Your contact information (optional)</li>
                </ul>
              </div>
            </div>

            <div className="p-8 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-green-400" />
                <h2 className="text-2xl font-bold text-white">
                  Response Timeline
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  { phase: "Acknowledgment", time: "Within 24 hours" },
                  { phase: "Initial Assessment", time: "Within 72 hours" },
                  { phase: "Status Updates", time: "Weekly until resolved" },
                  { phase: "Fix Development", time: "Varies by severity" },
                  { phase: "Disclosure", time: "After fix deployed" },
                ].map((item) => (
                  <div
                    key={item.phase}
                    className="flex justify-between items-center p-3 rounded-lg bg-white/5"
                  >
                    <span className="text-white">{item.phase}</span>
                    <span className="text-gray-400 text-sm">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Bug Bounty Program
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {bountyRewards.map((reward) => (
                <div
                  key={reward.severity}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 text-center"
                >
                  <div
                    className={`w-4 h-4 rounded-full ${reward.color} mx-auto mb-3`}
                  />
                  <h3 className="font-semibold text-white">{reward.severity}</h3>
                  <p className="text-pyrax-orange mt-2">{reward.range}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Bug className="h-5 w-5 text-green-400" />
                  In Scope
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Smart contracts (presale, future protocol)</li>
                  <li>• Node implementations</li>
                  <li>• ZK proof systems</li>
                  <li>• Web applications (specified endpoints)</li>
                  <li>• Indexer services</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-red-400" />
                  Out of Scope
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Social engineering attacks</li>
                  <li>• Physical security attacks</li>
                  <li>• Third-party services</li>
                  <li>• Already known issues</li>
                  <li>• Issues in dependencies (report upstream)</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <h3 className="font-semibold text-yellow-400 mb-3">
                Bounty Rules
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>1. Do not exploit vulnerabilities beyond proof-of-concept</li>
                <li>2. Do not access or modify other users' data</li>
                <li>3. Do not perform attacks that degrade service</li>
                <li>4. Do not disclose before fix is deployed</li>
                <li>5. First reporter receives the bounty</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Security Practices
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Contract Security",
                items: [
                  "Formal specifications before implementation",
                  "Comprehensive test coverage (>95%)",
                  "Static analysis (Slither, Mythril)",
                  "External audits before deployment",
                ],
              },
              {
                title: "Web Application Security",
                items: [
                  "Content Security Policy (CSP)",
                  "XSS and CSRF protection",
                  "Secure session management",
                  "Rate limiting and input validation",
                ],
              },
              {
                title: "Infrastructure Security",
                items: [
                  "Secrets management (never in code)",
                  "Least privilege access",
                  "Regular access reviews",
                  "Audit logging enabled",
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="p-6 rounded-xl bg-white/5 border border-white/10"
              >
                <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-pyrax-orange mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="p-8 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Audit History</h2>
            <div className="text-center py-8 text-gray-400">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Audits will be published here as they are completed.</p>
              <p className="text-sm mt-2">
                Presale contracts and node implementations will undergo external
                audits before mainnet launch.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
