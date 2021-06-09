import Client from '../database/models/Clients';

const index = async (req, res) => {
  try {
    const clients = await Client.findAll({ where: { deleted_at: null } });

    if (!clients) {
      return res.status(400).json({
        error: 'There is no client registered',
      });
    }
    return res.json(clients);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findOne({ where: { id, deleted_at: null } });

    if (!client) {
      return res.status(400).json({
        error: 'This client is not registered',
      });
    }
    return res.json(client);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, number, street, phone, site,
    } = req.body;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(400).json({
        error: 'This client is not registered',
      });
    }
    await client.update({
      name, number, street, phone, site,
    });
    return res.json(client);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(400).json({
        error: 'This client is not registered',
      });
    }
    await client.update({ deleted_at: new Date() });

    return res.status(204).json({
      msg: 'client deleted!',
    });
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const create = async (req, res) => {
  try {
    const {
      name, cpfcnpj, number, street, phone, site,
    } = req.body;
    const clientcpfcnpj = req.body.cpfcnpj;
    const clientExist = await Client.findOne({ where: { cpfcnpj: clientcpfcnpj } });
    if (clientExist) {
      return res.status(400).json({
        error: 'This client is already registered',
      });
    }
    const client = await Client.create({
      name, cpfcnpj, number, street, phone, site,
    });

    return res.json(client);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

export default {
  create, show, update, deleteClient, index,
};
