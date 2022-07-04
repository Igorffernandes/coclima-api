/* eslint-disable camelcase */
import path from 'path';
import { Op } from 'sequelize';
import Company from '../database/models/Companies';
import User from '../database/models/Users';
import getAccessToken from '../utils/AccessToken';

const html = async (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, '../script/popup.html'));
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const init = async (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, '../script/initNS.js'));
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const css = async (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, '../script/cssNS.css'));
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};


export default {
  init, css, html
};
