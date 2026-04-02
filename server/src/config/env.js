const getEnv = (key, fallback) => {
  const value = process.env[key];
  if (value === undefined || value === '') return fallback;
  return value;
};

module.exports = { getEnv };
