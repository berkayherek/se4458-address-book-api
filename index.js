const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const contactsRouter = require('./routes/contacts');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.use('/contacts', contactsRouter);


app.get('/', (req, res) => {
res.send({ message: 'Address Book API — working. Swagger: /api-docs' });
});


app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});