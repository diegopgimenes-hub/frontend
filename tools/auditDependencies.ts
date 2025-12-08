/**
 * Auditor de dependências residuais
 * ---------------------------------
 * Detecta:
 *  - Imports quebrados
 *  - Referências a pastas removidas (ex: employees)
 *
 * Uso:
 *   npx ts-node tools/auditDependencies.ts
 */

import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";

const ROOT_DIR = path.resolve(process.cwd(), "src");
const REMOVED_KEYWORDS = ["employees", "employee"];

function fileExists(filePath: string): boolean {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function checkImports(filePath: string, content: string): string[] {
  const issues: string[] = [];
  const importRegex = /from ['"]([^'"]+)['"]|import\(['"]([^'"]+)['"]\)/g;

  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1] || match[2];
    if (!importPath.startsWith(".") && !importPath.startsWith("@")) continue;

    const resolvedPath = importPath.startsWith("@")
      ? importPath.replace(/^@/, ROOT_DIR)
      : path.resolve(path.dirname(filePath), importPath);

    const candidates = [
      `${resolvedPath}.tsx`,
      `${resolvedPath}.ts`,
      path.join(resolvedPath, "index.tsx"),
      path.join(resolvedPath, "index.ts"),
    ];

    const exists = candidates.some(fileExists);
    if (!exists) {
      issues.push(`🚫 Import quebrado: "${importPath}" em ${path.basename(filePath)}`);
    }
  }
  return issues;
}

function checkRemovedKeywords(filePath: string, content: string): string[] {
  const issues: string[] = [];
  for (const keyword of REMOVED_KEYWORDS) {
    if (content.toLowerCase().includes(keyword)) {
      issues.push(`⚠️ Referência residual a "${keyword}" em ${path.basename(filePath)}`);
    }
  }
  return issues;
}

function auditProject() {
  console.log("🔍 Iniciando auditoria de dependências...\n");

  const files = (glob as any).sync(`${ROOT_DIR}/**/*.{ts,tsx}`, {
    ignore: ["**/node_modules/**", "**/dist/**"],
  });

  const allIssues: string[] = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    allIssues.push(...checkImports(file, content));
    allIssues.push(...checkRemovedKeywords(file, content));
  }

  if (allIssues.length === 0) {
    console.log("✅ Nenhum problema encontrado. O projeto está limpo!");
  } else {
    console.log("⚠️ Problemas encontrados:\n");
    allIssues.forEach(i => console.log(" - " + i));
  }
}

auditProject();
