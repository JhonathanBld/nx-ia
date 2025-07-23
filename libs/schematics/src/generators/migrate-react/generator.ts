import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readProjectConfiguration,
} from '@nx/devkit';
import * as fs from 'fs';

interface MigrateReactGeneratorSchema {
  name: string;
  project?: string;
  reactFile: string;
  features?: string[];
  targetFramework?: 'standalone' | 'ngmodule';
}

export default async function (tree: Tree, schema: MigrateReactGeneratorSchema) {
  const projectName = schema.project || 'dashboard';
  const projectConfig = readProjectConfiguration(tree, projectName);
  const normalizedNames = names(schema.name);
  
  const sourceRoot = projectConfig.sourceRoot;
  if (!sourceRoot) {
    throw new Error(`Project "${projectName}" is missing "sourceRoot" in its configuration.`);
  }

  const targetPath = joinPathFragments(
    sourceRoot,
    'app',
    normalizedNames.fileName
  );

  // Ler e analisar o arquivo React
  const reactCode = readReactFile(schema.reactFile);
  const analysis = analyzeReactCode(reactCode, schema.features || []);

  const templateData = {
    ...normalizedNames,
    className: normalizedNames.className,
    fileName: normalizedNames.fileName,
    constantName: normalizedNames.constantName,
    projectName: projectName,
    reactCode: reactCode,
    analysis: analysis,
    targetFramework: schema.targetFramework || 'standalone',
    features: schema.features || []
  };

  // Gerar arquivos Angular baseados na análise
  generateFiles(tree, joinPathFragments('libs/schematics/src/generators/migrate-react/files'), targetPath, templateData);

  await formatFiles(tree);
}

function readReactFile(filePath: string): string {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    } else {
      console.log(`⚠️ Arquivo React não encontrado: ${filePath}`);
      return '';
    }
  } catch (error) {
    console.log(`❌ Erro ao ler arquivo React: ${error}`);
    return '';
  }
}

function analyzeReactCode(reactCode: string, features: string[]) {
  const analysis = {
    hasHooks: false,
    hasStyledComponents: false,
    hasProps: false,
    hasState: false,
    hasEffects: false,
    hasEventHandlers: false,
    imports: [] as string[],
    props: [] as string[],
    state: [] as string[],
    eventHandlers: [] as string[]
  };

  const lowerCode = reactCode.toLowerCase();

  // Detectar hooks
  if (lowerCode.includes('usestate') || lowerCode.includes('useEffect') || lowerCode.includes('useContext')) {
    analysis.hasHooks = true;
  }

  // Detectar styled-components
  if (lowerCode.includes('styled') || lowerCode.includes('styled-components')) {
    analysis.hasStyledComponents = true;
  }

  // Detectar props
  if (lowerCode.includes('props') || lowerCode.includes('interface') || lowerCode.includes('type')) {
    analysis.hasProps = true;
  }

  // Detectar state
  if (lowerCode.includes('usestate') || lowerCode.includes('setstate')) {
    analysis.hasState = true;
  }

  // Detectar useEffect
  if (lowerCode.includes('useeffect')) {
    analysis.hasEffects = true;
  }

  // Detectar event handlers
  if (lowerCode.includes('onclick') || lowerCode.includes('onchange') || lowerCode.includes('onsubmit')) {
    analysis.hasEventHandlers = true;
  }

  // Extrair imports
  const importMatches = reactCode.match(/import\s+.*?from\s+['"]([^'"]+)['"]/g);
  if (importMatches) {
    analysis.imports = importMatches.map(imp => imp.trim());
  }

  // Extrair props
  const propMatches = reactCode.match(/(?:interface|type)\s+(\w+Props?)\s*\{([^}]+)\}/g);
  if (propMatches) {
    analysis.props = propMatches.map(match => match.trim());
  }

  // Extrair state
  const stateMatches = reactCode.match(/useState<([^>]+)>\(/g);
  if (stateMatches) {
    analysis.state = stateMatches.map(match => match.trim());
  }

  // Extrair event handlers
  const handlerMatches = reactCode.match(/const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{/g);
  if (handlerMatches) {
    analysis.eventHandlers = handlerMatches.map(match => match.trim());
  }

  return analysis;
} 