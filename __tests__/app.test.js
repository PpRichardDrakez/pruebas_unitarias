const request = require('supertest');
const app = require('../app');

describe('Pruebas de la API', () => {
  it('GET /items debe devolver un array con status 200', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /items debe crear un nuevo item y devolver status 201', async () => {
    const res = await request(app).post('/items').send({ name: 'Nuevo Item' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Nuevo Item');
  });
  it('POST /items sin nombre debe devolver 400', async () => {
    const res = await request(app).post('/items').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('PUT /items/:id debe actualizar un item existente', async () => {
    const res = await request(app).put('/items/1').send({ name: 'Item Actualizado' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Item Actualizado');
  });
  it('PUT /items/999 con ID inexistente debe devolver 404', async () => {
    const res = await request(app).put('/items/999').send({ name: 'Nada' });
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /items/:id debe eliminar un item existente', async () => {
    const res = await request(app).delete('/items/1');
    expect(res.statusCode).toBe(204);
  });
  
});
