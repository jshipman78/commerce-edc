import { getBoardMembersTyped } from '@/lib/admin/data';
import { BoardMembersManager } from '@/components/admin/managers/BoardMembersManager';

export default async function AdminBoardMembersPage() {
  const members = await getBoardMembersTyped();

  return <BoardMembersManager initialData={members} />;
}
