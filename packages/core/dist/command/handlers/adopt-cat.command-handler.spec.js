"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const commands_1 = require("../commands");
const adopt_cat_command_handler_1 = require("./adopt-cat.command-handler");
describe('AdoptCatCommandHandler', () => {
    let repository;
    let handler;
    beforeEach(() => {
        repository = {
            get: jest.fn(),
            getAll: jest.fn(),
            save: jest.fn(),
        };
        handler = new adopt_cat_command_handler_1.AdoptCatCommandHandler(repository);
    });
    it('should adopt the cat', () => {
        const aggregate = domain_1.CatAggregate.register(new domain_1.CatInformation('name'));
        repository.get.mockImplementationOnce(() => aggregate);
        const result = handler.handle(new commands_1.AdoptCat(aggregate.model.id));
        expect(repository.get).toHaveBeenCalledWith(aggregate.model.id);
        expect(repository.save).toHaveBeenCalledWith(aggregate);
        expect(result.data.model).toEqual({
            _id: jasmine.any(domain_1.CatId),
            _name: 'name',
            _adopted: true,
        });
    });
    it('should throw an error when cat is not found', () => {
        const id = domain_1.CatId.create();
        repository.get.mockImplementationOnce(() => null);
        expect(() => handler.handle(new commands_1.AdoptCat(id))).toThrow(domain_1.CatNotFoundException);
    });
    it('should throw an error when cat is already adopted', () => {
        const aggregate = domain_1.CatAggregate.register(new domain_1.CatInformation('name'));
        jest.spyOn(aggregate, 'adopt').mockImplementationOnce(() => {
            throw new domain_1.CatAlreadyAdoptedException(aggregate.model.id);
        });
        repository.get.mockImplementationOnce(() => aggregate);
        expect(() => handler.handle(new commands_1.AdoptCat(aggregate.model.id))).toThrow(domain_1.CatAlreadyAdoptedException);
    });
});
