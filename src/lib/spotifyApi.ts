import { AuthorizationEndpointHandler } from "next-auth/providers/oauth";

interface SpotifyApiConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
  accessToken?: string;
  refreshToken?: string;
}

/**
 * Classe que faz a comunicaçao com os Endpoints da API do Spotify
 * 
 * @class SpotifyApi
 * 
 * @reference https://developer.spotify.com/documentation/web-api
 */
class SpotifyApi {
  protected clientId: string;
  protected clientSecret: string;
  protected accessToken?: string;
  protected refreshToken?: string;

  constructor(config: SpotifyApiConfig) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.accessToken = config.accessToken;
    this.refreshToken = config.refreshToken;
  }


}

export function createSpotifyApiInstance(accessToken?: string, refreshToken?: string) {
  return new SpotifyApi({
    clientId: process.env.SPOTIFY_CLIENT_ID!,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    accessToken,
    refreshToken,
  });
}

/**
 * {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: "user-read-email user-read-private",
        },
      },
 */