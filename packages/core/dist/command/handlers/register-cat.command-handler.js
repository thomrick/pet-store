"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const command_results_1 = require("../command-results");
const commands_1 = require("../commands");
class RegisterCatCommandHandler {
    constructor(repository) {
        this.repository = repository;
    }
    handle(command) {
        const aggregate = domain_1.CatAggregate.register(command.information);
        this.repository.save(aggregate);
        return new command_results_1.CatCommandResult(aggregate);
    }
    subscribe() {
        return commands_1.RegisterCat.name;
    }
}
exports.RegisterCatCommandHandler = RegisterCatCommandHandler;
