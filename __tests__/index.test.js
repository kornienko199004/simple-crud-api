const url = 'http://127.0.0.1:3000';
const axios = require('axios')

const config = {
  getPersons: 'person',
};

describe('HTTP methods should works', () => {
  it('GET: should return person', async () => {
    const expected = [];
    const res = await axios.get(`${url}/${config.getPersons}`);
    const data = res.data;

    expect(res.status).toEqual(200);
    expect(data).toEqual(expected);
  });

  it('POST: should return create and return person', async () => {
    const expected = {
      name: 'Aleksey',
      age: 31
    };
    const res = await axios.post(`${url}/${config.getPersons}`, expected);
    const data = res.data;

    expect(res.status).toEqual(200);
    expect(data).toMatchObject(expected);
  });

  it('GET: should return user by id', async () => {
    const person = {
      name: 'Aleksey',
      age: 31
    };
    let res = await axios.post(`${url}/${config.getPersons}`, person);
    let data = res.data;
    console.log(data);

    const id = data.id;

    res = await axios.get(`${url}/${config.getPersons}/${id}`);
    data = res.data;

    expect(res.status).toEqual(200);
    expect(data).toMatchObject(person);
  });

  it('PUT: should update and return person', async () => {
    const expected = {
      name: 'Aleksey',
      age: 31
    };

    let res = await axios.post(`${url}/${config.getPersons}`, expected);
    let data = res.data;
    const id = data.id;

    expected.name = 'Andrey';

    res = await axios.put(`${url}/${config.getPersons}/${id}`, expected);
    data = res.data;

    expect(res.status).toEqual(200);
    expect(data).toMatchObject(expected);
  });

  it('DELETE: should delete person by id', async () => {
    const expected = {
      name: 'Aleksey',
      age: 31
    };

    let res = await axios.post(`${url}/${config.getPersons}`, expected);
    let data = res.data;
    const id = data.id;

    res = await axios.delete(`${url}/${config.getPersons}/${id}`);
    data = res.data;
    expect(res.status).toEqual(204);

    try {
      res = await axios.get(`${url}/${config.getPersons}/${id}`);
    } catch(error) {
      expect(error).toEqual(Error("Request failed with status code 404"));
    }
  });
});

describe('Errors Tasks', () => {
  it('GET: wrong path status should be 404', async () => {
    try {
      const res = await axios.get(`${url}/${config.getPersons}123`);
    } catch(error) {
      expect(error).toEqual(Error("Request failed with status code 404"));
    }
  });
});