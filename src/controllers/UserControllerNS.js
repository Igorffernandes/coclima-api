import User from '../database/models/Users';
import fetch from "node-fetch";
import { url } from 'inspector';
require('dotenv/config');

const create = async (req, res) => {

  console.log(process.env.COCLIMA_ADMIN_LOGIN)

  //Login to get an Admin bearer Token
  const optionsLogin = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: process.env.COCLIMA_ADMIN_LOGIN, password: process.env.COCLIMA_ADMIN_PASSWORD })
  };
  const token = await fetch('https://api.coclima.com/login', optionsLogin)
  const bearer = await token.json()
  const access_token_coclima = 'Bearer ' + bearer.token

  //Get 'code' query string that Nuvemshop sends to OAuth2
  var query = require('url').parse(req.url, true).query;
  var code = query.code

  //Nuvemshop's OAuth
  const optionsNS = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'CoClima(https://coclima.com)', 'Agent': 'Luiz Bett(luiz@codx.dev' },
    body: JSON.stringify({ grant_type: 'authorization_code', client_id: '3804', client_secret: 'Bh6XbGgPd1GoW18rCj95m3ePSErdrAB8zv5OuFeVJEI6gt6R', code: code })
  };

  const requestNS = await fetch('https://www.tiendanube.com/apps/authorize/token', optionsNS)
  const responseNS = await requestNS.json()
  const access_token = responseNS.access_token
  const store_id = responseNS.user_id


  //Get Store's data

  const optionsStore = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'CoClima(https://coclima.com)', 'Agent': 'Luiz Bett(luiz@codx.dev', 'Authentication': 'bearer ' + access_token }
  };
  const urlStore = 'https://api.tiendanube.com/v1/' + store_id + '/store'
  const requestStore = await fetch(urlStore, optionsStore)
  const responseStore = await requestStore.json()

  let email = responseStore.email
  if (email === null) {
    email = 'Sua Conta'
  }

  const password = "sen" + responseStore.id

  let name = responseStore.name.pt
  if (name === null) {
    name = 'Sua Conta'
  }

  let street = responseStore.business_address
  if (street === null) {
    street = 'Sem Endereço'
  }

  let phone = responseStore.phone
  if (phone === null) {
    phone = 'Sem Telefone'
  }

  let cpfcnpj = responseStore.business_id
  if (cpfcnpj === null) {
    cpfcnpj = 'Sem CNPJ ' + store_id
  }


  //Creates company on CoClima's API
  const optionsCompany = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': access_token_coclima },
    body: JSON.stringify({ name: name, street: street, phone: phone, role: 'company', store_id: store_id, access_token: access_token, cpfcnpj: cpfcnpj })
  };
  let requestCompany = await fetch('https://api.coclima.com/companies', optionsCompany)
  let responseCompany = await requestCompany.json()
  let company_id = responseCompany.id

  if (responseCompany.error) {

    const optionsUpdateCompany = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': access_token_coclima },
      body: JSON.stringify({ name: name, street: street, phone: phone, role: 'company', store_id: store_id, access_token: access_token, cpfcnpj: cpfcnpj })
    };
    requestCompany = await fetch('https://api.coclima.com/companies/' + company_id, optionsUpdateCompany)
    responseCompany = await requestCompany.json()
    company_id = responseCompany.id
  }




  //Creates user on CoClima's API

  const optionsGetUser = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': access_token_coclima }
  };

  const getExistingUser = await fetch('https://api.coclima.com/usersNS/' + email, optionsGetUser)



  if (getExistingUser.status === 404) {
    const optionsUser = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': access_token_coclima },
      body: JSON.stringify({ name: name, password: password, role: 'user', email: email, company_id: company_id })
    };
    const requestUser = await fetch('https://api.coclima.com/users', optionsUser)
    const responseUser = await requestUser.json()


  }

  if (getExistingUser.status === 200) {

    const optionsUser = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': access_token_coclima },
      body: JSON.stringify({ name: name, password: password, role: 'user', email: email, company_id: company_id })
    };
    const requestUser = await fetch('https://api.coclima.com/users', optionsUser)
    const responseUser = await requestUser.json()



  }


  //Create Webhooks for order/paid

  const optionsCreateWebhooks = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'CoClima(https://coclima.com)', 'Agent': 'Luiz Bett(luiz@codx.dev', 'Authentication': 'bearer ' + access_token },
    body: JSON.stringify({ url: 'https://api.coclima.com/orderCreatedNS/', event: 'order/paid' })
  };
  const urlCreateWebhooks = 'https://api.tiendanube.com/v1/' + store_id + '/webhooks'
  const requestCreateWebhooks = await fetch(urlCreateWebhooks, optionsCreateWebhooks)
  const responseCreateWebhooks = await requestCreateWebhooks.json()



  //Create Store's Modal

  const optionsModal = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'CoClima(https://coclima.com)', 'Agent': 'Luiz Bett(luiz@codx.dev', 'Authentication': 'bearer ' + access_token },
    body: JSON.stringify({ src: 'https://api.coclima.com/initNS', event: 'onfirstinteraction', where: 'checkout' })
  };

  const urlModal = 'https://api.tiendanube.com/v1/' + store_id + '/scripts'
  const requestModal = await fetch(urlModal, optionsModal)
  const responseModal = await requestModal.json()

  /*  const optionsUpdateWebhooks = {
     method: 'POST',
     headers: { 'Content-Type': 'application/json', 'User-Agent': 'CoClima(https://coclima.com)', 'Agent': 'Luiz Bett(luiz@codx.dev', 'Authentication': 'bearer ' + access_token },
     body: JSON.stringify({ url: 'https://api.coclima.com/orderUpdatedNS/', event: 'order/updated' })
   };
   const urlUpdateWebhooks = 'https://api.tiendanube.com/v1/' + store_id + '/webhooks'
   const requestUpdateWebhooks = await fetch(urlUpdateWebhooks, optionsUpdateWebhooks)
   const responseUpdateWebhooks = await requestUpdateWebhooks.json() */


  return res.status(200).json({});
};

export default {
  create,
};
