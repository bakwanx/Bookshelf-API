const { addNoteController, getAllNotesHandler } = require("./controller/book_controller");

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteController,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
];

module.exports = routes;