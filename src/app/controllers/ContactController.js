const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(req, res) {
    // List all records
    const contacts = await ContactsRepository.findAll();

    res.json(contacts);
  }

  async show(req, res) {
    // Get ONE record
    const { id } = req.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return res.status(404).json({ error: "User not found" });
    }

    res.json(contact);
  }

  store() {
    // Create a record
  }

  update() {
    // Edit a record
  }

  async delete(req, res) {
    // Delete a record
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return res.status(404).json({ error: "User not found" });
    }

    await ContactsRepository.delete(id);
    // 204: No Content
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
