const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

const civilization = {
  async findById(id) {
    return prisma.civs.findUnique({ where: { id } });
  },

  async findByName(name) {
    return prisma.civs.findFirst({ where: { name } });
  },

  async findAll() {
    return prisma.civs.findMany();
  },

  async findAllIds() {
    const civs = await prisma.civs.findMany({ select: { id: true } });
    return civs.map((c) => c.id);
  },

  async findAllNames() {
    return prisma.civs.findMany({select: { name: true } });
  },

  async create(data) {
    return prisma.civs.create({ data });
  },

  async updateById(id, data) {
    return prisma.civs.update({ where: { id }, data });
  },

  async updateByName(name, data) {
    return prisma.civs.update({ where: { name }, data });
  },

  async deleteById(id) {
    return prisma.civs.delete({ where: { id } });
  },
};

module.exports = civilization;
