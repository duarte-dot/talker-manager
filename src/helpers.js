const tokenGenerator = () => {
  let token = '';

  const tokenLength = 16;

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < tokenLength; i += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
};

module.exports = {
  tokenGenerator,
};