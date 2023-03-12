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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const axios = require("axios");
const { MANAGEMENT_API_CLIENT, MANAGEMENT_API_SECRET, MANAGEMENT_API_AUDIENCE, AUTH0_DOMAIN, } = process.env;
class UserService {
    constructor() {
        this.domain = AUTH0_DOMAIN;
        this.client_id = MANAGEMENT_API_CLIENT;
        this.secret = MANAGEMENT_API_SECRET;
        this.audience = MANAGEMENT_API_AUDIENCE;
    }
    getUserInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://${this.domain}/api/v2/users/${userId}`;
            const headers = {
                Authorization: `Bearer ${yield this.getManagementApiToken()}`,
                "Content-Type": "application/json",
            };
            const response = yield axios.get(url, { headers });
            return response.data;
        });
    }
    updateUserInfo(userId, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://${this.domain}/api/v2/users/${userId}`;
            const headers = {
                Authorization: `Bearer ${yield this.getManagementApiToken()}`,
                "Content-Type": "application/json",
            };
            const data = { user_metadata: updatedUser };
            const response = yield axios.patch(url, data, { headers });
            return response.data;
        });
    }
    getManagementApiToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://${this.domain}/oauth/token`;
            const data = {
                grant_type: "client_credentials",
                client_id: this.client_id,
                client_secret: this.secret,
                audience: `https://${this.domain}/api/v2/`,
            };
            const response = yield axios.post(url, data);
            return response.data.access_token;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map