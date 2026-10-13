const express = require('express');
const router = express.Router();

const pool = require('../db');


// Peticiones GET
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pacientes');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
        res.status(500).json({ mensaje: 'Error al obtener los pacientes' });
    }
});

// Peticiones GET por DNI
router.get('/:dni', async (req, res) => {
    try {
        const { dni } = req.params;

        const result = await pool.query(
            'SELECT * FROM pacientes WHERE dni = $1',
            [dni]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Paciente no encontrado'
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener el paciente:', error);
        res.status(500).json({
            mensaje: 'Error al obtener el paciente'
        });
    }
});

// Peticiones POST
router.post('/', async (req, res) => {
    try {
        const { dni, nombre, apellidos, edad, telefono, email } = req.body;

        const result = await pool.query(
            `INSERT INTO pacientes (dni, nombre, apellidos, edad, telefono, email)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [dni, nombre, apellidos, edad, telefono, email]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Error al crear el paciente:', error);
        res.status(500).json({
            mensaje: 'Error al crear el paciente'
        });
    }
});

// Peticiones PUT
router.put('/:dni', async (req, res) => {
    try {
        const { dni } = req.params;
        const { nombre, apellidos, edad, telefono, email } = req.body;

        const result = await pool.query(
            `UPDATE pacientes
             SET nombre = $1,
                 apellidos = $2,
                 edad = $3,
                 telefono = $4,
                 email = $5
             WHERE dni = $6
             RETURNING *`,
            [nombre, apellidos, edad, telefono, email, dni]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Paciente no encontrado'
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error('Error al actualizar el paciente:', error);
        res.status(500).json({
            mensaje: 'Error al actualizar el paciente'
        });
    }
});

// Peticiones DELETE
router.delete('/:dni', async (req, res) => {
    try {
        const { dni } = req.params;

        const result = await pool.query(
            'DELETE FROM pacientes WHERE dni = $1 RETURNING *',
            [dni]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Paciente no encontrado'
            });
        }

        res.json({
            mensaje: 'Paciente eliminado correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar el paciente:', error);
        res.status(500).json({
            mensaje: 'Error al eliminar el paciente'
        });
    }
});

module.exports = router;