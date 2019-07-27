"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
const exceptions_1 = require("../exceptions");
const model_1 = require("../model");
const cat_aggregate_1 = require("./cat.aggregate");
describe('CatAggregate', () => {
    let information;
    let aggregate;
    beforeEach(() => {
        information = new model_1.CatInformation('name');
        aggregate = cat_aggregate_1.CatAggregate.register(information);
    });
    it('should register a new aggregate', () => {
        const model = aggregate.model;
        expect(model).toBeInstanceOf(model_1.CatModel);
        expect(model.id).toBeInstanceOf(model_1.CatId);
        expect(model.name).toEqual(information.name);
        expect(aggregate.model.isAdopted).toBeFalsy();
    });
    it('should add a cat registered event', () => {
        expect(aggregate.uncommittedChanges).toContainEqual(new events_1.CatRegistered(aggregate.model.id, information));
    });
    it('should adopt the cat', () => {
        aggregate.adopt();
        expect(aggregate.model.isAdopted).toBeTruthy();
    });
    it('should add a cat adopted event', () => {
        aggregate.adopt();
        expect(aggregate.uncommittedChanges).toContainEqual(new events_1.CatAdopted(aggregate.model.id));
    });
    it('should throw an error caused by cat already adopted', () => {
        aggregate.adopt();
        expect(() => aggregate.adopt()).toThrow(exceptions_1.CatAlreadyAdoptedException);
    });
    it('should rebuild the aggregate from events', () => {
        const id = model_1.CatId.create();
        const events = [
            new events_1.CatRegistered(id, information),
            new events_1.CatAdopted(id),
        ];
        const rebuild = cat_aggregate_1.CatAggregate.rebuild(events);
        const model = rebuild.model;
        expect(model.id).toEqual(id);
        expect(model.name).toEqual(information.name);
        expect(model.isAdopted).toBeTruthy();
    });
});
