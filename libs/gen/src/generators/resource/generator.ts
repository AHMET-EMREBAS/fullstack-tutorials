import { formatFiles, generateFiles, Tree, names } from '@nx/devkit';
import * as path from 'path';
import { ResourceGeneratorSchema } from './schema';

export async function resourceGenerator(
  tree: Tree,
  options: ResourceGeneratorSchema
) {
  const TARGET = 'libs/rest/src/lib';

  generateFiles(tree, path.join(__dirname, 'files'), TARGET, {
    ...names(options.name),
  });
  await formatFiles(tree);
}

export default resourceGenerator;
