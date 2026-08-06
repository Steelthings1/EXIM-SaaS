"use client";

import React, { useState } from 'react';
import { Users, UserPlus, ShieldCheck, Globe, DollarSign, CreditCard, Building2, CheckCircle2 } from 'lucide-react';

export default function CRMContactsPage() {
  const [contacts, setContacts] = useState([
    {
      id: 'c-101',
      type: 'BUYER_CUSTOMER',
      name: 'Gulf Trading Enterprise FZE',
      tradeName: 'Gulf Exim Dubai',
      taxId: 'TRN-100456789000003',
      country: 'ARE',
      email: 'procurement@gulftrading.ae',
      kybStatus: 'VERIFIED_KYB',
      creditLimitUsd: 250000.00,
      paymentTerms: 'LC_AT_SIGHT'
    },
    {
      id: 'c-102',
      type: 'BUYER_CUSTOMER',
      name: 'EuroAmericana Importers Inc',
      tradeName: 'EuroAmericana NY',
      taxId: 'EIN-98-7654321',
      country: 'USA',
      email: 'orders@euroamericana.com',
      kybStatus: 'VERIFIED_KYB',
      creditLimitUsd: 500000.00,
      paymentTerms: 'NET_30'
    },
    {
      id: 'c-103',
      type: 'SUPPLIER_VENDOR',
      name: 'Deccan Spice & Commodities Plantations Pvt Ltd',
      tradeName: 'Deccan Spice India',
      taxId: 'GSTIN: 33ABCDE1234F1Z9',
      country: 'IND',
      email: 'supplies@deccanspice.in',
      kybStatus: 'VERIFIED_KYB',
      creditLimitUsd: 150000.00,
      paymentTerms: 'ADVANCE_30_70'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    country: 'USA',
    type: 'BUYER_CUSTOMER',
    taxId: ''
  });

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContacts([
      ...contacts,
      {
        id: `c-${Date.now()}`,
        type: newContact.type,
        name: newContact.name,
        tradeName: newContact.name,
        taxId: newContact.taxId || 'TAX-PENDING',
        country: newContact.country,
        email: newContact.email,
        kybStatus: 'VERIFIED_KYB',
        creditLimitUsd: 100000.00,
        paymentTerms: 'LC_AT_SIGHT'
      }
    ]);
    setShowModal(false);
    setNewContact({ name: '', email: '', country: 'USA', type: 'BUYER_CUSTOMER', taxId: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Users className="w-7 h-7 text-indigo-400" />
              Customer & Supplier CRM Directory
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              International buyer and supplier registry with Know-Your-Business (KYB) verification, credit limits, and payment terms.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Buyer / Supplier Contact</span>
          </button>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((c) => (
            <div key={c.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-white">{c.name}</h2>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {c.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{c.email}</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  KYB Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Tax ID / VAT</span>
                  <span className="text-indigo-300 font-semibold">{c.taxId}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Country Jurisdiction</span>
                  <span className="text-slate-200 font-semibold">{c.country}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Approved Credit Limit</span>
                  <span className="text-emerald-400 font-bold">${c.creditLimitUsd.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Default Payment Terms</span>
                  <span className="text-amber-300 font-semibold">{c.paymentTerms}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5">
              <h2 className="text-lg font-bold text-white">Add New CRM Contact</h2>

              <form onSubmit={handleCreateContact} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    required
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Contact Category</label>
                    <select
                      value={newContact.type}
                      onChange={(e) => setNewContact({ ...newContact, type: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    >
                      <option value="BUYER_CUSTOMER">Buyer / Customer</option>
                      <option value="SUPPLIER_VENDOR">Supplier / Vendor</option>
                      <option value="BUYING_HOUSE">Buying House Agent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Country</label>
                    <input
                      type="text"
                      value={newContact.country}
                      onChange={(e) => setNewContact({ ...newContact, country: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg text-xs"
                  >
                    Save Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
