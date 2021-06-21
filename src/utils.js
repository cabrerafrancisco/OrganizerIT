
function verError(err) {
  console.log("------- ERRROOOOOOOOOOOOORRRRRR -------");
  console.log(err);
}

function formatNotesForView(dbNotes) {
  return {
    id: dbNotes._id.toString(),
    title: dbNotes.title,
    description: dbNotes.description,
  };
}
function formatNotesListForView(dbNotesList) {
  const formattedList = dbNotesList.map((dbNotes) => {
    return formatNotesForView(dbNotes);
  });
  return formattedList;
}
function isValidNoteData(data) {
    if (!data.title) return false;
    if (!data.description) return false;
    // No errors
    return true;
}

module.exports = {
  error: verError,
  formatNotesForView,
  formatNotesListForView,
  isValidNoteData,
};
