import { UserManager, WebStorageStateStore, User } from "oidc-client";

export default class AuthService {
    private userManager: UserManager;

    constructor() {
        const AUTH0_DOMAIN: string = "https://jerrie.auth0.com";

        const settings: any = {
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            authority: AUTH0_DOMAIN,
            client_id: "dnphgXcg0zeYBOCWwnRW8Xhq8Oif9A06",
            redirect_uri: "http://localhost:8080/callback.html",
            response_type: "id_token token",
            scope: "openid profile email",
            post_logout_redirect_uri: "http://localhost:8080/",
            filterProtocolClaims: true,
            metadata: {
                issuer: AUTH0_DOMAIN + "/",
                authorization_endpoint: AUTH0_DOMAIN + "/authorize",
                userinfo_endpoint: AUTH0_DOMAIN + "/userinfo",
                end_session_endpoint: AUTH0_DOMAIN + "/v2/logout",
                jwks_uri: AUTH0_DOMAIN + "/.well-known/jwks.json",
            }
        };

        this.userManager = new UserManager(settings);
    }

    public getUser(): Promise<User> {
        return this.userManager.getUser();
    }

    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }

    public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }

    public async isLoggedIn(): Promise<boolean> {
        const user: User = await this.getUser();

        return (user !== null && !user.expired);
    }
}