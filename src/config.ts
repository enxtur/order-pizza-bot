export const config = {
  port: process.env.PORT || 3000,
  webhookVerifyToken: process.env.VERIFY_TOKEN || 'verify_token',
  pageAccessToken: process.env.PAGE_ACCESS_TOKEN || 'page_access_token',
  appSecret: process.env.APP_SECRET || 'app_secret',
}