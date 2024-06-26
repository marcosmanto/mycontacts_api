const { response } = require("express");
const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(req, res) {
    // List all records
    const { orderBy } = req.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    res.json(contacts);
  }

  async show(req, res) {
    // Get ONE record
    try {
      const { id } = req.params;
      const contact = await ContactsRepository.findById(id);

      return res.json(contact);
    } catch (error) {
      //console.log(error);
      return res.status(404).json({ error: "User not found" });
    }
  }

  async store(req, res) {
    // Create a record
    const { name, email, phone, category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: "This e-mail is already in use" });
    }

    const contact = await ContactsRepository.create(
      name,
      email,
      phone,
      category_id,
    );

    res.json(contact);
  }

  async update(req, res) {
    // Edit a record
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const contactEmailExists = await ContactsRepository.findByEmail(email);

    if (contactEmailExists && contactEmailExists.id !== id) {
      return res.status(400).json({ error: "This e-mail is already in use" });
    }

    try {
      const contact = await ContactsRepository.update(id, {
        name,
        email,
        phone,
        category_id,
      });

      res.json(contact);
    } catch (error) {
      res.status(400).json({ error: "Bad request" });
    }
  }

  async delete(req, res) {
    // Delete a record
    const { id } = req.params;

    /* No need to search user before delete
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return res.status(404).json({ error: "User not found" });
    }*/

    await ContactsRepository.delete(id);
    // 204: No Content
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
