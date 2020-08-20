  function save(x) {
    console.log(" DOES THIS WORK ? ");
    let entry = {
      text: document.querySelector("#editorInput").value,
      index: 0,
      date: new Date()
    }

    return entry;

  }

  module.exports = save;