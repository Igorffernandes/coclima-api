import axios from 'axios';

import { consumerKey, consumerSecret } from '../config/constants';

const getAccessToken = async (company) => {
  const params = new URLSearchParams();
  params.append('consumer_key', consumerKey);
  params.append('consumer_secret', consumerSecret);
  params.append('code', company.code);

  console.log('\n\n\n', company.api_address, company, '\n\n\n');

  try {
    const result = await axios.post(
      `${company.api_address}/auth`,
      params,
      {
        headers:
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log('\n\n\n', result, '\n\n\n');

    await company.update({
      access_token: result.data.access_token,
      refresh_token: result.data.refresh_token,
      date_expiration_access_token: result.data.date_expiration_access_token,
      date_expiration_refresh_token: result.data.date_expiration_refresh_token,
      date_activated: result.data.date_activated,
      store_id: result.data.store_id,
    });
  } catch (err) {
    console.log(err.response.data);
  }

  return true;
};

export default getAccessToken;
