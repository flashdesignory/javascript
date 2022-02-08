const isEqualOne = (a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (!b.includes(a[i])) {
        return false;
      }
    }
  
    return true;
  }
  
  const isEqualTwo = (a, b) => {
    return a.sort().join(',') === b.sort().join(',');
  }
  
  const isEqualThree = (a, b) => { 
    return Array.isArray(a) && 
           Array.isArray(b) && 
           a.length === b.length && 
           a.every((value, index) => value === b[index]);
  }
  
  // npx jest algorithms/array/array.isEqual.js
  describe('version1: find arrays with equal values', () => {
    const plans = [
      { componentIds: [1, 2, 15, 16]},
      { componentIds: [1, 15, 16]},
      { componentIds: [1, 15]}
    ]
  
    const componentIds = [1, 15, 16];
  
    it('should return the correct output', () => {
      const getPlan = (plans, ids) => {
        for (let i = 0; i < plans.length; i++) {
          if (isEqualOne(plans[i].componentIds, ids)) {
            return plans[i];
          }
        }
        return [];
      }
  
      const actual = getPlan(plans, componentIds);
      const expected = { componentIds: [1, 15, 16]};
      expect(actual).toEqual(expected)
    });
  
    it('should return the correct output', () => {
      const getPlan = (plans, ids) => {
        return plans.find(plan => isEqualTwo(plan.componentIds, ids));
      }
  
      const actual = getPlan(plans, componentIds);
      const expected = { componentIds: [1, 15, 16]};
      expect(actual).toEqual(expected)
    });
  
    it('should return the correct output', () => {
      const getPlan = (plans, ids) => {
        return plans.find(plan => isEqualThree(plan.componentIds, ids));
      }
  
      const actual = getPlan(plans, componentIds);
      const expected = { componentIds: [1, 15, 16]};
      expect(actual).toEqual(expected)
    });
  });
  