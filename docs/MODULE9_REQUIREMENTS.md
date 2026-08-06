# Module 9 Requirements Specification: Export Sales & Quotations Engine

## 1. Executive Overview
Module 9 delivers the export price quotation and Proforma Invoice builder, freight and insurance additions, validity tracking, and profit margin analysis.

## 2. Technical Capabilities
1. **Sales Quotation Engine**: Calculates offer totals, freight/insurance additions, gross profit amounts, and gross margin percentages `((sales - cost) / sales) * 100`.
2. **Profit Margin Analysis**: Interactive margin calculator with CIF total values, cost breakdowns, and profitability metrics.
3. **Status Transitions**: `DRAFT` → `SENT` → `ACCEPTED` → `REJECTED` → `EXPIRED`.
