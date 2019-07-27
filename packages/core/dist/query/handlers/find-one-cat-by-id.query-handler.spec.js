"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const queries_1 = require("../queries");
const find_one_cat_by_id_query_handler_1 = require("./find-one-cat-by-id.query-handler");
describe('FindOneCatByIdQueryHandler', () => {
    let repository;
    let handler;
    beforeEach(() => {
        repository = {
            get: jest.fn(),
            getAll: jest.fn(),
            save: jest.fn(),
        };
        handler = new find_one_cat_by_id_query_handler_1.FindOneCatByIdQueryHandler(repository);
    });
    it('should find the cat from the repository', () => {
        const aggregate = domain_1.CatAggregate.register(new domain_1.CatInformation('name'));
        repository.get.mockImplementationOnce(() => aggregate);
        const result = handler.handle(new queries_1.FindOneCatById(aggregate.model.id));
        expect(repository.get).toHaveBeenCalledWith(aggregate.model.id);
        expect(result.data).toEqual(aggregate);
    });
});
