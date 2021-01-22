import Client from '../database/models/Clients';

const create = async (req, res) => {
  const {
    name, number, street, phone, site,
  } = req.body;

  const client = await Client.create({
    name, number, street, phone, site,
  });

  return res.json(client);
};

export default { create };
