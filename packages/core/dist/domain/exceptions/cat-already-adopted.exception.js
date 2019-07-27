"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CatAlreadyAdoptedException extends Error {
    constructor(id) {
        super(`Cat ${id.value} already adopted`);
    }
}
exports.CatAlreadyAdoptedException = CatAlreadyAdoptedException;
