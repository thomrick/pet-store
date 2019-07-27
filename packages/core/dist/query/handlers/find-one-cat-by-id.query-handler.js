"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("../queries");
const query_results_1 = require("../query-results");
class FindOneCatByIdQueryHandler {
    constructor(repository) {
        this.repository = repository;
    }
    handle(query) {
        return new query_results_1.FindOneCatQueryResult(this.repository.get(query.id));
    }
    subscribe() {
        return queries_1.FindOneCatById.name;
    }
}
exports.FindOneCatByIdQueryHandler = FindOneCatByIdQueryHandler;
