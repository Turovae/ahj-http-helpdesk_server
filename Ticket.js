const { v4: uuidv4 } = require('uuid');

exports.default = class Ticket {
  constructor(name, description, status) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.status = Boolean(status);
    this.created = new Date();
  }
};
