-- Extensión para UUID si prefieres IDs no correlativos (opcional)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

---
-- 1. ENTIDADES MAESTRAS (Sin dependencias externas)
---

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    direccion TEXT NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cupones (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    porcentaje_descuento DECIMAL(5,2) NOT NULL CHECK (porcentaje_descuento BETWEEN 1 AND 100),
    fecha_vencimiento TIMESTAMP NOT NULL,
    usos_maximos INTEGER NOT NULL,
    usos_actuales INTEGER DEFAULT 0 CHECK (usos_actuales <= usos_maximos)
);

---
-- 2. PRODUCTOS Y VARIANTES
---

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio_base DECIMAL(12,2) NOT NULL CHECK (precio_base > 0),
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE variantes (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES productos(id) ON DELETE CASCADE,
    talle VARCHAR(20) NOT NULL,
    color VARCHAR(30) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    sku VARCHAR(50) UNIQUE NOT NULL,
    -- HU2: No pueden existir dos variantes con mismo talle/color para un mismo producto
    UNIQUE (producto_id, talle, color)
);

---
-- 3. CARRITO PERSISTENTE (HU11)
---

CREATE TABLE carritos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER UNIQUE REFERENCES clientes(id) ON DELETE CASCADE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carrito_items (
    id SERIAL PRIMARY KEY,
    carrito_id INTEGER REFERENCES carritos(id) ON DELETE CASCADE,
    variante_id INTEGER REFERENCES variantes(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    UNIQUE (carrito_id, variante_id)
);

---
-- 4. COMPRAS E ÍTEMS (HU5, HU6, HU7)
---

-- Definición de tipos para estados
CREATE TYPE estado_compra AS ENUM (
    'pendiente_pago', 'pagada', 'enviada', 'entregada', 'cancelada'
);

CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    cupon_id INTEGER REFERENCES cupones(id),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(12,2) NOT NULL, -- Antes del cupón
    total DECIMAL(12,2) NOT NULL,    -- Después del cupón
    estado estado_compra DEFAULT 'pendiente_pago'
);

CREATE TABLE compra_items (
    id SERIAL PRIMARY KEY,
    compra_id INTEGER REFERENCES compras(id) ON DELETE CASCADE,
    variante_id INTEGER REFERENCES variantes(id),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(12,2) NOT NULL -- Se congela el precio del momento (HU5)
);

---
-- 5. RESEÑAS Y DEVOLUCIONES (HU12, HU13)
---

CREATE TABLE resenas (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    producto_id INTEGER REFERENCES productos(id),
    puntaje INTEGER NOT NULL CHECK (puntaje BETWEEN 1 AND 5),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- HU12: Un cliente solo deja una reseña por producto
    UNIQUE (cliente_id, producto_id)
);

CREATE TYPE estado_devolucion AS ENUM (
    'solicitada', 'aprobada', 'rechazada', 'reintegrada'
);

CREATE TABLE devoluciones (
    id SERIAL PRIMARY KEY,
    compra_id INTEGER REFERENCES compras(id),
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado estado_devolucion DEFAULT 'solicitada'
);

CREATE TABLE devolucion_items (
    id SERIAL PRIMARY KEY,
    devolucion_id INTEGER REFERENCES devoluciones(id) ON DELETE CASCADE,
    variante_id INTEGER REFERENCES variantes(id),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0)
);

---
-- 6. ÍNDICES SUGERIDOS (Optimización para búsquedas HU3, HU8, HU10)
---

CREATE INDEX idx_productos_activo ON productos(activo) WHERE activo = TRUE;
CREATE INDEX idx_variantes_stock ON variantes(stock);
CREATE INDEX idx_compras_fecha ON compras(fecha DESC);
CREATE INDEX idx_variantes_sku ON variantes(sku);