/* eslint-disable no-undef */
import codeRules from './codeRules.js';

describe('Code Rules Validation', () => {
  describe('var usage rule', () => {
    const rule = codeRules[0];
    
    it('должен найти var', () => {
      expect(rule.test('var x = 1;')).toBe(true);
    });
    
    it('игнор const/let', () => {
      expect(rule.test('const x = 1; let y = 2;')).toBe(false);
    });
    
    it('игнор если eslint disable comment present', () => {
      expect(rule.test('// eslint-disable-next-line no-var\nvar x = 1;')).toBe(false);
    });
  });

  describe('console.log', () => {
    const rule = codeRules[1];
    
    it('должен найти console.log', () => {
      expect(rule.test('console.log("test");')).toBe(true);
    });
    
    it('игнор если eslint disable comment present', () => {
      expect(rule.test('// eslint-disable-next-line no-console\nconsole.log("test");')).toBe(false);
    });
  });

  describe('eval', () => {
    const rule = codeRules[2];
    
    it('должен найти eval', () => {
      expect(rule.test('eval("1+1");')).toBe(true);
    });
    
    it('игнор если eslint disable comment present', () => {
      expect(rule.test('// eslint-disable-next-line no-eval\neval("1+1");')).toBe(false);
    });
  });

  describe('конкатенация строк', () => {
    const rule = codeRules[3];
    
    it('должен найти конкатенацию', () => {
      expect(rule.test('"a" + b + "c"')).toBe(true);
      expect(rule.test("'a' + b + 'c'")).toBe(true);
    });
    
    it('игнор template literals', () => {
      expect(rule.test('`a${b}c`')).toBe(false);
    });
    
    it('игнор если eslint disable comment present', () => {
      expect(rule.test('// eslint-disable-next-line prefer-template\n"a" + b')).toBe(false);
    });
  });

  describe('строгое равенство', () => {
    const rule = codeRules[4];
    
    it('должен найти == ', () => {
      //expect(rule.test('a == b')).toBe(true);
      //expect(rule.test('a != b')).toBe(true);
    });
    
    it('игнор ===/!==', () => {
      expect(rule.test('a === b')).toBe(false);
      expect(rule.test('a !== b')).toBe(false);
    });
    
    it('игнор если eslint disable comment present', () => {
      expect(rule.test('// eslint-disable-next-line eqeqeq\na == b')).toBe(false);
    });
  });

  describe('Promise.all', () => {
    const rule = codeRules[6];
    
    it('жолжен найти несколько await без Promise.all', () => {
      const code = `
        async function test() {
          const a = await foo();
          const b = await bar();
        }
      `;
      expect(rule.test(code)).toBe(true);
    });
    
    it('игнор если есть Promise all', () => {
      const code = `
        async function test() {
          const [a, b] = await Promise.all([foo(), bar()]);
        }
      `;
      expect(rule.test(code)).toBe(false);
    });
    
    it('игнор если  eslint disable comment present', () => {
      const code = `
        // eslint-disable-next-line no-await-in-loop
        async function test() {
          const a = await foo();
          const b = await bar();
        }
      `;
      expect(rule.test(code)).toBe(false);
    });
  });

  describe('try/catch с async/await', () => {
    const rule = codeRules[7];
    
    it('должен найти async/await без try/catch', () => {
      const code = `
        async function test() {
          await foo();
        }
      `;
      expect(rule.test(code)).toBe(true);
    });
    
    it('игнор если есть try/catch', () => {
      const code = `
        async function test() {
          try {
            await foo();
          } catch (err) {
            console.error(err);
          }
        }
      `;
      expect(rule.test(code)).toBe(false);
    });
    
    it('игнор если eslint disable comment present', () => {
      const code = `
        // eslint-disable-next-line no-try-catch
        async function test() {
          await foo();
        }
      `;
      expect(rule.test(code)).toBe(false);
    });
  });

  describe('optional chaining', () => {
    const rule = codeRules[8];
    
    it('цепочка свойств без ?', () => {
      expect(rule.test('a.b.c')).toBe(true);
    });
    
    it('если есть ?', () => {
      expect(rule.test('a?.b?.c')).toBe(false);
    });
    
    it('игнор если есть проверка на null', () => {
      expect(rule.test('a && a.b && a.b.c')).toBe(false);
    });
    
    it('игнор eslint disable comment present', () => {
      expect(rule.test('// eslint-disable-next-line optional-chaining\na.b.c')).toBe(false);
    });
  });

  describe('Object.assign', () => {
    const rule = codeRules[9];
    
    it('должен найти Object.assign', () => {
      expect(rule.test('Object.assign({}, a)')).toBe(true);
    });
    
    it('игнор spread operator', () => {
      expect(rule.test('{ ...a }')).toBe(false);
    });
    
    it('игнор если eslint disable comment present', () => {
      expect(rule.test('// eslint-disable-next-line prefer-object-spread\nObject.assign({}, a)')).toBe(false);
    });
  });

  describe('arguments', () => {
    const rule = codeRules[10];
    
    it('должен найти arguments', () => {
      expect(rule.test('function test() { console.log(arguments); }')).toBe(true);
    });
    
    it('игнор rest', () => {
      expect(rule.test('function test(...args) { console.log(args); }')).toBe(false);
    });
    
    it('игнор  если eslint disable comment present', () => {
      expect(rule.test('// eslint-disable-next-line prefer-rest-params\nfunction test() { console.log(arguments); }')).toBe(false);
    });
  });

  describe('promise then', () => {
    const rule = codeRules[11];
    
    it('должен найти цепочки .then()', () => {
      expect(rule.test('fetch().then(res => res.json())')).toBe(true);
    });
    
    it('игнор async/await', () => {
      expect(rule.test('async function test() { await fetch(); }')).toBe(false);
    });
    
    it('игнор если eslint disable comment present', () => {
      expect(rule.test('// eslint-disable-next-line no-promise-executor-return\nfetch().then(res => res.json())')).toBe(false);
    });
  });
});