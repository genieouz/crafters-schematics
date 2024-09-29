import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  mergeWith
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function nestjsGraphqlCmModule(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Définir la source des templates de fichiers
    const sourceTemplates = url('./files'); // './files' contient les templates

    // Appliquer les transformations de nom
    const sourceParamTemplates = apply(sourceTemplates, [
      template({
        ..._options,  // Options passées lors de la génération
        ...strings    // Helpers pour manipuler les noms (classify, dasherize, etc.)
      }),
      move(`src/app/modules/${strings.dasherize(_options.name)}`) // Déplacement vers le bon dossier
    ]);

    // Fusionner les templates dans l'arborescence de fichiers
    return mergeWith(sourceParamTemplates)(tree, _context);
  };
}
// Fonction personnalisée pour le vrai snake_case (avec underscores)
export function snakeCase(str: string): string {
  return strings.underscore(str).replace(/-/g, '_');
}
