# Module 13 Requirements Specification: Marine Cargo Insurance & Policy Vault

## 1. Executive Overview
Module 13 delivers the marine cargo insurance policy generator, Institute Cargo Clauses (A/B/C) coverage rules, 110% CIF sum insured valuation calculations, premium receipts, and transit damage claims ledger.

## 2. Technical Capabilities
1. **Marine Cargo Insurance Engine**: Calculates 110% CIF sum insured valuation `CIF * 1.10`, computes premium rates (Clause A All-Risks = 0.30%, Clause B = 0.20%, Clause C = 0.12%), and issues policy certificates.
2. **Transit Claims Ledger**: Lodges cargo damage claims, tracks surveyor loss inspection notes, and manages underwriter settlement statuses.
