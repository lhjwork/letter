import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("[Auth] JWT Callback - Account:", account);
      console.log("[Auth] JWT Callback - Profile:", profile);
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("[Auth] Session Callback - Token:", token);
      console.log("[Auth] Session Callback - Session:", session);
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  debug: true, // 디버깅 모드 활성화
});
