"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const commands_1 = require("../commands");
const register_cat_command_handler_1 = require("./register-cat.command-handler");
describe('RegisterCatCommandHandler', () => {
    it('should save the registered cat', () => {
        const repository = {
            get: jest.fn(),
            getAll: jest.fn(),
            save: jest.fn(),
        };
        const handler = new register_cat_command_handler_1.RegisterCatCommandHandler(repository);
        const result = handler.handle(new commands_1.RegisterCat(new domain_1.CatInformation('name')));
        expect(repository.save).toHaveBeenCalledWith(jasmine.any(domain_1.CatAggregate));
        expect(result.data.model).toEqual({
            _id: jasmine.any(domain_1.CatId),
            _name: 'name',
            _adopted: false,
        });
    });
});
