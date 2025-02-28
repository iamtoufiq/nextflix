import type { PrismaClient } from "@prisma/client";

declare global {
  namespace globalThis {
    // eslint-disable-next-line no-var
    var prismadb: PrismaClient
  }
}

//todo : what is this use of this file