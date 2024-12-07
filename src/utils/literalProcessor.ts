// Utility type to extract string literal types from a type
type ExtractLiteralType<T> = T extends string 
  ? string extends T 
    ? never 
    : T 
  : never;

// Utility type to get union of string literals from a type
type GetStringLiterals<T> = T extends string
  ? string extends T
    ? never
    : T
  : T extends object
  ? { [K in keyof T]: GetStringLiterals<T[K]> }[keyof T]
  : never;

// Utility type to build path strings
type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends object
    ? T[K] extends Array<any>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

// Utility type to get all paths that have string literal values
type LiteralPaths<T> = {
  [P in Path<T>]: P extends keyof T
    ? ExtractLiteralType<T[P]> extends never
      ? never
      : P
    : P extends string
    ? GetPropertyType<T, P> extends string
      ? ExtractLiteralType<GetPropertyType<T, P>> extends never
        ? never
        : P
      : never
    : never;
}[Path<T>];

// Utility type to get the type of a nested property
type GetPropertyType<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? GetPropertyType<T[K], R>
    : never
  : never;

// Function to automatically extract literal definitions from an interface
function extractLiteralDefinitions<T extends object>(): Record<string, string[]> {
  const definitions: Record<string, Set<string>> = {};
  
  function extractLiterals(type: any, path: string = '') {
    if (typeof type === 'object' && type !== null) {
      for (const key in type) {
        const newPath = path ? `${path}.${key}` : key;
        const value = type[key];
        
        if (typeof value === 'string') {
          if (!definitions[newPath]) {
            definitions[newPath] = new Set();
          }
          definitions[newPath].add(value);
        } else if (typeof value === 'object') {
          extractLiterals(value, newPath);
        }
      }
    }
  }

  // Use TypeScript's type system to get literal types
  type Literals = GetStringLiterals<T>;
  const literals = {} as Literals;
  extractLiterals(literals);

  // Convert Sets to arrays
  return Object.fromEntries(
    Object.entries(definitions).map(([key, value]) => [key, Array.from(value)])
  );
}

// Function to process string literals
export function processLiterals<T extends object>(data: T): T {
  const definitions = extractLiteralDefinitions<T>();
  const processed = { ...data };

  for (const [path, allowedValues] of Object.entries(definitions)) {
    const keys = path.split('.');
    let current: any = processed;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
      if (!current) break;
    }

    const lastKey = keys[keys.length - 1];
    if (current && current[lastKey]) {
      const value = current[lastKey];
      if (typeof value === 'string' && !allowedValues.includes(value)) {
        current[lastKey] = allowedValues[0];
      }
    }
  }

  return processed;
}
