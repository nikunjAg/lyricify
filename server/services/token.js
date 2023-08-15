import jwt from 'jsonwebtoken';

export default class TokenService {
    static decryptToken(token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    }
}