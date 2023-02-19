const { nanoid } = require("nanoid");
const notes = require('../database/notes');
const responseApi = require('../../utils/response');

const addNoteController = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage ? true : false;
    if(name == null){
        const response = h.response(responseApi(
            "fail",
            "Gagal menambahkan buku. Mohon isi nama buku",
            null
        ));
        response.code(400);
        return response;
    }
    
    if(readPage > pageCount){
        const response = h.response(responseApi(
            "fail",
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
            null
        ));
        response.code(400);
        return response;
    }
    const newNote = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    };
    notes.push(newNote);
    const isSuccess = notes.filter((note) => note.id === id);
   
    if(isSuccess){
        const response = h.response(responseApi(
            "success",
            "Buku berhasil ditambahkan",
            {
                bookId: id
            }
        ));
        response.code(201);
        return response;
    }
   
    const response = h.response(responseApi(
        "fail",
        "Buku gagal ditambahkan",
        null
    ));
    response.code(404);
    return response;
}

const getAllNotesController = () => {
    return responseApi(
        "success",
        "success get data",
        {
            books: notes.map(({ id, name, publisher}) => ({id, name, publisher}))
        }
    );
}

const getNoteByIdController = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((n) => n.id === id)[0];
    
    if(note !== undefined){
        const response = h.response(responseApi(
            "success",
            "Buku ditemukan",
            {
                book: note
            }
        ));
        response.code(200);
        return response;
    }

    const response = h.response(responseApi(
        "fail",
        "Buku tidak ditemukan",
        null
    ));
    response.code(404);
    return response;
};

const putNoteController = (request, h) => {
    const { id } = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;
    const updatedAt = new Date().toISOString();
    const finished = pageCount === readPage ? true : false;
    if(name == null){
        const response = h.response(responseApi(
            "fail",
            "Gagal memperbarui buku. Mohon isi nama buku",
            null
        ));
        response.code(400);
        return response;
    }
    
    if(readPage > pageCount){
        const response = h.response(responseApi(
            "fail",
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
            null
        ));
        response.code(400);
        return response;
    }

    const index = notes.findIndex((note) => note.id === id);
    if(index !== -1){
        notes[index] = {
            ...notes[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt
        };
        const response = h.response(responseApi(
            "success",
            "Buku berhasil diperbarui",
            null
        ));
        response.code(200);
        return response;
    }
    
    const response = h.response(responseApi(
        "fail",
        "Gagal memperbarui buku. Id tidak ditemukan",
        null
    ));
    response.code(404);
    return response;
}

const deleteNoteByIdController = (request, h) => {
    const { id } = request.params;  
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
          status: "success",
          message: "Buku berhasil dihapus",
        });
        response.code(200);
        return response;
    }

    const response = h.response(responseApi(
        "fail",
        "Buku gagal dihapus. Id tidak ditemukan",
        null
    ));
    response.code(404);
    return response;
};


module.exports = {
    addNoteController, 
    getAllNotesController,
    getNoteByIdController,
    putNoteController,
    deleteNoteByIdController
}