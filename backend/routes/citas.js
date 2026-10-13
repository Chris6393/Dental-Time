const express = require('express');
const pool = require('../db');

const router = express.Router();

/* Peticion GET */
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                citas.id,
                pacientes.nombre,
                pacientes.apellidos,
                TO_CHAR(citas.fecha, 'DD-MM-YYYY') AS fecha,
                citas.hora,
                citas.motivo,
                citas.observaciones,
                citas.estado
            FROM citas
            INNER JOIN pacientes
                ON citas.paciente_id = pacientes.id
        `);

        res.json(result.rows);

    } catch (error) {
        console.error('Error al obtener las citas:', error);
        res.status(500).json({
            mensaje: 'Error al obtener las citas'
        });
    }
});

/* Peticion GET por ID */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(`
            SELECT
                citas.id,
                citas.paciente_id,
                pacientes.nombre,
                pacientes.apellidos,
                TO_CHAR(citas.fecha, 'DD-MM-YYYY') AS fecha,
                citas.hora,
                citas.motivo,
                citas.observaciones,
                citas.estado
            FROM citas
            INNER JOIN pacientes
                ON citas.paciente_id = pacientes.id
            WHERE citas.id = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Cita no encontrada'
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error('Error al obtener la cita:', error);
        res.status(500).json({
            mensaje: 'Error al obtener la cita'
        });
    }
});

/* Peticion POST */
router.post('/', async (req, res) => {
    try {
        const {
            paciente_id,
            fecha,
            hora,
            motivo,
            observaciones,
            estado
        } = req.body;

        const result = await pool.query(
            `INSERT INTO citas (
                paciente_id,
                fecha,
                hora,
                motivo,
                observaciones,
                estado
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                paciente_id,
                fecha,
                hora,
                motivo,
                observaciones,
                estado
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Error al crear la cita:', error);
        res.status(500).json({
            mensaje: 'Error al crear la cita'
        });
    }
});

/* Peticion PUT */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            paciente_id,
            fecha,
            hora,
            motivo,
            observaciones,
            estado
        } = req.body;

        const result = await pool.query(
            `UPDATE citas
             SET paciente_id = $1,
                 fecha = $2,
                 hora = $3,
                 motivo = $4,
                 observaciones = $5,
                 estado = $6
             WHERE id = $7
             RETURNING *`,
            [
                paciente_id,
                fecha,
                hora,
                motivo,
                observaciones,
                estado,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Cita no encontrada'
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error('Error al actualizar la cita:', error);
        res.status(500).json({
            mensaje: 'Error al actualizar la cita'
        });
    }
});

/* Peticion DELETE */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM citas WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Cita no encontrada'
            });
        }

        res.json({
            mensaje: 'Cita eliminada correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar la cita:', error);
        res.status(500).json({
            mensaje: 'Error al eliminar la cita'
        });
    }
});

module.exports = router;