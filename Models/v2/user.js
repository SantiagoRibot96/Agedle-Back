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

  async addSolvedCiv(user_id, civ_id) {
    return prisma.user_solved_civs.create({
      data: { user_id, civ_id },
    });
  },

  async addSolvedCivs(data) {
    return prisma.user_solved_civs.createMany({
      data,
      skipDuplicates: true,
    });
  },

  async getSolvedCivIds(user_id) {
    const solved = await prisma.user_solved_civs.findMany({
      where: { user_id },
      select: { civ_id: true },
    });
    return solved.map((row) => row.civ_id);
  },

  async clearSolvedCivs(user_id) {
    return prisma.user_solved_civs.deleteMany({ where: { user_id } });
  },

  async findAll() {
    return prisma.users.findMany();
  },
  async getSolvedUnitIds(user_id) {
    const solved = await prisma.user_solved_units.findMany({
      where: { user_id },
      select: { civ_id: true },
    });
    return solved.map((row) => row.civ_id);
  },
  async addSolvedUnit(user_id, civ_id) {
    return prisma.user_solved_units.create({
      data: { user_id, civ_id },
    });
  },
  async clearSolvedUnits(user_id) {
    return prisma.user_solved_units.deleteMany({ where: { user_id } });
  }
};

module.exports = user;
