import { Service } from '../constant';
import fetchJSON from './fetchJSON';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const keys = Object.keys(Service);

asyncForEach(keys, async key => {
  const lib = Service[key];
  await fetchJSON(lib.url, lib.name);
});