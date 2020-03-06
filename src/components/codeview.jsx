import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
 
SyntaxHighlighter.registerLanguage('jsx', jsx);

export default (props) => {
  return (
    <SyntaxHighlighter 
    language={props.language || 'jsx'}
    // useInlineStyles={false}
     showLineNumbers={props.language==='jsx' || !props.language} style={prism}>
      {props.code}
    </SyntaxHighlighter>
  );
};