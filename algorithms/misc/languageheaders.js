/*
Part 1

In an HTTP request, the Accept-Language header describes the list of
languages that the requester would like content to be returned in. The header takes the form of a comma-separated list of language tags. For example:

Accept-Language: en-US, fr-CA, fr-FR

means that the reader would accept:

1. English as spoken in the United States (most preferred)
2. French as spoken in Canada
3. French as spoken in France (least preferred)

We're writing a server that needs to return content in an acceptable language for the requester, and we want to make use of this header. Our server doesn't support every possible language that might be requested (yet!), but there is a set of languages that we do support. 

Write a function that receives two arguments:
an Accept-Language header value as a string and a set of supported languages, and returns the list of language tags that will work for the request. The language tags should be returned in descending order of preference (the same order as they appeared in the header).

In addition to writing this function, you should use tests to demonstrate that it's correct, either via an existing testing system or one you create.

Examples:

parse_accept_language(
  "en-US, fr-CA, fr-FR",  # the client's Accept-Language header, a string
  ["fr-FR", "en-US"]      # the server's supported languages, a set of strings
)
returns: ["en-US", "fr-FR"]

parse_accept_language("fr-CA, fr-FR", ["en-US", "fr-FR"])
returns: ["fr-FR"]

parse_accept_language("en-US", ["en-US", "fr-CA"])
returns: ["en-US"]
*/

