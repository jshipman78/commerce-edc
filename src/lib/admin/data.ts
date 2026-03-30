'use server';

import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const CONTENT_DIR = path.join(process.cwd(), 'src/content');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// ── News Articles (MDX) ──────────────────────────────────────────

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  author?: string;
  category?: string;
  body: string;
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  const newsDir = path.join(CONTENT_DIR, 'news');
  try {
    const files = await fs.readdir(newsDir);
    const articles: NewsArticle[] = [];

    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;
      const content = await fs.readFile(path.join(newsDir, file), 'utf-8');
      const article = parseMdx(file.replace('.mdx', ''), content);
      if (article) articles.push(article);
    }

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const filePath = path.join(CONTENT_DIR, 'news', `${slug}.mdx`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return parseMdx(slug, content);
  } catch {
    return null;
  }
}

export async function saveNewsArticle(article: NewsArticle): Promise<{ success: boolean; error?: string }> {
  const filePath = path.join(CONTENT_DIR, 'news', `${article.slug}.mdx`);
  const frontmatter = [
    '---',
    `title: "${article.title.replace(/"/g, '\\"')}"`,
    `date: "${article.date}"`,
    `excerpt: "${article.excerpt.replace(/"/g, '\\"')}"`,
  ];
  if (article.image) frontmatter.push(`image: "${article.image}"`);
  if (article.author) frontmatter.push(`author: "${article.author}"`);
  if (article.category) frontmatter.push(`category: "${article.category}"`);
  frontmatter.push('---', '');

  const content = frontmatter.join('\n') + article.body;

  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function deleteNewsArticle(slug: string): Promise<{ success: boolean }> {
  const filePath = path.join(CONTENT_DIR, 'news', `${slug}.mdx`);
  try {
    await fs.unlink(filePath);
    return { success: true };
  } catch {
    return { success: false };
  }
}

function parseMdx(slug: string, content: string): NewsArticle | null {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.substring(0, colonIdx).trim();
    let value = line.substring(colonIdx + 1).trim();
    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }

  return {
    slug,
    title: frontmatter.title || slug,
    date: frontmatter.date || '',
    excerpt: frontmatter.excerpt || '',
    image: frontmatter.image,
    author: frontmatter.author,
    category: frontmatter.category,
    body: match[2].trim(),
  };
}

// ── Properties ──────────────────────────────────────────────────

export async function getPropertiesData(): Promise<string> {
  const filePath = path.join(DATA_DIR, 'properties.ts');
  return fs.readFile(filePath, 'utf-8');
}

