module.exports = function getHeaders(options) {
  return !!options.headers
    ? options.headers.split(';').reduce((acc, pair) => {
        const [key, value] = pair.split(':');
        if (key.trim() === '' || value.trim() === '') return acc;

        acc[key.trim()] = value.trim();
        return acc;
      }, {})
    : {};
};
