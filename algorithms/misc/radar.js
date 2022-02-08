/* 
Code a simple "Radar" that will check if a transaction was allowed or not.

Given a string :

"["CHARGE:card_country=US&currency=USD&amount=250&ip_country=CA","ALLOW:amount>500", ]"

the algorithm has to return 1 of the transaction is allowed and 0 if not.
We have 2 different family rules : ALLOW and BLOCK, and both of them can accept up to 2 rules separated by an OR or an AND.
We have 6 different operations ( >, <, >=, <=, ==, !=)
*/ 

const operations = ['>','<','>=','<=','==','!='];

const getParts = (value) => {
  const input = value.split('\"');
  let charge = '';
  let allow = '';
  let block = '';

  input.forEach(str => {
    if (str.includes('CHARGE')) {
      charge = str.split(':')[1];
    }

    if (str.includes('ALLOW')) {
      allow = str.split(':')[1];
    }

    if (str.includes('BLOCK')) {
      block = str.split(':')[1];
    }
  });

  return {charge, allow, block};
}

const populateMap = (str, type) => {
  let stack = [];
  const map = {};

  if (type === 'input') {
    const parts = str.split('&');
    parts.forEach(part => {
      const [key, value] = part.split('=');
      map[key] = value;
    });
  } else {
   if (str.length > 0) {
      stack = [...str.match(/(AND|OR)/) || []]
      // const parts = str.split(/(?:AND|OR)/).filter(Boolean);
      const parts = str.split(/(AND|OR)/).filter(Boolean);
      parts.forEach(part => {
        operations.forEach(operation => {
          if (part.includes(operation)) {
            const [key, value] = part.split(operation);
            map[key] = {
              operator: operation,
              value
            }
          }
        })
      });
   }
  }
  
  return {
   map,
   stack, 
  };
}

const createMaps = ({charge, allow, block}) => {
  const {map: chargeMap} = populateMap(charge, 'input');
  const {map: allowMap, stack: allowStack} = populateMap(allow, 'condition');
  const {map: blockMap, stack: blockStack} = populateMap(block, 'condition');

  return {
    chargeMap,
    allowMap,
    blockMap,
    allowStack,
    blockStack
  }
}

const evaluate = (a, operator, b) => {
  switch(operator) {
    case '>':
      return a > b;
    case '<':
      return a < b;
    case '>=':
      return a >= b;
    case '<=':
      return a <= b;
    case '==':
      return a == b;
    case '!=':
      return a != b;
  }
}

const compare = (a, operator, b) => {
  switch(operator) {
    case 'AND':
      return a && b;
    case 'OR':
      return a || b; 
  }
}

const radar = (value) => {
  const allowResult = [];
  const blockResult = [];

  const input = value.split('\"');
  const { charge, allow, block } = getParts(value);
  const { chargeMap, allowMap, blockMap, allowStack, blockStack } = createMaps({charge, allow, block});

  const keys = Object.keys(chargeMap);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (allowMap[key]) {
      allowResult.push(evaluate(chargeMap[key], allowMap[key].operator, allowMap[key].value));
    }
    if (blockMap[key]) {
      blockResult.push(evaluate(chargeMap[key], blockMap[key].operator, blockMap[key].value));
    }
  }

  if (allowStack.length === 0 && allowResult[0] === false) {
    return 0;
  }

  if (blockStack.length === 0 && blockResult[0] === true) {
    return 0;
  }

  for (let i = 1; i < allowResult.length; i++) {
    const result = compare(allowResult[i-1], allowStack[i-1], allowResult[i]);
    if (result === false) return 0;
  }

  for (let i = 1; i < blockResult.length; i++) {
    const result = compare(blockResult[i-1], blockStack[i-1], blockResult[i]);
    if (result === true) return 0;
  }

  return 1;
}

// npx jest algorithms/misc/radar.js
describe('radar', () => {
  test('radar()', () => {
    expect(radar("[\"CHARGE:card_country=US&currency=USD&amount=250&ip_country=CA\",\"ALLOW:amount>500\", ]")).toEqual(0);
    expect(radar("[\"CHARGE:card_country=US&currency=USD&amount=2500&ip_country=CA\",\"BLOCK:amount>500\",  ]")).toEqual(1);
    expect(radar("[\"CHARGE:card_country=US&currency=USD&amount=250&ip_country=CA\",\"ALLOW:amount>100\", \"BLOCK:amount>500\", ]")).toEqual(1);
    expect(radar("[\"CHARGE:card_country=US&currency=USD&amount=250&ip_country=CA\",\"ALLOW:amount>100ANDcard_country==USANDcurrency==USD\",]")).toEqual(1);
    expect(radar("[\"CHARGE:card_country=US&currency=USD&amount=250&ip_country=CA\",\"ALLOW:amount>251ANDcard_country==USANDcurrency==USD\",]")).toEqual(0);
    expect(radar("[\"CHARGE:card_country=US&currency=USD&amount=250&ip_country=CA\",\"ALLOW:amount>=250ANDcard_country==US\", \"BLOCK:amount>500ORcurrency==USD\"]")).toEqual(0);
  });
});
