/* eslint-disable camelcase */
import path from 'path';
import Company from '../database/models/Companies';
import User from '../database/models/Users';
import passwordGenerator from '../utils/PasswordGenerator';
import getAccessToken from '../utils/AccessToken';

const bcrypt = require('bcrypt');

const init = async (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, '../script/init.js'));
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const index = async (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, '../script/coclima.js'));
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const index2 = async (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, '../script/coclima2.js'));
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const create = async (req, res) => {
  const {
    username,
    email,
    name,
    cpfcnpj,
    street,
    number,
    city,
    state,
    cep,
    phone,
    site,
    api_address,
    code,
  } = req.body;

  const companyExist = await Company.findOne({ where: { cpfcnpj } });

  if (companyExist) {
    return res.status(400).json({
      error: 'This company is already registered',
    });
  }

  const newCompany = await Company.create({
    name,
    number,
    street,
    phone,
    site,
    email,
    city,
    state,
    cep,
    code,
    api_address,
    cpfcnpj,
  });

  const userExist = await User.findOne({ where: { email } });

  if (userExist) {
    return res.status(400).json({
      error: 'This client is already registered',
    });
  }

  const secret = passwordGenerator();
  const SALT_ROUNDS = 10;

  const newUser = await User.create({
    name: username,
    email,
    password: await bcrypt.hash(String(secret), SALT_ROUNDS),
    role: 'user',
    company_id: newCompany.id,
  });

  await getAccessToken(newCompany);

  return res.status(200).json({
    name: newUser.name,
    password: secret,
  });
};

export default {
  init, index, index2, create,
};
