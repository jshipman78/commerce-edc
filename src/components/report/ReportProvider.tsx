'use client';

import { ReportFloatingBar } from './ReportFloatingBar';
import { ReportDrawer } from './ReportDrawer';

export function ReportProvider() {
  return (
    <>
      <ReportFloatingBar />
      <ReportDrawer />
    </>
  );
}
