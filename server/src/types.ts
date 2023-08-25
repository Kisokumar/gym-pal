import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

import { EntityManager } from "typeorm";

export type MyContext = {
  em: EntityManager;
  req: Request & {
    session: Session & Partial<SessionData> & { userId: string | null };
  };
  res: Response;
};
