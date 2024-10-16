import { env } from "@/env";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

const config = env.authToken;

@Entity("auth_tokens")
export class AuthToken {
  private constructor() {}

  @PrimaryColumn({ type: "varchar", length: config.maxTokenLength })
  public declare token: string;

  @Column({ type: "boolean", default: false })
  public declare isAdminToken: boolean;

  @CreateDateColumn()
  public declare createdAt: Date;

  @UpdateDateColumn()
  public declare updatedAt: Date;
}