export async function savePropertiesData(content: string): Promise<{ success: boolean; error?: string }> {
  const filePath = path.join(DATA_DIR, 'properties.ts');
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

// ── Buildings ───────────────────────────────────────────────────

export async function getBuildingsData(): Promise<string> {
  const filePath = path.join(DATA_DIR, 'buildings.ts');
  return fs.readFile(filePath, 'utf-8');
}

export async function saveBuildingsData(content: string): Promise<{ success: boolean; error?: string }> {
  const filePath = path.join(DATA_DIR, 'buildings.ts');
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

// ── Board Members ───────────────────────────────────────────────

export async function getBoardMembersData(): Promise<string> {
  const filePath = path.join(DATA_DIR, 'board-members.ts');
  return fs.readFile(filePath, 'utf-8');
}

export async function saveBoardMembersData(content: string): Promise<{ success: boolean; error?: string }> {
  const filePath = path.join(DATA_DIR, 'board-members.ts');
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

// ── Employers ───────────────────────────────────────────────────

export async function getEmployersData(): Promise<string> {
  const filePath = path.join(DATA_DIR, 'employers.ts');
  return fs.readFile(filePath, 'utf-8');
}

export async function saveEmployersData(content: string): Promise<{ success: boolean; error?: string }> {
  const filePath = path.join(DATA_DIR, 'employers.ts');
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

// ── Typed CRUD: Buildings ────────────────────────────────────────

interface Building {
  id: string;
  name: string;
  address: string;
  squareFeet: number;
  price: string;
  description: string;
  features: string[];
  image?: string;
}

export async function getBuildingsTyped(): Promise<Building[]> {
  const raw = await fs.readFile(path.join(DATA_DIR, 'buildings.ts'), 'utf-8');
  return parseArrayFromTs<Building>(raw);
}

export async function saveBuildingsTyped(items: Building[]): Promise<{ success: boolean; error?: string }> {
  const content = generateBuildingsFile(items);
  try {
    await fs.writeFile(path.join(DATA_DIR, 'buildings.ts'), content, 'utf-8');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

function generateBuildingsFile(items: Building[]): string {
  const entries = items.map((b) => {
    const lines = [
      `  {`,
      `    id: '${esc(b.id)}',`,
      `    name: '${esc(b.name)}',`,
      `    address: '${esc(b.address)}',`,
      `    squareFeet: ${b.squareFeet},`,
      `    price: '${esc(b.price)}',`,
      `    description: '${esc(b.description)}',`,
      `    features: [${b.features.map((f) => `'${esc(f)}'`).join(', ')}],`,
    ];
    if (b.image) lines.push(`    image: '${esc(b.image)}',`);
    lines.push(`  },`);
    return lines.join('\n');
  });
  return `import type { Building } from '@/types';\n\nexport const buildings: Building[] = [\n${entries.join('\n')}\n];\n`;
}

// ── Typed CRUD: Properties ──────────────────────────────────────

interface Property {
  id: string;
  name: string;
  acreage: number;
  zoning: string;
  price: string;
  description: string;
  location: string;
  utilities: { water: boolean; sewer: boolean; gas: boolean; electric: boolean };
  railServed: boolean;
  opportunityZone: boolean;
  features: string[];
  image?: string;
}

export async function getPropertiesTyped(): Promise<Property[]> {
  const raw = await fs.readFile(path.join(DATA_DIR, 'properties.ts'), 'utf-8');
  return parseArrayFromTs<Property>(raw);
}

export async function savePropertiesTyped(items: Property[]): Promise<{ success: boolean; error?: string }> {
  const content = generatePropertiesFile(items);
  try {
    await fs.writeFile(path.join(DATA_DIR, 'properties.ts'), content, 'utf-8');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

function generatePropertiesFile(items: Property[]): string {
  const entries = items.map((p) => {
    const lines = [
      `  {`,
      `    id: '${esc(p.id)}',`,
      `    name: '${esc(p.name)}',`,
      `    acreage: ${p.acreage},`,
      `    zoning: '${esc(p.zoning)}',`,
      `    price: '${esc(p.price)}',`,
      `    description: '${esc(p.description)}',`,
      `    location: '${esc(p.location)}',`,
      `    utilities: { water: ${p.utilities.water}, sewer: ${p.utilities.sewer}, gas: ${p.utilities.gas}, electric: ${p.utilities.electric} },`,
      `    railServed: ${p.railServed},`,
      `    opportunityZone: ${p.opportunityZone},`,
      `    features: [${p.features.map((f) => `'${esc(f)}'`).join(', ')}],`,
    ];
    if (p.image) lines.push(`    image: '${esc(p.image)}',`);
    lines.push(`  },`);
    return lines.join('\n');
  });
  return `import type { Property } from '@/types';\n\nexport const properties: Property[] = [\n${entries.join('\n')}\n];\n`;
}

// ── Typed CRUD: Board Members ───────────────────────────────────

interface BoardMemberData {
  name: string;
  title: string;
  role: string;
  organization: string;
  image?: string;
}

export async function getBoardMembersTyped(): Promise<BoardMemberData[]> {
  const raw = await fs.readFile(path.join(DATA_DIR, 'board-members.ts'), 'utf-8');
  return parseArrayFromTs<BoardMemberData>(raw);
}

export async function saveBoardMembersTyped(items: BoardMemberData[]): Promise<{ success: boolean; error?: string }> {
  const content = generateBoardMembersFile(items);
  try {
    await fs.writeFile(path.join(DATA_DIR, 'board-members.ts'), content, 'utf-8');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

function generateBoardMembersFile(items: BoardMemberData[]): string {
  const entries = items.map((m) => {
    const lines = [
      `  {`,
      `    name: '${esc(m.name)}',`,
      `    title: '${esc(m.title)}',`,
      `    role: '${esc(m.role)}',`,
      `    organization: '${esc(m.organization)}',`,
    ];
    if (m.image) lines.push(`    image: '${esc(m.image)}',`);
    lines.push(`  },`);
    return lines.join('\n');
  });
  return `import type { BoardMember } from '@/types';\n\nexport const boardMembers: BoardMember[] = [\n${entries.join('\n')}\n];\n`;
}

// ── Typed CRUD: Employers + Partners ────────────────────────────

interface EmployerData {
  name: string;
  employees?: number;
  industry: string;
  description?: string;
  logo?: string;
  website?: string;
}

interface PartnerData {
  name: string;
  logo: string;
  website?: string;
}

export async function getEmployersTyped(): Promise<{ employers: EmployerData[]; partners: PartnerData[] }> {
  const raw = await fs.readFile(path.join(DATA_DIR, 'employers.ts'), 'utf-8');
  // This file has two arrays, parse each
  const employersMatch = raw.match(/export\s+const\s+majorEmployers[\s\S]*?=\s*(\[[\s\S]*?\n\];)/);
  const partnersMatch = raw.match(/export\s+const\s+partners[\s\S]*?=\s*(\[[\s\S]*?\n\];)/);

  let employers: EmployerData[] = [];
  let partners: PartnerData[] = [];

  if (employersMatch) {
    try {
      employers = new Function(`return ${employersMatch[1]}`)();
    } catch { /* empty */ }
  }
  if (partnersMatch) {
    try {
      partners = new Function(`return ${partnersMatch[1]}`)();
    } catch { /* empty */ }
  }

  return { employers, partners };
}

export async function saveEmployersTyped(
  employers: EmployerData[],
  partners: PartnerData[]
): Promise<{ success: boolean; error?: string }> {
  const content = generateEmployersFile(employers, partners);
  try {
    await fs.writeFile(path.join(DATA_DIR, 'employers.ts'), content, 'utf-8');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

function generateEmployersFile(employers: EmployerData[], partners: PartnerData[]): string {
  const empEntries = employers.map((e) => {
    const lines = [
      `  {`,
      `    name: '${esc(e.name)}',`,
    ];
    if (e.employees !== undefined && e.employees !== null) lines.push(`    employees: ${e.employees},`);
    lines.push(`    industry: '${esc(e.industry)}',`);
    if (e.description) lines.push(`    description: '${esc(e.description)}',`);
    if (e.logo) lines.push(`    logo: '${esc(e.logo)}',`);
    if (e.website) lines.push(`    website: '${esc(e.website)}',`);
    lines.push(`  },`);
    return lines.join('\n');
  });

  const partnerEntries = partners.map((p) => {
    const lines = [`  { name: '${esc(p.name)}', logo: '${esc(p.logo)}'`];
    if (p.website) lines[0] += `, website: '${esc(p.website)}'`;
    lines[0] += ' },';
    return lines[0];
  });

  return [
    `import type { Employer, Partner } from '@/types';`,
    ``,
    `export const majorEmployers: Employer[] = [`,
    empEntries.join('\n'),
    `];`,
    ``,
    `export const partners: Partner[] = [`,
    partnerEntries.join('\n'),
    `];`,
    ``,
  ].join('\n');
}

// ── Helpers: TS parsing & serialization ─────────────────────────

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function parseArrayFromTs<T>(raw: string): T[] {
  // Extract the first array literal from TS source
  const match = raw.match(/=\s*(\[[\s\S]*\]);?\s*$/m);
  if (!match) return [];
  try {
    return new Function(`return ${match[1]}`)();
  } catch {
    return [];
  }
}

// ── Agendas ─────────────────────────────────────────────────────

export async function getAgendaFiles(): Promise<{ name: string; path: string; date: string }[]> {
  const agendaDir = path.join(PUBLIC_DIR, 'documents/agendas');
  try {
    const files = await fs.readdir(agendaDir);
    const agendas = await Promise.all(
      files
        .filter((f) => f.endsWith('.pdf'))
        .map(async (f) => {
          const stat = await fs.stat(path.join(agendaDir, f));
          return {
            name: f,
            path: `/documents/agendas/${f}`,
            date: stat.mtime.toISOString(),
          };
        })
    );
    return agendas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export async function deleteAgenda(filename: string): Promise<{ success: boolean }> {
  const filePath = path.join(PUBLIC_DIR, 'documents/agendas', filename);
  try {
    await fs.unlink(filePath);
    return { success: true };
  } catch {
    return { success: false };
  }
}

// ── Media Library ───────────────────────────────────────────────

export interface MediaFile {
  name: string;
  path: string;
  size: number;
  modified: string;
  type: 'image' | 'document' | 'other';
}

export async function getMediaFiles(): Promise<MediaFile[]> {
  const uploadsDir = path.join(PUBLIC_DIR, 'uploads');
  // Ensure uploads dir exists
  await fs.mkdir(uploadsDir, { recursive: true });

  const files: MediaFile[] = [];
  await walkDir(uploadsDir, '/uploads', files);

  // Also scan existing images
  const imagesDir = path.join(PUBLIC_DIR, 'images');
  await walkDir(imagesDir, '/images', files);

  return files.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
}

async function walkDir(dir: string, urlPrefix: string, results: MediaFile[]) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        await walkDir(path.join(dir, entry.name), `${urlPrefix}/${entry.name}`, results);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        const stat = await fs.stat(path.join(dir, entry.name));
        let type: 'image' | 'document' | 'other' = 'other';
        if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) type = 'image';
        else if (['.pdf', '.doc', '.docx'].includes(ext)) type = 'document';

        results.push({
          name: entry.name,
          path: `${urlPrefix}/${entry.name}`,
          size: stat.size,
          modified: stat.mtime.toISOString(),
          type,
        });
      }
    }
  } catch {
    // Directory might not exist
  }
}

export async function deleteMediaFile(filePath: string): Promise<{ success: boolean }> {
  const fullPath = path.join(PUBLIC_DIR, filePath);
  try {
    await fs.unlink(fullPath);
    return { success: true };
  } catch {
    return { success: false };
  }
}
