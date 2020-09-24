const { where } = require("../data/db-config.js");
const db = require("../data/db-config.js");

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes").where({ id }).first();
}

function findSteps(scheme_id) {
    return db("steps")
        .where({ scheme_id })
        .join("schemes", "steps.scheme_id", "schemes.id")
        .select(
            "steps.id",
            "schemes.scheme_name",
            "steps.step_number",
            "steps.instructions"
        )
        .orderBy("steps.step_number");
}

function add(scheme) {
    return db("schemes").insert(scheme);
}

function update(changes, id) {
    return db("schemes").where({ id }).update(changes);
}

function remove(id) {
    return db("schemes").where({ id }).del();
}

function addStep(step, scheme_id) {
    return db("steps").insert({ ...step, scheme_id });
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep,
};