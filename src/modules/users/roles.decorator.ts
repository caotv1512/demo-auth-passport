import { SetMetadata } from "@nestjs/common";
import { Role } from "src/helper/config/enum";

export const Roles = (...roleId: Role[])=> SetMetadata('roleId', roleId);