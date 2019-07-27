"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CatNotFoundException extends Error {
    constructor(id) {
        super(`Cat ${id.value} can not be found`);
    }
}
exports.CatNotFoundException = CatNotFoundException;
