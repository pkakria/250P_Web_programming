"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInfo = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var rawInfo = fs_1.default.readFileSync(path_1.default.join(__dirname, "../serverInfo.json"), 'utf-8');
exports.serverInfo = JSON.parse(rawInfo);
//# sourceMappingURL=ServerInfo.js.map