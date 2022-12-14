
import packageInfo from '../../auth_config.json'

let domain = packageInfo.domain
let clientId = packageInfo.clientId

export const environment = {
  production: true,
  baseUrl:"https://rentten-service.onrender.com",
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin
  },
};
