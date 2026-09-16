const c = require("ansi-colors");

const DEFAULT_KEY = "pk_b8e3def8a11e2bb7a71766f316810de8740a75d1cb42768c192d810d43ef5027";

function checkEnvVariables() {
  if (!process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
    console.warn(
      c.yellow(`⚠️ NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY not found in environment, using default key.`)
    );
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY = DEFAULT_KEY;
  }
}

module.exports = checkEnvVariables;

