import Client from '../database/models/Clients';

const index = async (req, res) => {
  const clients = await Client.findAll({ where: { deleted_at: null } });

  if (!clients) {
    return res.status(400).json({
      error: 'There is no client registered',
    });
  }
  return res.json(clients);
};

const show = async (req, res) => {
  const { id } = req.params;

  const client = await Client.findOne({ where: { id, deleted_at: null } });

  if (!client) {
    return res.status(400).json({
      error: 'This client is not registered',
    });
  }
  return res.json(client);
};

const update = async (req, res) => {
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
};

const deleteClient = async (req, res) => {
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
};

const create = async (req, res) => {
  const {
    name, number, street, phone, site,
  } = req.body;

  const client = await Client.create({
    name, number, street, phone, site,
  });

  // if (client) {
  //   return res.status(400).json({
  //     error: 'This client is already registered',
  //   });
  // }
  return res.json(client);
};

export default {
  create, show, update, deleteClient, index,
};
