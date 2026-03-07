const {pgTable, uuid, varchar,text} = require("drizzle-orm/pg-core");
const authorsTable = require("./author.model");

const booksTable = pgTable("books", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 100 }).notNull(),
  descriptiion: text(),
  authorId: uuid()
  .references(()=> authorsTable.id)
  .notNull(),
});

module.exports = booksTable;