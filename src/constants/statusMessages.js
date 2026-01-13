
const MESSAGES_OPERATION= Object.freeze({
    SUCCESFUL_OPERATION:"Successful Operation",
    NOTE_CREATED:"Note created successfully",
    NOTE_UPDATED:"Note updated successfully",
    NOTE_DELETED:"Note deleted successfullt",
    TITTLE_REQUIRED:"Title is required",
    SERVER_ERROR:"Internal Server Error",
    URL_NO_FOUND:(url)=>`Path: ${url}, no Found`
});
const MESSAGES_VALIDATION=({
    TTTLE_TOO_LONG:"Title must be 200 chareacters or less",
    CONTENT_REQUIRED:"Content is required",
    CONTENT_TOO_LONG:"Content must be 200 chareacters or less",
    ID_POSITIVE:"ID Value  just must be an Positive Integer",
    ID_INVALID_FORMAT:"Invalid ID format"
});
module.exports={
    MESSAGES_OPERATION,
    MESSAGES_VALIDATION
}