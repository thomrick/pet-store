"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("../queries");
const find_all_cats_query_handler_1 = require("./find-all-cats.query-handler");
describe('FindAllCatsQueryHandler', () => {
    it('should find all cats from repository', () => {
        const repository = {
            get: jest.fn(),
            getAll: jest.fn().mockImplementationOnce(() => []),
            save: jest.fn(),
        };
        const handler = new find_all_cats_query_handler_1.FindAllCatsQueryHandler(repository);
        const result = handler.handle(new queries_1.FindAllCats());
        expect(repository.getAll).toHaveBeenCalled();
        expect(result.data).toEqual([]);
    });
});
