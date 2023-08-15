import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export default class TokenService {

    static createToken(payload) {
        const token = jwt.sign(payload, SECRET);
        return token;
    }

    static decryptToken(token) {
        const decodedToken = jwt.verify(token, SECRET);
        return decodedToken;
    }
}