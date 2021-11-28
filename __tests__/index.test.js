const url = 'http://127.0.0.1:3000';
const axios = require('axios')

// axios
//   .post('https://whatever.com/todos', {
//     todo: 'Buy the milk'
//   })
//   .then(res => {
//     console.log(`statusCode: ${res.status}`)
//     console.log(res)
//   })
//   .catch(error => {
//     console.error(error)
//   })

const config = {
  getPersons: 'person',
}
const HttpHelper = require('./helpers/httpHelper');

const http = new HttpHelper();

describe('HTTP methods should works', () => {
  it('GET: should return person', async () => {
    const expected = [];
    // const res = await http.get(`${url}/${config.getPersons}`);
    const res = await axios.get(`${url}/${config.getPersons}`);
    // const data = JSON.parse(res);
    const data = res.data;
    console.log('data', data)
    expect(data).toEqual(expected);
  });

  it('POST: should return create and return person', async () => {
    const expected = {
      name: 'Aleksey',
      age: 31
    };
    const res = await axios.post(`${url}/${config.getPersons}`, expected);
    const data = res.data;
    console.log(data);

    expect(data).toMatchObject(expected)
  });
});