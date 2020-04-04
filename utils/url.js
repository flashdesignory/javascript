/*
 * @title: getUrlParam
 * @description: function to retrieve url parm by name
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const getUrlParam = (name) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === name) {
      return pair[1];
    }
  }
  return '';
};

const getUrlParameter = (name) => {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

test('utils.url', () => {
  delete window.location;
  window.location = { search: '?q=javascript' };
  expect(getUrlParam('q')).toEqual('javascript');
  expect(getUrlParameter('q')).toEqual('javascript');
  expect(getUrlParam('f')).toEqual('');
  expect(getUrlParameter('f')).toEqual('');
});
