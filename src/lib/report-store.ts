'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReportStore {
  sections: string[];
  includeExecutiveSummary: boolean;
  includeCoverPage: boolean;
  contactEmail: string;
  drawerOpen: boolean;

  addSection: (id: string) => void;
  removeSection: (id: string) => void;
  toggleSection: (id: string) => void;
  hasSection: (id: string) => boolean;
  setIncludeExecutiveSummary: (value: boolean) => void;
  setIncludeCoverPage: (value: boolean) => void;
  setContactEmail: (value: string) => void;
  setDrawerOpen: (value: boolean) => void;
  clearAll: () => void;
}

export const useReportStore = create<ReportStore>()(
  persist(
    (set, get) => ({
      sections: [],
      includeExecutiveSummary: true,
      includeCoverPage: true,
      contactEmail: '',
      drawerOpen: false,

      addSection: (id) =>
        set((state) => ({
          sections: state.sections.includes(id)
            ? state.sections
            : [...state.sections, id],
        })),

      removeSection: (id) =>
        set((state) => ({
          sections: state.sections.filter((s) => s !== id),
        })),

      toggleSection: (id) => {
        const { sections } = get();
        if (sections.includes(id)) {
          set({ sections: sections.filter((s) => s !== id) });
        } else {
          set({ sections: [...sections, id] });
        }
      },

      hasSection: (id) => get().sections.includes(id),

      setIncludeExecutiveSummary: (value) =>
        set({ includeExecutiveSummary: value }),

      setIncludeCoverPage: (value) => set({ includeCoverPage: value }),

      setContactEmail: (value) => set({ contactEmail: value }),

      setDrawerOpen: (value) => set({ drawerOpen: value }),

      clearAll: () =>
        set({
          sections: [],
          includeExecutiveSummary: true,
          includeCoverPage: true,
          contactEmail: '',
        }),
    }),
    {
      name: 'commerce-edc-report',
      partialize: (state) => ({
        sections: state.sections,
        includeExecutiveSummary: state.includeExecutiveSummary,
        includeCoverPage: state.includeCoverPage,
        contactEmail: state.contactEmail,
      }),
    }
  )
);
