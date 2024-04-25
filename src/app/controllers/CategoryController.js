const CategoriesRepository = require("../repositories/CategoriesRepository");

class CategoryController {
  async index(req, res) {
    const categories = await CategoriesRepository.findAll();
    res.send(categories);
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const category = await CategoriesRepository.findById(id);

      return res.send(category);
    } catch (error) {
      // 404: Not Found
      return res.status(404).json({ error: "Category not found" });
    }
  }

  async update(req, res) {
    // Edit a record
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const catNameExists = await CategoriesRepository.findByName(name);

    if (catNameExists && catNameExists.id !== id) {
      return res
        .status(400)
        .json({ error: "This category name is already in use" });
    }

    const category = await CategoriesRepository.update(id, name);

    res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;
    await CategoriesRepository.delete(id);
    res.sendStatus(204);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const nameExists = await CategoriesRepository.findByName(name);

    if (nameExists) {
      return res
        .status(400)
        .json({ error: "This category has already been created" });
    }

    const category = await CategoriesRepository.create({ name });
    res.send(category);
  }
}

module.exports = new CategoryController();