const parse_accept_language_partOne = (str, arr) => {
    const result = [];
    const headerValues = str.split(',').map(value => value.trim());
    // return headerValues.filter(header => arr.includes(header));
    
    for (let i = 0; i < headerValues.length; i++) {
      // if (arr.indexOf(headerValues[i]) >= 0) {
      if (arr.includes(headerValues[i])) {
        result.push(headerValues[i]);
      }
    }
  
    return result;
    }
  
  /*
  Part 2
  
  Accept-Language headers will often also include a language tag that is not region-specific - for example, a tag of "en" means "any variant of English". Extend your function to support these language tags by letting them match all specific variants of the language.
  
  Examples:
  
  parse_accept_language("en", ["en-US", "fr-CA", "fr-FR"])
  returns: ["en-US"]
  
  parse_accept_language("fr", ["en-US", "fr-CA", "fr-FR"])
  returns: ["fr-CA", "fr-FR"]
  
  parse_accept_language("fr-FR, fr", ["en-US", "fr-CA", "fr-FR"])
  returns: ["fr-FR", "fr-CA"]
  */
  
  const parse_accept_language_partTwo = (str, arr) => {
    const headerValues = str.split(',').map(value => value.trim());
  
    const map = {};
    headerValues.forEach(value => map[value] = []);
  
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const start = current.split('-')[0];
      if (map[current]) {
        map[current].push(current);
      }else if (map[start]) {
        map[start].push(current);
      }
    }
  
    return Object.values(map).flat();
  }
  
  /*
  Part 3
  
  Accept-Language headers will sometimes include a "wildcard" entry, represented by an asterisk, which means "all other languages". Extend your function to support the wildcard entry.
  
  Examples:
  
  parse_accept_language("en-US, *", ["en-US", "fr-CA", "fr-FR"])
  returns: ["en-US", "fr-CA", "fr-FR"]
  
  parse_accept_language("fr-FR, fr, *", ["en-US", "fr-CA", "fr-FR"])
  returns: ["fr-FR", "fr-CA", "en-US"]
  */
  
  const parse_accept_language_partThree = (str, arr) => {
    const headerValues = str.split(',').map(value => value.trim());
  
    const map = {};
    headerValues.forEach(value => map[value] = []);
  
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const start = current.split('-')[0];
      if (map[current]) {
        map[current].push(current);
      }else if (map[start]) {
        map[start].push(current);
      } else if (map['*']) {
        map['*'].push(current);
      }
    }
  
    return Object.values(map).flat();
  }
  
  /*
  Part 4
  
  Accept-Language headers will sometimes include explicit numeric weights (known as q-factors) for their entries, which are used to designate certain language tags as specifically undesired. For example:
  
  Accept-Language: fr-FR;q=1, fr;q=0.5, fr-CA;q=0
  
  This means that the reader most prefers French as spoken in France, will take any variant of French after that, but specifically wants French as spoken in Canada only as a last resort. Extend your function to parse and respect q-factors.
  
  Examples:
  
  parse_accept_language("fr-FR;q=1, fr-CA;q=0, fr;q=0.5", ["fr-FR", "fr-CA", "fr-BG"])
  returns: ["fr-FR", "fr-BG", "fr-CA"]
  
  parse_accept_language("fr-FR;q=1, fr-CA;q=0, *;q=0.5", ["fr-FR", "fr-CA", "fr-BG", "en-US"])
  returns: ["fr-FR", "fr-BG", "en-US", "fr-CA"]
  
  parse_accept_language("fr-FR;q=1, fr-CA;q=0.8, *;q=0.5", ["fr-FR", "fr-CA", "fr-BG", "en-US"])
  */
  
  const parse_accept_language = (str, arr) => {  
    const headerValues = str.split(',').map(value => value.trim());
    const map = {};
    const weights = {};
  
    headerValues.forEach(value => {
      const parts = value.split(';');
      const language = parts[0];
      // const weight = 10 - parts[1].split('=')[1] * 10;
      const weight = parts[1].split('=')[1];
      map[language] = [];
      weights[language] = weight;
    });
  
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const start = current.split('-')[0];
      if (map[current]) {
        map[current].push(current);
      }else if (map[start]) {
        map[start].push(current);
      } else {
        map['*'].push(current);
      }
    }
  
    const getWeight = (value) => {
      if (weights[value] >= 0) return weights[value];
      if (weights[value.split('-')[0]] >= 0) return weights[value.split('-')[0]];
      if (weights['*'] >= 0) return weights['*'];
      return -1; 
    }
  
    const result = Object.values(map).flat().sort((a, b) => {
      // return getWeight(a) - getWeight(b);
      return getWeight(b) - getWeight(a);
    });
  
    return result;
  }
  
  // npx jest algorithms/misc/languageheaders.js
  describe('parse_accept_language_partOne', () => {
    test('parse_accept_language_partOne()', () => {
      expect(parse_accept_language_partOne("en-US, fr-CA, fr-FR", ["fr-FR", "en-US"])).toEqual(["en-US", "fr-FR"]);
      expect(parse_accept_language_partOne("fr-CA, fr-FR", ["en-US", "fr-FR"])).toEqual(["fr-FR"]);
      expect(parse_accept_language_partOne("en-US", ["en-US", "fr-CA"])).toEqual(["en-US"]);
      expect(parse_accept_language_partOne('', [])).toEqual([]);
      expect(parse_accept_language_partOne("en-US, fr-CA, fr-FR", ["de-GE"])).toEqual([]);
      expect(parse_accept_language_partOne("fr-CA, de-GE", ["fr-FR", "en-US"])).toEqual([]);
    });
  
    test('parse_accept_language_partTwo()', () => {
      expect(parse_accept_language_partTwo("en", ["en-US", "fr-CA", "fr-FR"])).toEqual(["en-US"]);
      expect(parse_accept_language_partTwo("fr", ["en-US", "fr-CA", "fr-FR"])).toEqual(["fr-CA", "fr-FR"]);
      expect(parse_accept_language_partTwo("fr-FR, fr", ["en-US", "fr-CA", "fr-FR"])).toEqual(["fr-FR", "fr-CA"]);
    });
  
    test('parse_accept_language_partThree()', () => {
      expect(parse_accept_language_partThree("en-US, *", ["en-US", "fr-CA", "fr-FR"])).toEqual(["en-US", "fr-CA", "fr-FR"]);
      expect(parse_accept_language_partThree("fr-FR, fr, *", ["en-US", "fr-CA", "fr-FR"])).toEqual(["fr-FR", "fr-CA", "en-US"]);
    });
  
    test('parse_accept_language()', () => {
      expect(parse_accept_language("fr-FR;q=1, fr-CA;q=0, fr;q=0.5", ["fr-FR", "fr-CA", "fr-BG"])).toEqual(["fr-FR", "fr-BG", "fr-CA"]);
      expect(parse_accept_language("fr-FR;q=1, fr-CA;q=0, *;q=0.5", ["fr-FR", "fr-CA", "fr-BG", "en-US"])).toEqual(["fr-FR", "fr-BG", "en-US", "fr-CA"]);
      expect(parse_accept_language("fr-FR;q=1, fr-CA;q=0.8, *;q=0.5", ["fr-FR", "fr-CA", "fr-BG", "en-US"])).toEqual(["fr-FR", "fr-CA", "fr-BG", "en-US"]);
    });
  });
  