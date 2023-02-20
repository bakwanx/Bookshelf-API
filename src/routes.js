const { 
    addNoteController, 
    getAllNotesController, 
    getNoteByIdController,
    putNoteController,
    deleteNoteByIdController, 
} = require("./controller/book_controller");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addNoteController,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllNotesController,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getNoteByIdController
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: putNoteController,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteNoteByIdController,
    },
];

module.exports = routes;