class Estado_compra(str):
    PENDIENTE_PAGO = "pendiente_pago"
    PAGADA = "pagada"
    CANCELADA = "cancelada"
    ENVIADA = "enviada"
    ENTREGADA = "entregada"

class Estado_devolucion(str):
    SOLICITADA = "solicitada"
    APROBADA = "aprobada"
    RECHAZADA = "rechazada"
    REINTEGRADA = "reintegrada"