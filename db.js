const Ticket = require('./Ticket').default;

const tickets = [
  new Ticket('Поменять краску в принтере, ком. 404', 'Поменять краску в принтере, ком. 404'),
  new Ticket('Переустановить Windows, ПК-Hall24', 'Поменять краску в принтере, ком. 404'),
  new Ticket('Установить обновление KB-XXX', 'Вышло критическое обновление для Windows, нужно поставить обновления в следующем приоритете:<ol><li>Сервера (Не забыть сделать бэкап!)</li><li>Рабочии станции</li></ol>', true),
];

module.exports = { tickets };