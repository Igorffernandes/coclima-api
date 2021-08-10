/* eslint-disable camelcase */
import Company from '../database/models/Companies';

const index = async (req, res) => {
  try {
    const queryObject = {
      role: ['company', 'admin'],
      deleted_at: null,
    };

    const companies = await Company.findAll({ where: queryObject });

    if (!companies) {
      return res.status(400).json({
        error: 'There is no company registered',
      });
    }

    return res.json(companies);
  } catch (err) {
    return res.status(409).json({ msg: err });
  }
};

const indexPartners = async (req, res) => {
  try {
    const queryObject = {
      role: 'partner',
      deleted_at: null,
    };

    const partners = await Company.findAll({ where: queryObject });

    if (!partners) {
      return res.status(400).json({
        error: 'There is no partner registered',
      });
    }

    return res.json(partners);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findOne({ where: { id, deleted_at: null } });

    if (!company) {
      return res.status(400).json({
        error: 'This company is not registered',
      });
    }

    return res.json(company);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      number,
      street,
      phone,
      site,
      email,
      district,
      complement,
      role,
      image,
      api_address,
      access_token,
      refresh_token,
      date_expiration_access_token,
      date_expiration_refresh_token,
      date_activated,
      store_id,
      cpfcnpj,
    } = req.body;

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(400).json({
        error: 'This company is not registered',
      });
    }

    await company.update({
      name,
      number,
      street,
      phone,
      site,
      email,
      district,
      complement,
      role,
      image,
      api_address,
      access_token,
      refresh_token,
      date_expiration_access_token,
      date_expiration_refresh_token,
      date_activated,
      store_id,
      cpfcnpj,
    });
    return res.json(company);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(400).json({
        error: 'This company is not registered',
      });
    }
    await company.update({ deleted_at: new Date() });

    return res.status(204).json({
      msg: 'company deleted!',
    });
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const create = async (req, res) => {
  try {
    const {
      name,
      number,
      street,
      phone,
      site,
      email,
      district,
      complement,
      role,
      image,
      api_address,
      access_token,
      refresh_token,
      date_expiration_access_token,
      date_expiration_refresh_token,
      date_activated,
      store_id,
      cpfcnpj,
    } = req.body;

    const companyExist = await Company.findOne({ where: { cpfcnpj } });

    if (companyExist) {
      return res.status(400).json({
        error: 'This client is already registered',
      });
    }

    const company = await Company.create({
      name,
      number,
      street,
      phone,
      site,
      email,
      district,
      complement,
      role,
      logo: image,
      api_address,
      access_token,
      refresh_token,
      date_expiration_access_token,
      date_expiration_refresh_token,
      date_activated,
      store_id,
      cpfcnpj,
    });

    return res.json(company);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

export default {
  create, show, update, deleteClient, index, indexPartners,
};
