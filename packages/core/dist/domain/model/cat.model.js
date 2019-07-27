"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
class CatModel {
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get isAdopted() {
        return this._adopted;
    }
    state() {
        return new class StateApplier {
            constructor(model) {
                this.model = model;
            }
            apply(event) {
                switch (event.name) {
                    case events_1.CatRegistered.name:
                        return this.applyCatRegistered(event);
                    case events_1.CatAdopted.name:
                        return this.applyCatAdopted(event);
                    default:
                        return this.model;
                }
            }
            applyCatRegistered(event) {
                this.model._id = event.id;
                this.model._name = event.information.name;
                this.model._adopted = false;
                return this.model;
            }
            applyCatAdopted(_) {
                this.model._adopted = true;
                return this.model;
            }
            applyRegister(id, information) {
                this.model._id = id;
                this.model._name = information.name;
                this.model._adopted = false;
                return this.model;
            }
            applyAdopt() {
                this.model._adopted = true;
                return this.model;
            }
        }(this);
    }
}
exports.CatModel = CatModel;
