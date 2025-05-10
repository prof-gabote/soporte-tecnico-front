const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Datos simulados
let tickets = [];
let clients = [];
let empresas = [
  { id: 1, nombre: 'Empresa Uno' },
  { id: 2, nombre: 'Empresa Dos' }
];
let categorias = [
  { id: 1, name: 'Soporte Técnico' },
  { id: 2, name: 'Facturación' },
  { id: 3, name: 'Consultas Generales' }
];

let ticketId = 1;
let clientId = 1;

// Precargar datos simulados
clients.push({
  id: clientId++,
  name: 'Carlos Pérez',
  email: 'carlos@empresa.cl',
  phone: '+56911112222',
  empresa: empresas[0]
});

clients.push({
  id: clientId++,
  name: 'Ana Gómez',
  email: 'ana@empresa.cl',
  phone: '+56933334444',
  empresa: empresas[1]
});

tickets.push({
  id: ticketId++,
  title: 'No puedo ingresar al sistema',
  description: 'Al intentar loguearme, obtengo error 403.',
  status: 'ABIERTO',
  clientId: 1,
  category: categorias[0],
  createdAt: new Date().toISOString()
});

tickets.push({
  id: ticketId++,
  title: 'Error en factura',
  description: 'La factura tiene un monto incorrecto.',
  status: 'CERRADO',
  clientId: 2,
  category: categorias[1],
  createdAt: new Date(Date.now() - 86400000).toISOString() // ayer
});

// LOGIN SIMULADO
app.post('/login', (req, res) => {
  const { userOrEmail, password } = req.body;
  if (userOrEmail && password) {
    return res.json({ token: 'fake-jwt-token-123' });
  } else {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// MIDDLEWARE DE AUTH SIMULADO
app.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer fake-jwt-token-123') {
    next();
  } else {
    res.status(403).json({ error: 'Token inválido o ausente' });
  }
});

// 🔹 ENDPOINTS AUXILIARES
app.get('/empresas', (req, res) => res.json(empresas));
app.get('/categorias', (req, res) => res.json(categorias));

// 🔹 CRUD CLIENTES
app.get('/clients', (req, res) => res.json(clients));

app.post('/clients', (req, res) => {
  const { empresa } = req.body;
  const empresaData = empresas.find(e => e.id == empresa.id);

  const client = {
    id: clientId++,
    ...req.body,
    empresa: empresaData || null
  };
  clients.push(client);
  res.status(201).json(client);
});

// CRUD INDIVIDUAL, UPDATE Y DELETE CLIENTS OMITIDOS PARA ENFOCARSE EN RELACIONES
app.get('/clients/:id', (req, res) => {
  const client = clients.find(c => c.id == req.params.id);
  client ? res.json(client) : res.sendStatus(404);
});

app.put('/clients/:id', (req, res) => {
  const index = clients.findIndex(c => c.id == req.params.id);
  if (index >= 0) {
    const empresaData = empresas.find(e => e.id == req.body.empresa.id);
    clients[index] = { ...clients[index], ...req.body, empresa: empresaData };
    res.json(clients[index]);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/clients/:id', (req, res) => {
  clients = clients.filter(c => c.id != req.params.id);
  res.sendStatus(204);
});

// 🔹 CRUD TICKETS
app.get('/tickets', (req, res) => res.json(tickets));

app.post('/tickets', (req, res) => {
  const { category } = req.body;
  const catData = categorias.find(c => c.id == category.id);

  const ticket = {
    id: ticketId++,
    createdAt: new Date().toISOString(),
    ...req.body,
    category: catData || null
  };
  tickets.push(ticket);
  res.status(201).json(ticket);
});

app.get('/tickets/:id', (req, res) => {
  const ticket = tickets.find(t => t.id == req.params.id);
  ticket ? res.json(ticket) : res.sendStatus(404);
});

app.put('/tickets/:id', (req, res) => {
  const index = tickets.findIndex(t => t.id == req.params.id);
  if (index >= 0) {
    const catData = categorias.find(c => c.id == req.body.category.id);
    tickets[index] = { ...tickets[index], ...req.body, category: catData };
    res.json(tickets[index]);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/tickets/:id', (req, res) => {
  tickets = tickets.filter(t => t.id != req.params.id);
  res.sendStatus(204);
});

// 🔸 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
  console.log(tickets);
});
