import User from '../database/models/Users';
import fetch from "node-fetch";
import { url } from 'inspector';


const create = async (req, res) => {

  //Login to get an Admin bearer Token
  const optionsLogin = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'coclima@codx.dev', password: 'n84MFPigH?T769ib' })
  };
  const token = await fetch('https://api.coclima.com/login', optionsLogin)
  const bearer = await token.json()
  console.log(bearer)
  const access_token_coclima = 'Bearer ' + bearer.token

  //Get 'code' query string that Nuvemshop sends to OAuth2
  var query = require('url').parse(req.url, true).query;
  var code = query.code
  console.log(code)

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
  console.log(responseNS)


  //Get Store's data

  const optionsStore = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'CoClima(https://coclima.com)', 'Agent': 'Luiz Bett(luiz@codx.dev', 'Authentication': 'bearer ' + access_token }
  };
  const urlStore = 'https://api.tiendanube.com/v1/' + store_id + '/store'
  const requestStore = await fetch(urlStore, optionsStore)
  const responseStore = await requestStore.json()
  console.log(urlStore)
  console.log('bearer ' + access_token)
  console.log(responseStore)

  let email = responseStore.email
  if (email === null) {
    email = 'Sua Conta'
  }

  const password = responseStore.id

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





  console.log(access_token_coclima)

  //Creates company on CoClima's API
  const optionsCompany = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': access_token_coclima },
    body: JSON.stringify({ name: name, street: street, phone: phone, role: 'company', store_id: store_id, access_token: access_token, cpfcnpj: cpfcnpj })
  };
  let requestCompany = await fetch('https://api.coclima.com/companies', optionsCompany)
  let responseCompany = await requestCompany.json()
  let company_id = responseCompany.id

  console.log(responseCompany)

  if (responseCompany.error) {

    const optionsGetCompany = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': access_token_coclima },
      body: JSON.stringify({ name: name, street: street, phone: phone, role: 'company', store_id: store_id, access_token: access_token, cpfcnpj: cpfcnpj })
    };
    requestCompany = await fetch('https://api.coclima.com/companies', optionsGetCompany)



    const optionsUpdateCompany = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': access_token_coclima },
      body: JSON.stringify({ name: name, street: street, phone: phone, role: 'company', store_id: store_id, access_token: access_token, cpfcnpj: cpfcnpj })
    };
    requestCompany = await fetch('https://api.coclima.com/companies', optionsUpdateCompany)
    responseCompany = await requestCompany.json()
    company_id = responseCompany.id

    console.log(responseCompany)


  }




  //Creates user on CoClima's API
  const optionsUser = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': access_token_coclima },
    body: JSON.stringify({ name: name, password: password, role: 'user', email: email, company_id: company_id, createdAt: new Date(), updatedAt: new Date() })
  };
  const requestUser = await fetch('https://api.coclima.com/users', optionsUser)
  const responseUser = await requestUser.json()


  date_activated
  console.log(responseNS, responseStore, responseCompany, responseUser)




  /*   try {
  
      const user = await User.create({
        name, password, email, role, company_id
      });
  
      if (!user) {
        return res.status(400).json({
          error: 'This user is already registered',
        });
      }
      const newUser = user.get({ plain: true });
      delete newUser.password;
      return res.json(newUser);
    } catch (err) {
      console.log('\n\n\n', err, '\n\n\n');
      return res.status(409).json({ msg: err.errors });
    } */
};

export default {
  create,
};
