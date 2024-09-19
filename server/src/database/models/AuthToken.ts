import { env } from "@/env";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

const metadata = env.database.model.authToken;

@Entity("auth_tokens")
export class AuthToken {
  @PrimaryColumn({ type: "varchar", length: metadata.token.max })
  public declare token: string;

  @Column({ type: "boolean", default: false })
  public declare isAdminToken: boolean;

  @CreateDateColumn()
  public declare createdAt: Date;

  @UpdateDateColumn()
  public declare updatedAt: Date;

  public static verifyToken(value: string): boolean {
    const { min, max } = metadata.token;
    if (value.length < min) return false;
    if (value.length > max) return false;
    return true;
  }
}
