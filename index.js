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
let companies = [
  { id: 1, companyName: 'Empresa Uno' },
  { id: 2, companyName: 'Empresa Dos' }
];
let categories = [
  { id: 1, categoryName: 'Soporte Técnico' },
  { id: 2, categoryName: 'Facturación' },
  { id: 3, categoryName: 'Consultas Generales' }
];

let ticketId = 1;
let clientId = 1;

// Precargar datos simulados
clients.push({
  id: clientId++,
  fullName: 'Carlos Pérez',
  email: 'carlos@empresa.cl',
  phoneNumber: '+56911112222',
  company: companies[0]
});

clients.push({
  id: clientId++,
  fullName: 'Ana Gómez',
  email: 'ana@empresa.cl',
  phoneNumber: '+56933334444',
  company: companies[1]
});

tickets.push({
  id: ticketId++,
  title: 'No puedo ingresar al sistema',
  description: 'Al intentar loguearme, obtengo error 403.',
  status: 'ABIERTO',
  clientId: 1,
  category: categories[0],
  createdAt: new Date().toISOString()
});

tickets.push({
  id: ticketId++,
  title: 'Error en factura',
  description: 'La factura tiene un monto incorrecto.',
  status: 'CERRADO',
  clientId: 2,
  category: categories[1],
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
app.get('/companies', (req, res) => res.json(companies));
app.get('/categories', (req, res) => res.json(categories));

// 🔹 CRUD CLIENTES
app.get('/clients', (req, res) => res.json(clients));

app.post('/clients', (req, res) => {
  const { company } = req.body;
  const companyData = companies.find(c => c.id == company.id);

  const client = {
    id: clientId++,
    ...req.body,
    company: companyData || null
  };
  clients.push(client);
  res.status(201).json(client);
});

app.get('/clients/:id', (req, res) => {
  const client = clients.find(c => c.id == req.params.id);
  client ? res.json(client) : res.sendStatus(404);
});

app.put('/clients/:id', (req, res) => {
  const index = clients.findIndex(c => c.id == req.params.id);
  if (index >= 0) {
    const companyData = companies.find(c => c.id == req.body.company.id);
    clients[index] = { ...clients[index], ...req.body, company: companyData };
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
  const catData = categories.find(c => c.id == category.id);

  const ticket = {
    id: ticketId++,
    createdAt: new Date().toISOString(),
    ...req.body,
    category: catData || null
  };
  console.log(ticket);
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
    const catData = categories.find(c => c.id == req.body.category.id);
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
});
