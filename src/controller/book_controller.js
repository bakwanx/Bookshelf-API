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

const getAllNotesHandler = () => {
    return responseApi(
        "success",
        "success get data",
        {
            books: notes
        }
    );
}

module.exports = {
    addNoteController, 
    getAllNotesHandler
}