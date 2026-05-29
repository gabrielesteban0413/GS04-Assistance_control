import {
    SignJWT,
    jwtVerify,
    importSPKI,
    type JWTPayload,
    decodeJwt,
} from 'jose';

const { JWT_ISSUER, JWT_SECRET } = Bun.env;
const secret = new TextEncoder().encode(JWT_SECRET)

export class JWT {
    decode = <T>(token: string): T => decodeJwt(token);

    verify = async <T>(token: string): Promise<T> => {
        const { payload } = await jwtVerify(token, secret);
        return payload as T;
    };
    create = async <T>(
        payload: T
    ): Promise<string> => {
        const token = await new SignJWT({ ...payload } as JWTPayload)
            .setProtectedHeader({
                alg: 'HS256'
            })
            .setIssuedAt()
            .setIssuer(JWT_ISSUER!)
            .setExpirationTime("1d")
            .sign(secret);

        return `Bearer ${token}`;
    };
}

export const jwtTool = new JWT();
