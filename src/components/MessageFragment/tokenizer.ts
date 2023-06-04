// Fixme: Add more languages
export enum Languages {
  typescript = 'typescript',
  javascript = 'javascript',
  java = 'java',
  python = 'python',
  unknown = 'unknown',
}
export enum TokenType {
  string = 'string',
  codeSnippet = 'codeSnippet',
}

type StringToken = {
  type: TokenType.string;
  value: string;
}

type CodeSnippetToken = {
  type: TokenType.codeSnippet;
  value: string;
  language: Languages;
}

export type Token = StringToken | CodeSnippetToken;


const parseCode = (code: string): CodeSnippetToken => {
  const snippetRegex = /```([a-zA-Z]+)([\s\S]*)```/;
  const match = code.match(snippetRegex);
  if (match) {
    return {
      type: TokenType.codeSnippet,
      value: match[2],
      language: match[1] as Languages,
    }
  } else {
    return {
      type: TokenType.codeSnippet,
      // FIXME: maybe remove the ``` from the value?
      value: code,
      language: Languages.unknown,
    }
  }
}

export function tokenizer(inputString: string): Token[] {
  const snippetRegex = /(```[^`]+```)/g;
  const parts = inputString.split(snippetRegex);

  const result = parts.map((part) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      // Code snippet part
      return parseCode(part);
    } else {
      // String part
      return {
        type: 'String',
        value: part,
      } as StringToken;
    }
  });
  return result;
}

export function hasCodeSnippet(inputString: string): boolean {
  const snippetRegex = /(```[^`]+```)/g;
  return inputString.match(snippetRegex) !== null;
}
