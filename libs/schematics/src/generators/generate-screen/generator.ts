import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readProjectConfiguration,
} from '@nx/devkit';
import { updateShellMenu } from './update-shell-menu';

interface GenerateScreenGeneratorSchema {
  name: string;
  project?: string;
}

export default async function (tree: Tree, schema: GenerateScreenGeneratorSchema) {
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

  const templateData = {
    ...normalizedNames,
    className: normalizedNames.className,
    fileName: normalizedNames.fileName,
    constantName: normalizedNames.constantName,
    projectName: projectName,
  };

  // Generate the component files
  generateFiles(tree, joinPathFragments('libs/schematics/src/generators/generate-screen/files'), targetPath, templateData);

  // Update shell menu
  try {
    updateShellMenu(normalizedNames.fileName, projectName);
  } catch (error: any) {
    console.log('⚠️ Não foi possível atualizar o menu do shell:', error.message);
  }

  await formatFiles(tree);
} 