"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CatRegistered {
    constructor(id, information) {
        this.name = CatRegistered.name;
        this.id = id;
        this.information = information;
    }
    apply(aggregate) {
        return aggregate.apply(this);
    }
}
exports.CatRegistered = CatRegistered;
