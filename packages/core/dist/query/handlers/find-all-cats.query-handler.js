"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("../queries");
const query_results_1 = require("../query-results");
class FindAllCatsQueryHandler {
    constructor(repository) {
        this.repository = repository;
    }
    handle(_) {
        return new query_results_1.FindAllCatsQueryResult(this.repository.getAll());
    }
    subscribe() {
        return queries_1.FindAllCats.name;
    }
}
exports.FindAllCatsQueryHandler = FindAllCatsQueryHandler;
