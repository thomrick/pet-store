"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
const cat_id_1 = require("./cat.id");
const cat_information_1 = require("./cat.information");
const cat_model_1 = require("./cat.model");
describe('CatModel', () => {
    const id = cat_id_1.CatId.create();
    const information = new cat_information_1.CatInformation('name');
    let model;
    beforeEach(() => {
        model = new cat_model_1.CatModel();
    });
    it('should create a model with an empty state', () => {
        expect(model.id).toBeUndefined();
        expect(model.name).toBeUndefined();
        expect(model.isAdopted).toBeFalsy();
    });
    it('should apply register', () => {
        model.state().apply(new events_1.CatRegistered(id, information));
        expect(model.id).toEqual(id);
        expect(model.name).toEqual(information.name);
        expect(model.isAdopted).toBeFalsy();
    });
    it('should apply adopt', () => {
        model.state().apply(new events_1.CatRegistered(id, information));
        model.state().apply(new events_1.CatAdopted(id));
        expect(model.isAdopted).toBeTruthy();
    });
});
