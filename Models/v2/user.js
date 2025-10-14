const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

const user = {
  async findByToken(token) {
    return prisma.users.findFirst({ where: { token } });
  },

  async findById(id) {
    return prisma.users.findUnique({ where: { id } });
  },

  async create(data) {
    return prisma.users.create({ data });
  },

  async updateById(id, data) {
    return prisma.users.update({ where: { id }, data });
  },

  async updateByToken(token, data) {
    return prisma.users.update({ where: { token }, data });
  },

  async addSolvedCiv(userId, civId) {
    return prisma.usersolvedcivs.create({
      data: { userId, civId },
    });
  },

  async addSolvedCivs(data) {
    return prisma.usersolvedcivs.createMany({
      data,
      skipDuplicates: true,
    });
  },

  async getSolvedCivIds(userId) {
    const solved = await prisma.usersolvedcivs.findMany({
      where: { userId },
      select: { civId: true },
    });
    return solved.map((row) => row.civId);
  },

  async clearSolvedCivs(userId) {
    return prisma.usersolvedcivs.deleteMany({ where: { userId } });
  },

  async findAll() {
    return prisma.users.findMany();
  },
  async getSolvedUnitIds(userId) {
    const solved = await prisma.usersolvedunits.findMany({
      where: { userId },
      select: { civId: true },
    });
    return solved.map((row) => row.civId);
  },
  async addSolvedUnit(userId, civId) {
    return prisma.usersolvedunits.create({
      data: { userId, civId },
    });
  },
  async clearSolvedUnits(userId) {
    return prisma.usersolvedunits.deleteMany({ where: { userId } });
  }
};

module.exports = user;
