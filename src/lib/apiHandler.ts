import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient }  from "@prisma/client";
import { errorException } from "./errors";

export const prisma = new PrismaClient();

export type Pagination = {
  pageSize: number;
  page: number;
  counts?: number;
  lastPage?: number;
};

export class ApiHandler {
  protected readonly prisma: PrismaClient;
  protected readonly res: NextApiResponse;
  protected readonly req: NextApiRequest;
  protected readonly pagination?: Pagination;
  protected readonly userKey:string;
  constructor(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
    this.userKey = req.cookies.userKey || 'default';

    if (this.req.method!.toLocaleLowerCase() === "get") {
      const query = req.query;
      const pageSize = Math.abs(+(query.pageSize || 10));
      const page = Math.abs(+(query.page || 1));
      this.pagination = { page, pageSize };
    }
  }

  // Get Method
  async get() {
    await this.default();
  }
  // Post Method
  async post() {
    await this.default();
  }
  // Put method
  async put() {
    await this.default();
  }
  // Patch method
  async patch() {
    await this.default();
  }
  // Delete method
  async delete() {
    await this.default();
  }
  // Option method
  async option() {
    await this.default();
  }
  // Default method
  async default() {
    throw errorException("method");
  }
}
