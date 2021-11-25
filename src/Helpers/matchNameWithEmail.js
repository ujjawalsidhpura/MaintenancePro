export function matchNameWithEmail(name, email) {
  const username = email.split("@")[0];
  for (const char of name) {
    if (!username.includes(char.toLowerCase())) return false
  }
  return true;
}

// name = Shuhao Zhang email = shuhao.qgg.zhang@gmail.com return true

