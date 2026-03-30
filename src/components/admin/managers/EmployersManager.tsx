'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlideOverPanel } from '../SlideOverPanel';
import { EmployerForm } from '../forms/EmployerForm';
import { PartnerForm } from '../forms/PartnerForm';
import { saveEmployersTyped } from '@/lib/admin/data';

interface Employer {
  name: string;
  employees?: number;
  industry: string;
  description?: string;
  logo?: string;
  website?: string;
}

interface Partner {
  name: string;
  logo: string;
  website?: string;
}

interface EmployersManagerProps {
  initialEmployers: Employer[];
  initialPartners: Partner[];
}

type Tab = 'employers' | 'partners';

export function EmployersManager({ initialEmployers, initialPartners }: EmployersManagerProps) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('employers');
  const [employers, setEmployers] = useState<Employer[]>(initialEmployers);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openNew = () => {
    setEditingIdx(null);
    setIsNew(true);
    setPanelOpen(true);
  };

  const openEdit = (idx: number) => {
    setEditingIdx(idx);
    setIsNew(false);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditingIdx(null);
  };

  const persist = async (emps: Employer[], parts: Partner[]) => {
    setSaving(true);
    setMessage(null);
    const result = await saveEmployersTyped(emps, parts);
    if (result.success) {
      setEmployers(emps);
      setPartners(parts);
      setMessage({ type: 'success', text: 'Saved successfully!' });
      router.refresh();
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to save' });
    }
    setSaving(false);
  };

  // Employer CRUD
  const handleSaveEmployer = async (emp: Employer) => {
    let updated: Employer[];
    if (isNew) {
      updated = [...employers, emp];
    } else if (editingIdx !== null) {
      updated = employers.map((e, i) => (i === editingIdx ? emp : e));
    } else {
      return;
    }
    await persist(updated, partners);
    closePanel();
  };

  const handleDeleteEmployer = async (idx: number) => {
    const updated = employers.filter((_, i) => i !== idx);
    await persist(updated, partners);
    setDeleteConfirm(null);
  };

  // Partner CRUD
  const handleSavePartner = async (p: Partner) => {
    let updated: Partner[];
    if (isNew) {
      updated = [...partners, p];
    } else if (editingIdx !== null) {
      updated = partners.map((part, i) => (i === editingIdx ? p : part));
    } else {
      return;
    }
    await persist(employers, updated);
    closePanel();
  };

  const handleDeletePartner = async (idx: number) => {
    const updated = partners.filter((_, i) => i !== idx);
    await persist(employers, updated);
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employers &amp; Partners</h1>
          <p className="mt-1 text-sm text-gray-500">
            {employers.length} employer{employers.length !== 1 ? 's' : ''}, {partners.length} partner{partners.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={openNew}
          className="rounded-lg bg-[#1B2A4A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#152238]"
        >
          + Add {tab === 'employers' ? 'Employer' : 'Partner'}
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setTab('employers')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === 'employers' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Major Employers ({employers.length})
        </button>
        <button
          onClick={() => setTab('partners')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === 'partners' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Community Partners ({partners.length})
        </button>
      </div>

      {message && (
        <div className={`mt-4 rounded-lg px-4 py-3 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {saving && (
        <div className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">Saving...</div>
      )}

      {/* Employers Table */}
      {tab === 'employers' && (
        <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Company</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Industry</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Employees</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employers.map((emp, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {emp.logo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={emp.logo} alt="" className="h-8 w-8 rounded object-contain" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        {emp.website && <p className="text-xs text-blue-600 truncate max-w-[200px]">{emp.website}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{emp.industry}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{emp.employees ?? '—'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(idx)}
                        className="rounded-md px-3 py-1.5 text-sm font-medium text-[#1B2A4A] hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      {deleteConfirm === `emp-${idx}` ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleDeleteEmployer(idx)}
                            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(`emp-${idx}`)}
                          className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {employers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                    No employers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Partners Table */}
      {tab === 'partners' && (
        <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Logo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Website</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {partners.map((p, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                  <td className="px-6 py-4">
                    {p.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.logo} alt="" className="h-8 max-w-[80px] object-contain" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{p.website || '—'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(idx)}
                        className="rounded-md px-3 py-1.5 text-sm font-medium text-[#1B2A4A] hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      {deleteConfirm === `part-${idx}` ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleDeletePartner(idx)}
                            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(`part-${idx}`)}
                          className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {partners.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                    No partners yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide-over for Employers */}
      {tab === 'employers' && (
        <SlideOverPanel
          open={panelOpen}
          onClose={closePanel}
          title={isNew ? 'Add Employer' : `Edit: ${editingIdx !== null ? employers[editingIdx]?.name : ''}`}
        >
          <EmployerForm
            key={editingIdx ?? 'new'}
            employer={editingIdx !== null ? employers[editingIdx] : undefined}
            isNew={isNew}
            onSave={handleSaveEmployer}
            onCancel={closePanel}
          />
        </SlideOverPanel>
      )}

      {/* Slide-over for Partners */}
      {tab === 'partners' && (
        <SlideOverPanel
          open={panelOpen}
          onClose={closePanel}
          title={isNew ? 'Add Partner' : `Edit: ${editingIdx !== null ? partners[editingIdx]?.name : ''}`}
        >
          <PartnerForm
            key={editingIdx ?? 'new-partner'}
            partner={editingIdx !== null ? partners[editingIdx] : undefined}
            isNew={isNew}
            onSave={handleSavePartner}
            onCancel={closePanel}
          />
        </SlideOverPanel>
      )}
    </div>
  );
}
