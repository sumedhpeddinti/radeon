import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: process.env.DATABASE_URL?.includes('localhost')
      ? {}
      : { connection: { ssl: { rejectUnauthorized: false } } },
    // Force session cookies so the Admin SPA can authenticate across page navigations
    sessionOptions: {
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: false,       // Nginx handles TLS termination; internal traffic is plain HTTP
        sameSite: 'lax',
        maxAge: 86400000,    // 24 hours
      }
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  }
})
