/**
 * transforms/intl.js
 *
 * A jscodeshift transform to wrap literal JSX text in t('…')
 * and ensure useTranslations is imported + "use client" is present.
 */

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);
  
    // Only process TSX files
    if (!file.path.endsWith('.tsx')) return file.source;
  
    // 1. Ensure "use client"; at the top if there's any JSX
    const hasUseClient = root
      .find(j.ExpressionStatement, { expression: { value: 'use client' } })
      .size();
    const hasJSX = root.find(j.JSXElement).size();
    if (hasJSX && !hasUseClient) {
      root.get().node.program.body.unshift(
        j.expressionStatement(j.literal('use client'))
      );
    }
  
    // 2. Ensure `import { useTranslations } from 'next-intl';`
    const hasHookImport = root
      .find(j.ImportDeclaration, { source: { value: 'next-intl' } })
      .find(j.ImportSpecifier, { imported: { name: 'useTranslations' } })
      .size();
    if (!hasHookImport) {
      root.get().node.program.body.unshift(
        j.importDeclaration(
          [j.importSpecifier(j.identifier('useTranslations'))],
          j.literal('next-intl')
        )
      );
    }
  
    // 3. Wrap JSXText in t('key')
    root
      .find(j.JSXText)
      .filter(path => /\S/.test(path.node.value)) // non-empty text
      .forEach(path => {
        const raw = path.node.value.trim();
        // generate a key: lowercase, spaces & punctuation → dots
        const key = raw
          .toLowerCase()
          .replace(/[’'“”"]/g, '')
          .replace(/[^a-z0-9]+/g, '.')
          .replace(/(^\.|\.$)/g, '');
  
        path.replace(
          j.jsxExpressionContainer(
            j.callExpression(j.identifier('t'), [j.literal(key)])
          )
        );
      });
  
    return root.toSource({ quote: 'single' });
  }
  