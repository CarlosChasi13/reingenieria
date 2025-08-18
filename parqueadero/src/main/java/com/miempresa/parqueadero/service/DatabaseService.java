package com.miempresa.parqueadero.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class DatabaseService {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void vaciarBaseDeDatos() {
        // El orden importa por claves foráneas (primero hijos, luego padres)
        entityManager.createNativeQuery("DELETE FROM factura").executeUpdate();
        entityManager.createNativeQuery("DELETE FROM caja").executeUpdate();
        entityManager.createNativeQuery("DELETE FROM espacio").executeUpdate();
        entityManager.createNativeQuery("DELETE FROM cliente").executeUpdate();
        entityManager.createNativeQuery("DELETE FROM usuario").executeUpdate();
        entityManager.createNativeQuery("DELETE FROM configuracion").executeUpdate();
    }
}
