"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is PYRAX?",
        a: "PYRAX is a Layer 1 blockchain implementing a novel TriStream ZK-DAG architecture. It combines Proof-of-Work BlockDAG consensus with zero-knowledge proof-based finality, dual mining streams for security and decentralization, and full EVM compatibility.",
      },
      {
        q: "What is PYRAX?",
        a: "PYRAX is the native token of the PYRAX blockchain. It is used for transaction fees (gas), mining rewards, and prover incentives. The smallest unit of PYRAX is called a Cinder, where 1 PYRAX = 1,000,000,000 Cinders.",
      },
      {
        q: "What makes PYRAX different from other blockchains?",
        a: "PYRAX's unique TriStream architecture combines three complementary streams: Stream A (ASIC mining) for security, Stream B (CPU/GPU mining) for decentralization, and Stream C (ZK proofs) for deterministic finality. This design achieves high throughput while maintaining strong security guarantees.",
      },
    ],
  },
  {
    category: "Technology",
    questions: [
      {
        q: "What is a BlockDAG?",
        a: "A BlockDAG (Directed Acyclic Graph) is a data structure where blocks can reference multiple parent blocks, unlike traditional linear blockchains. This allows concurrent block production without orphaning, increasing overall throughput.",
      },
      {
        q: "How does GHOSTDAG ordering work?",
        a: "GHOSTDAG determines canonical ordering by classifying blocks as 'blue' (well-connected, honest) or 'red' (potentially adversarial). A selected-parent backbone chain is formed, and transactions are ordered deterministically based on this structure, with hash-based tie-breaking.",
      },
      {
        q: "What is Stream C / ZK finality?",
        a: "Stream C produces zero-knowledge proofs at epoch boundaries that attest to the correctness of state transitions. Once a valid ZK checkpoint is accepted, all blocks in that epoch are considered final and cannot be reverted.",
      },
      {
        q: "Is PYRAX EVM compatible?",
        a: "Yes, PYRAX implements full EVM compatibility. You can deploy existing Solidity smart contracts and use standard Ethereum tooling. The deterministic canonical ordering from GHOSTDAG ensures consistent execution semantics.",
      },
    ],
  },
  {
    category: "Presale",
    questions: [
      {
        q: "How does the presale work?",
        a: "The presale accepts ETH contributions on Ethereum Mainnet. Contributors will receive PYRAX tokens claimable at mainnet launch. The presale contract is verified on Etherscan for transparency.",
      },
      {
        q: "When will I receive my PYRAX tokens?",
        a: "PYRAX tokens will be claimable on the PYRAX mainnet (Furnace) after launch. The claim mechanism will be announced closer to mainnet launch.",
      },
      {
        q: "Is there a minimum contribution?",
        a: "There is no minimum contribution amount. You can contribute any amount of ETH you're comfortable with.",
      },
      {
        q: "What are the risks of participating?",
        a: "Cryptocurrency investments carry significant risks including potential total loss of capital. PYRAX tokens are not securities and provide no ownership, dividend, or governance rights. The PYRAX network is under active development and may not launch as planned. Always do your own research.",
      },
    ],
  },
  {
    category: "Tokenomics",
    questions: [
      {
        q: "What is the total supply of PYRAX?",
        a: "The primary emission is 30 billion PYRAX over approximately 10-12 years. After that, a tail emission of 0.5% annually provides perpetual security budget.",
      },
      {
        q: "How are tokens distributed?",
        a: "25% (7.5B PYRAX) is minted at genesis: 6% presale, 10% ecosystem/community, 3% core contributors (4y vest), 2% security, 3% liquidity, 1% partnerships. The remaining 75% is emitted through mining.",
      },
      {
        q: "How do transaction fees work?",
        a: "PYRAX uses an EIP-1559-style fee mechanism. 50% of the base fee is burned, 40% goes to the block miner, and 10% goes to the Prover Reward Pool for Stream C incentives.",
      },
    ],
  },
  {
    category: "Governance",
    questions: [
      {
        q: "How is PYRAX governed?",
        a: "PYRAX follows Ethereum-style governance with PIPs (PYRAX Improvement Proposals), open discussion, and social consensus. There is NO token voting to change consensus rules.",
      },
      {
        q: "Why no token voting?",
        a: "Token voting creates plutocracy risks, voter apathy, exchange influence, and short-term thinking. Consensus rules are a social contract requiring broad community agreement, not majority token ownership.",
      },
      {
        q: "Are there admin keys?",
        a: "The core PYRAX protocol has no admin keys that can seize user funds, change consensus rules, or censor transactions. This is by design to maintain true decentralization.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenItems(newOpen);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Find answers to common questions about PYRAX.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold text-white mb-6">
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.questions.map((faq, index) => {
                  const id = `${section.category}-${index}`;
                  const isOpen = openItems.has(id);

                  return (
                    <div
                      key={id}
                      className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4"
                      >
                        <span className="font-medium text-white">{faq.q}</span>
                        <ChevronDown
                          className={clsx(
                            "h-5 w-5 text-gray-400 transition-transform flex-shrink-0",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <div
                        className={clsx(
                          "overflow-hidden transition-all",
                          isOpen ? "max-h-96" : "max-h-0"
                        )}
                      >
                        <div className="px-5 pb-5 text-gray-400">{faq.a}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-xl bg-white/5 border border-white/10 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-400">
            Join our community channels or check the documentation for more
            information.
          </p>
        </div>
      </div>
    </div>
  );
}
