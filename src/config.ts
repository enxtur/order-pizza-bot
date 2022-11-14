export const config = {
  port: process.env.PORT || 3000,
  webhook: {
    verifyToken: process.env.VERIFY_TOKEN || 'verify_token',
  }
}