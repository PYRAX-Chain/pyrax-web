import Link from "next/link";
import { ChevronRight, Sparkles, Code, Bot, ArrowRight, ArrowLeft } from "lucide-react";

export default function CrucibleSmartContractsPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/docs/crucible" className="hover:text-white">Crucible</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Smart Contracts</span>
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-4">
            <Code className="w-4 h-4" /> 12 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Smart Contract Integration</h1>
          <p className="text-xl text-gray-400">Call AI directly from your Solidity smart contracts using Crucible precompiles.</p>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed">
            Crucible exposes AI capabilities through native EVM precompiles. This means you can call AI inference directly from Solidity—no oracles, no bridges, no external dependencies.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">ICrucible Interface</h2>
          <div className="bg-pyrax-dark border border-white/10 rounded-xl p-6 my-6 not-prose">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-gray-500">ICrucible.sol</span>
            </div>
            <pre className="text-sm font-mono overflow-x-auto">
              <code className="text-gray-300">{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ICrucible {
    /// @notice Request text generation from an LLM
    /// @param model The model identifier (e.g., "llama-3-8b")
    /// @param prompt The input prompt
    /// @param maxTokens Maximum tokens to generate
    /// @return jobId Unique identifier for the job
    function generateText(
        string calldata model,
        string calldata prompt,
        uint256 maxTokens
    ) external payable returns (bytes32 jobId);
    
    /// @notice Request image generation
    /// @param model The model identifier (e.g., "sdxl")
    /// @param prompt The image description
    /// @param width Image width in pixels
    /// @param height Image height in pixels
    /// @return jobId Unique identifier for the job
    function generateImage(
        string calldata model,
        string calldata prompt,
        uint256 width,
        uint256 height
    ) external payable returns (bytes32 jobId);
    
    /// @notice Generate text embeddings
    /// @param model The embedding model (e.g., "bge-large")
    /// @param text The text to embed
    /// @return jobId Unique identifier for the job
    function generateEmbedding(
        string calldata model,
        string calldata text
    ) external payable returns (bytes32 jobId);
    
    /// @notice Get the result of a completed job
    /// @param jobId The job identifier
    /// @return result The job result (bytes encoded)
    /// @return completed Whether the job is complete
    function getResult(bytes32 jobId) 
        external view returns (bytes memory result, bool completed);
    
    /// @notice Estimate the cost of a job
    /// @param model The model identifier
    /// @param estimatedTokens Estimated compute units
    /// @return cost Cost in wei
    function estimateCost(
        string calldata model,
        uint256 estimatedTokens
    ) external view returns (uint256 cost);
    
    /// @notice Callback interface for async results
    /// @param jobId The completed job ID
    /// @param result The job result
    function onCrucibleResult(bytes32 jobId, bytes calldata result) external;
}`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Example: AI Oracle</h2>
          <p className="text-gray-300 leading-relaxed">Build an on-chain AI oracle that answers questions:</p>
          <div className="bg-pyrax-dark border border-white/10 rounded-xl p-6 my-6 not-prose">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-gray-500">AIOracle.sol</span>
            </div>
            <pre className="text-sm font-mono overflow-x-auto">
              <code className="text-gray-300">{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ICrucible} from "@pyrax/crucible/ICrucible.sol";

contract AIOracle {
    ICrucible public constant CRUCIBLE = ICrucible(0x0000000000000000000000000000000000000A01);
    
    mapping(bytes32 => address) public jobRequester;
    mapping(bytes32 => string) public jobResults;
    
    event QuestionAsked(bytes32 indexed jobId, address indexed asker, string question);
    event AnswerReceived(bytes32 indexed jobId, string answer);
    
    /// @notice Ask a question to the AI
    function askQuestion(string calldata question) external payable returns (bytes32) {
        // Estimate cost and validate payment
        uint256 cost = CRUCIBLE.estimateCost("llama-3-8b", 256);
        require(msg.value >= cost, "Insufficient payment");
        
        // Submit the job
        bytes32 jobId = CRUCIBLE.generateText{value: cost}(
            "llama-3-8b",
            question,
            256
        );
        
        jobRequester[jobId] = msg.sender;
        emit QuestionAsked(jobId, msg.sender, question);
        
        // Refund excess
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
        
        return jobId;
    }
    
    /// @notice Called by Crucible when the result is ready
    function onCrucibleResult(bytes32 jobId, bytes calldata result) external {
        require(msg.sender == address(CRUCIBLE), "Only Crucible");
        
        string memory answer = string(result);
        jobResults[jobId] = answer;
        
        emit AnswerReceived(jobId, answer);
    }
    
    /// @notice Check if an answer is ready
    function getAnswer(bytes32 jobId) external view returns (string memory, bool) {
        bytes memory stored = bytes(jobResults[jobId]);
        return (jobResults[jobId], stored.length > 0);
    }
}`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Example: AI NFT Generator</h2>
          <p className="text-gray-300 leading-relaxed">Generate unique NFT artwork using Crucible:</p>
          <div className="bg-pyrax-dark border border-white/10 rounded-xl p-6 my-6 not-prose">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-gray-500">AINFT.sol</span>
            </div>
            <pre className="text-sm font-mono overflow-x-auto">
              <code className="text-gray-300">{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ICrucible} from "@pyrax/crucible/ICrucible.sol";

contract AINFT is ERC721 {
    ICrucible public constant CRUCIBLE = ICrucible(0x0...0A01);
    
    uint256 public nextTokenId;
    mapping(bytes32 => uint256) public jobToToken;
    mapping(uint256 => string) public tokenImages;
    
    constructor() ERC721("AI Generated Art", "AIART") {}
    
    function mint(string calldata prompt) external payable returns (bytes32) {
        uint256 tokenId = nextTokenId++;
        
        bytes32 jobId = CRUCIBLE.generateImage{value: msg.value}(
            "sdxl",
            prompt,
            1024,
            1024
        );
        
        jobToToken[jobId] = tokenId;
        _mint(msg.sender, tokenId);
        
        return jobId;
    }
    
    function onCrucibleResult(bytes32 jobId, bytes calldata result) external {
        require(msg.sender == address(CRUCIBLE));
        uint256 tokenId = jobToToken[jobId];
        tokenImages[tokenId] = string(result); // IPFS hash
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string.concat("ipfs://", tokenImages[tokenId]);
    }
}`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Precompile Address</h2>
          <p className="text-gray-300 leading-relaxed">The Crucible precompile is deployed at:</p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 my-6 font-mono text-center not-prose">
            <span className="text-pyrax-orange text-lg">0x0000000000000000000000000000000000000A01</span>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Supported Models</h2>
          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Model ID</th><th className="py-3 px-4 text-gray-400">Type</th><th className="py-3 px-4 text-gray-400">Cost (est.)</th></tr></thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="py-3 px-4 text-white font-mono">llama-3-8b</td><td className="py-3 px-4 text-gray-400">Text Generation</td><td className="py-3 px-4 text-gray-400">~0.001 PYRX/token</td></tr>
                <tr><td className="py-3 px-4 text-white font-mono">mistral-7b</td><td className="py-3 px-4 text-gray-400">Text Generation</td><td className="py-3 px-4 text-gray-400">~0.0008 PYRX/token</td></tr>
                <tr><td className="py-3 px-4 text-white font-mono">sdxl</td><td className="py-3 px-4 text-gray-400">Image Generation</td><td className="py-3 px-4 text-gray-400">~0.5 PYRX/image</td></tr>
                <tr><td className="py-3 px-4 text-white font-mono">bge-large</td><td className="py-3 px-4 text-gray-400">Embeddings</td><td className="py-3 px-4 text-gray-400">~0.0001 PYRX/embed</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex justify-between">
            <Link href="/docs/crucible/models" className="flex items-center gap-2 text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" /> Supported Models
            </Link>
            <Link href="/docs/crucible/economics" className="flex items-center gap-2 text-pyrax-orange hover:underline">
              Economics & Staking <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
