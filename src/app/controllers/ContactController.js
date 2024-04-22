class ContactController {
  index(req, res) {
    // List all records
    res.send("Send from Contact Controller ");
  }

  show() {
    // Get ONE record
  }

  store() {
    // Create a record
  }

  update() {
    // Edit a record
  }

  delete() {
    // Delete a record
  }
}

module.exports = new ContactController();
