class IntegrationController {
  async sync(req, res) {
    return res.json({ message: 'Sync' });
  }
}

module.exports = new IntegrationController();
