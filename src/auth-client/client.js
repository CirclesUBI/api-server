"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var Client = (function () {
    function Client(appId, issuer) {
        this._issuer = issuer;
        this._appId = appId;
    }
    Client.getKey = function (kid) {
        return __awaiter(this, void 0, void 0, function () {
            var downloadedKey, minLastUsed_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Client._cacheLookupCounter++;
                        if (Client._keyCache[kid]) {
                            Client._keyCache[kid].lastUsed = new Date();
                            return [2, Client._keyCache[kid].key];
                        }
                        return [4, cross_fetch_1.default(kid).then(function (data) { return data.json(); })];
                    case 1:
                        downloadedKey = _a.sent();
                        if (Client._cacheLookupCounter % Client._cacheCleanupAfterXLookups == 0) {
                            Client._cacheLookupCounter = 0;
                            minLastUsed_1 = Date.now() - Client._maxCacheAgeInMs;
                            Object.keys(Client._keyCache).forEach(function (kid) {
                                if (Client._keyCache[kid].lastUsed.getTime() < minLastUsed_1) {
                                    delete Client._keyCache[kid];
                                }
                            });
                        }
                        Client._keyCache[kid] = {
                            lastUsed: new Date(),
                            key: downloadedKey
                        };
                        return [2, downloadedKey];
                }
            });
        });
    };
    Client.prototype.verify = function (jwt) {
        return __awaiter(this, void 0, void 0, function () {
            var now, tokenPayload, kid, key, pubKey, verifiedPayload, iss, aud, audAppId, sub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        tokenPayload = jsonwebtoken_1.default.decode(jwt);
                        if (!tokenPayload
                            || !tokenPayload.iss
                            || !tokenPayload.sub
                            || !tokenPayload.aud) {
                            throw new Error("Couldn't decode the jwt");
                        }
                        kid = tokenPayload.kid;
                        if (!kid)
                            throw new Error("No key id (kid) claim.");
                        return [4, Client.getKey(kid)];
                    case 1:
                        key = _a.sent();
                        pubKey = key.data.keys.publicKey;
                        if (!pubKey)
                            throw new Error("Couldn't fetch the public key to verify the jwt");
                        if (new Date(key.data.keys.validTo) < new Date(now.getTime() - 500)) {
                            throw new Error("The signing key is invalid since more than 500 ms.");
                        }
                        verifiedPayload = jsonwebtoken_1.default.verify(jwt, pubKey);
                        if (!verifiedPayload)
                            throw new Error("The received jwt couldn't be verified.");
                        iss = tokenPayload.iss;
                        if (!iss)
                            throw new Error("No issuer (iss) claim.");
                        if (iss !== this._issuer)
                            throw new Error("The issuer must match the _authUrl (is: " + iss + "; should be:" + this._issuer + ")");
                        aud = tokenPayload.aud;
                        if (typeof aud !== "object")
                            throw new Error("The audience (aud) must be an array.");
                        audAppId = aud[0];
                        if (audAppId != this._appId)
                            throw new Error("The audience of the received jwt doesn't match the configured appId. (is: " + audAppId + "; should be: " + this._appId + ")");
                        sub = tokenPayload.sub;
                        if (!sub)
                            throw new Error("No subject (sub) claim.");
                        return [2, tokenPayload];
                }
            });
        });
    };
    Client._cacheLookupCounter = 0;
    Client._maxCacheAgeInMs = 1000 * 60 * 60 * 24;
    Client._cacheCleanupAfterXLookups = 1000;
    Client._keyCache = {};
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map