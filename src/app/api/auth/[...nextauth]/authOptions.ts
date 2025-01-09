import { UserProfile } from "@/@types/user";
import { isProd } from "@/utils/environment";
import { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: "user-read-email user-read-private",
        },
      },
      token: "https://accounts.spotify.com/api/token",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: !isProd,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account, user }) {

      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token; 
        token.spotifyUserId = account.id;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub || "",
        avatar_url: session.user?.image || "",
        accessToken: token.accessToken,
      } as UserProfile;
      return session;
    },
  },
};
