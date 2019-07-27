"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const command_results_1 = require("../command-results");
const commands_1 = require("../commands");
class AdoptCatCommandHandler {
    constructor(repository) {
        this.repository = repository;
    }
    handle(command) {
        const aggregate = this.repository.get(command.id);
        if (aggregate === null) {
            throw new domain_1.CatNotFoundException(command.id);
        }
        aggregate.adopt();
        this.repository.save(aggregate);
        return new command_results_1.CatCommandResult(aggregate);
    }
    subscribe() {
        return commands_1.AdoptCat.name;
    }
}
exports.AdoptCatCommandHandler = AdoptCatCommandHandler;
