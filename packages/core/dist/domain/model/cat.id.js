"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("uuid/v1"));
class CatId {
    static create() {
        return new CatId(v1_1.default());
    }
    static from(value) {
        return new CatId(value);
    }
    constructor(value) {
        this.value = value;
    }
}
exports.CatId = CatId;
