"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
const exceptions_1 = require("../exceptions");
const model_1 = require("../model");
class CatAggregate {
    constructor(id, information) {
        this._uncommittedChanges = [];
        this._model = new model_1.CatModel();
        if (!!id && !!information) {
            const event = new events_1.CatRegistered(id, information);
            this.apply(event);
            this.save(event);
        }
    }
    static register(information) {
        return new CatAggregate(model_1.CatId.create(), information);
    }
    static rebuild(events) {
        return events.reduce((aggregate, event) => event.apply(aggregate), new CatAggregate());
    }
    adopt() {
        if (this._model.isAdopted) {
            throw new exceptions_1.CatAlreadyAdoptedException(this._model.id);
        }
        const event = new events_1.CatAdopted(this._model.id);
        this.apply(event);
        this.save(event);
    }
    get model() {
        return this._model;
    }
    apply(event) {
        this._model.state().apply(event);
        return this;
    }
    save(event) {
        this._uncommittedChanges.push(event);
    }
    get uncommittedChanges() {
        return this._uncommittedChanges.splice(0, this._uncommittedChanges.length);
    }
}
exports.CatAggregate = CatAggregate;
