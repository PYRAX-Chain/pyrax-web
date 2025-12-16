# PYRAX Development Roadmap & Priority List

**Last Updated:** December 15, 2024  
**Current Phase:** Crownflame Public Testnet  
**Target:** Furnace Mainnet v1.0

---

## Priority Development List

### P0 - Critical (Blocking Mainnet)

| Task | Status | Assignee | Target |
|------|--------|----------|--------|
| Stream C transaction sequencer | In Progress | Core | Q1 2025 |
| ZK-STARK proof generation | In Progress | ZK Team | Q1 2025 |
| Cross-stream state synchronization | Pending | Core | Q1 2025 |
| Security audit (consensus) | Pending | External | Q1 2025 |
| Genesis block finalization | Pending | Core | Q1 2025 |

### P1 - High Priority (Pre-Mainnet)

| Task | Status | Component | Notes |
|------|--------|-----------|-------|
| Production mining pool | Pending | Infrastructure | Stratum v2 support |
| Hardware wallet support | Pending | Desktop | Ledger/Trezor integration |
| Mobile wallet app | Pending | Mobile | iOS/Android native |
| DEX integration | Pending | DeFi | Uniswap-style AMM |
| Bridge contracts | Pending | Interop | ETH <-> PYRAX bridge |

### P2 - Medium Priority (Post-Launch)

| Task | Status | Component | Notes |
|------|--------|-----------|-------|
| NFT marketplace integration | Pending | DeFi | ERC-721/1155 support |
| Governance portal | Pending | Web | On-chain voting |
| Staking dashboard | Pending | Web | Validator management |
| Analytics dashboard | Pending | Web | Network statistics |
| SDK documentation | In Progress | Docs | Developer guides |

### P3 - Low Priority (Future)

| Task | Status | Component | Notes |
|------|--------|-----------|-------|
| Multi-language support | Pending | All Apps | i18n |
| Dark/light theme toggle | Pending | Web/Desktop | User preference |
| Advanced charting | Pending | Explorer | Price/volume charts |
| API rate limit dashboard | Pending | Web | Developer tools |
| Community forum integration | Pending | Web | Discourse/Discord |

---

## Completed Items ✅

### Infrastructure
- [x] Node A (ASIC stream) - Production ready
- [x] Node B (CPU/GPU stream) - Production ready
- [x] RocksDB state persistence
- [x] JSON-RPC API (Ethereum-compatible)
- [x] P2P networking with libp2p
- [x] Chain synchronization protocol
- [x] Prometheus metrics
- [x] Rate limiting

### EVM & Smart Contracts
- [x] EVM execution engine (Node A & B)
- [x] Stack, memory, opcodes implementation
- [x] Precompiled contracts (0x01-0x09)
- [x] Gas metering
- [x] Transaction validation (ECDSA secp256k1)

### Desktop Application
- [x] GPU mining UI with device selection
- [x] CPU mining controls
- [x] Real-time hashrate/temperature monitoring
- [x] Backup import/export with file dialogs
- [x] Native installers (MSI, DEB, DMG)

### Web & Explorer
- [x] Website with video hero background
- [x] MetaMask/WalletConnect integration
- [x] Transaction details page
- [x] Contract verification page
- [x] Block explorer with DAG visualization
- [x] Presale smart contract

### CI/CD
- [x] GitHub Actions workflows
- [x] Multi-platform builds
- [x] Automated testing
- [x] Security audits (cargo-audit)

---

## Build Plan

### Phase 1: Crownflame Testnet (Current)
**Timeline:** December 2024 - January 2025

```
Week 1-2: Stream C Integration
├── Transaction sequencer implementation
├── 100ms block production
├── Parallel execution engine
└── State root computation

Week 3-4: ZK Integration
├── ZK-STARK circuit design
├── Proof generation optimization
├── Verification contracts
└── Finality confirmation

Week 5-6: Cross-Stream Sync
├── Stream A <-> B sync protocol
├── Stream C state anchoring
├── Merkle proof generation
└── Light client support
```

### Phase 2: Security & Audit (Q1 2025)
**Timeline:** February - March 2025

```
Week 1-2: Internal Audit
├── Fuzzing campaigns
├── Formal verification
├── Penetration testing
└── Code review

Week 3-6: External Audit
├── Smart contract audit
├── Consensus audit
├── Cryptography review
└── Fix implementation
```

### Phase 3: Furnace Mainnet (Q2 2025)
**Timeline:** April - May 2025

```
Week 1-2: Final Preparation
├── Genesis block creation
├── Initial validator set
├── Token distribution
└── Documentation finalization

Week 3-4: Soft Launch
├── Limited validator set
├── Monitoring & metrics
├── Bug bounty program
└── Community testing

Week 5+: Full Launch
├── Open validator registration
├── Exchange listings
├── Marketing campaign
└── Ecosystem grants
```

---

## Repository Status

| Repository | Branch | Status | Last Commit |
|------------|--------|--------|-------------|
| pyrax-node-a | production-mainnet | ✅ Stable | EVM ported |
| pyrax-node-b | production-mainnet | ✅ Stable | EVM + CI |
| pyrax-desktop | production-mainnet | ✅ Stable | GPU mining UI |
| pyrax-web | production-mainnet | ✅ Stable | Video hero |
| pyrax-explorer | production-mainnet | ✅ Stable | TX details |
| pyrax-faucet | production-mainnet | ✅ Stable | - |
| pyrax-zk-stream | crownflame-public-testnet | 🔄 Active | ZK integration |
| pyrax-brand | main | ✅ Stable | Assets |

---

## Technical Debt

### High Priority
- [ ] Remove placeholder GPU detection (use actual hardware APIs)
- [ ] Implement actual Solidity compiler for contract verification
- [ ] Add database persistence for verified contracts
- [ ] Implement proper mining pool protocol

### Medium Priority
- [ ] Add comprehensive unit tests for EVM
- [ ] Implement state pruning for nodes
- [ ] Add WebSocket support for real-time updates
- [ ] Optimize RocksDB configuration

### Low Priority
- [ ] Refactor duplicate code across nodes
- [ ] Add OpenAPI/Swagger documentation
- [ ] Implement request tracing
- [ ] Add performance benchmarks

---

## Team Assignments

| Area | Lead | Backup |
|------|------|--------|
| Consensus | Core Team | - |
| EVM | Core Team | - |
| ZK Proofs | ZK Team | Core Team |
| Frontend | Web Team | - |
| Desktop | Desktop Team | Web Team |
| DevOps | Ops Team | Core Team |
| Security | Security Team | External |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| ZK proof latency | Medium | High | Optimize circuits, hardware acceleration |
| Security vulnerability | Low | Critical | Multiple audits, bug bounty |
| Network partition | Medium | Medium | Robust sync protocol |
| Exchange listing delays | Medium | Medium | Multiple exchange applications |
| Regulatory changes | Low | High | Legal counsel, compliance team |

---

## Metrics & KPIs

### Technical
- Target TPS: 100,000+
- Block time: 100ms (Stream C)
- Finality: <1 second
- Node sync time: <10 minutes

### Adoption
- Testnet validators: 100+
- Verified contracts: 50+
- Daily transactions: 10,000+
- Active wallets: 5,000+

---

*This document is automatically updated as development progresses.*
