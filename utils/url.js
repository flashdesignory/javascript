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
  return null;
};

const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

console.log(getUrlParam('q'));
console.log(getUrlParameter('q'));
