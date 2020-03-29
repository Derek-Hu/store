import { Service } from '../constant';
import fetchJSON from './utils/fetchJSON';
import { asyncForEach } from './utils/index';

const keys = Object.keys(Service);

asyncForEach(keys, async key => {
  const lib = Service[key];
  await fetchJSON(lib.url, lib.name);
});