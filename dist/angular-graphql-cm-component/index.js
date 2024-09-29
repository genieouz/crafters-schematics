"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.angularGraphqlCmComponent = angularGraphqlCmComponent;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function angularGraphqlCmComponent(_options) {
    return (tree, _context) => {
        // Définir la source des templates de fichiers
        const sourceTemplates = (0, schematics_1.url)('./files'); // './files' contient les templates
        // Appliquer les transformations de nom
        const sourceParamTemplates = (0, schematics_1.apply)(sourceTemplates, [
            (0, schematics_1.template)(Object.assign(Object.assign({}, _options), core_1.strings // Helpers pour manipuler les noms (classify, dasherize, etc.)
            )),
            (0, schematics_1.move)(`src/app/modules/${core_1.strings.dasherize(_options.name)}`) // Déplacement vers le bon dossier
        ]);
        // Fusionner les templates dans l'arborescence de fichiers
        return (0, schematics_1.mergeWith)(sourceParamTemplates)(tree, _context);
    };
}
//# sourceMappingURL=index.js.map