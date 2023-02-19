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
        path: '/notes',
        handler: addNoteController,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesController,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdController
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: putNoteController,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdController,
    },
];

module.exports = routes;