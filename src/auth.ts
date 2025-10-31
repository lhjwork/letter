import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.nickname,
          email: profile.email,
          image: profile.profile_image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        // 네이버에서 제공하지 않는 정보는 제거
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
