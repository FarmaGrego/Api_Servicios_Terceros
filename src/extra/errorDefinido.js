class ErrorDefinido extends Error {
    constructor({...params}) {
      super({...params});
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ErrorDefinido)
      }
  
      this.nombre = params.nombre;
      this.descripcion = params.descripcion;
      this.date = new Date();
    }
};

module.exports = ErrorDefinido;