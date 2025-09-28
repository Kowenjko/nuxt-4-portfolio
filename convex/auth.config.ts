const authConfig = {
  providers: [
    {
      // domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      domain: 'https://normal-macaque-87.clerk.accounts.dev',
      applicationID: 'convex',
    },
  ],
}

export default authConfig
