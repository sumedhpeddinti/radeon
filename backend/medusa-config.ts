import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: process.env.DATABASE_URL?.includes('localhost')
      ? {}
      : { connection: { ssl: { rejectUnauthorized: false } } },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  modules: [
    {
      resolve: '@medusajs/medusa/file-local',
      options: {
        backend_url: `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'https://radeon-hphbfha8emfthkbf.eastasia-01.azurewebsites.net'}/static`,
      },
    },
  ],
})
