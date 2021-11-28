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

  it('POST: should create and return person', async () => {
    const expected = {
      name: 'Aleksey',
      age: 31
    };
    const res = await axios.post(`${url}/${config.getPersons}`, expected);
    const data = res.data;

    expect(res.status).toEqual(201);
    expect(data).toMatchObject(expected);
  });

  it('GET: should return user by id', async () => {
    const person = {
      name: 'Aleksey',
      age: 31
    };
    let res = await axios.post(`${url}/${config.getPersons}`, person);
    let data = res.data;

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

  it('GET: invalid id status should be 400', async () => {
    try {
      const res = await axios.get(`${url}/${config.getPersons}/123`);
    } catch(error) {
      expect(error).toEqual(Error("Request failed with status code 400"));
    }
  });

  it('GET: not find id status should be 404', async () => {
    const person = {
      name: 'Aleksey',
      age: 31
    };
    let res = await axios.post(`${url}/${config.getPersons}`, person);
    let data = res.data;
    const id = data.id;

    res = await axios.get(`${url}/${config.getPersons}/${id}`);
    data = res.data;

    res = await axios.delete(`${url}/${config.getPersons}/${id}`);

    try {
      res = await axios.get(`${url}/${config.getPersons}/${id}`);
    } catch(error) {
      expect(error).toEqual(Error("Request failed with status code 404"));
    }
  });

  it('POST: no required fields status 400', async () => {
    const expected = {
      name: 'Aleksey'
    };

    try {
      await axios.post(`${url}/${config.getPersons}`, expected);
    } catch(error) {
      expect(error).toEqual(Error("Request failed with status code 400"));
    }
  });

  it('PUT: invalid id status should be 400', async () => {
    const expected = {
      name: 'Aleksey',
      age: 31
    };

    let res = await axios.post(`${url}/${config.getPersons}`, expected);
    let data = res.data;
    const id = data.id;

    expected.name = 'Andrey';

    try {
      res = await axios.put(`${url}/${config.getPersons}/${id}1`, expected);
    } catch(error) {
      expect(error).toEqual(Error("Request failed with status code 400"));
    }
  });

  it('PUT: not find id status should be 404', async () => {
    const expected = {
      name: 'Aleksey',
      age: 31
    };

    let res = await axios.post(`${url}/${config.getPersons}`, expected);
    let data = res.data;
    const id = data.id;

    res = await axios.delete(`${url}/${config.getPersons}/${id}`);

    expected.name = 'Andrey';

    try {
      res = await axios.put(`${url}/${config.getPersons}/${id}`, expected);
    } catch(error) {
      expect(error).toEqual(Error("Request failed with status code 404"));
    }
  });

  it('DELETE: invalid id status should be 400', async () => {
    try {
      await axios.delete(`${url}/${config.getPersons}/gghjgj1`);
    } catch(error) {
      expect(error).toEqual(Error("Request failed with status code 400"));
    }
  });

  it('DELETE: not find id status should be 404', async () => {
    const expected = {
      name: 'Aleksey',
      age: 31
    };

    let res = await axios.post(`${url}/${config.getPersons}`, expected);
    let data = res.data;
    const id = data.id;

    res = await axios.delete(`${url}/${config.getPersons}/${id}`);

    try {
      await axios.delete(`${url}/${config.getPersons}/${id}`);
    } catch(error) {
      expect(error).toEqual(Error("Request failed with status code 404"));
    }
  });
});