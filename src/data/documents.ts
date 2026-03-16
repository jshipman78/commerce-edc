import type { BoardDocument } from '@/types';

// Placeholder document data — actual PDFs will be uploaded to /public/documents/
export const boardDocuments: BoardDocument[] = [
  {
    id: 'agenda-2025-01',
    title: 'Regular Meeting — January 2025',
    date: '2025-01-15',
    type: 'agenda',
    pdfUrl: '/documents/agendas/agenda-2025-01.pdf',
    year: 2025,
  },
  {
    id: 'agenda-2024-12',
    title: 'Regular Meeting — December 2024',
    date: '2024-12-18',
    type: 'agenda',
    pdfUrl: '/documents/agendas/agenda-2024-12.pdf',
    year: 2024,
  },
  {
    id: 'agenda-2024-11',
    title: 'Regular Meeting — November 2024',
    date: '2024-11-20',
    type: 'agenda',
    pdfUrl: '/documents/agendas/agenda-2024-11.pdf',
    year: 2024,
  },
  {
    id: 'minutes-2025-01',
    title: 'Approved Minutes — January 2025',
    date: '2025-01-15',
    type: 'minutes',
    pdfUrl: '/documents/minutes/minutes-2025-01.pdf',
    year: 2025,
  },
  {
    id: 'minutes-2024-12',
    title: 'Approved Minutes — December 2024',
    date: '2024-12-18',
    type: 'minutes',
    pdfUrl: '/documents/minutes/minutes-2024-12.pdf',
    year: 2024,
  },
];
