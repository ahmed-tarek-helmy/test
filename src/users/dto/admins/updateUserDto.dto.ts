import { CreateUserDto } from "./createUserDto.dto";
import {PartialType} from '@nestjs/mapped-types'
export class UpdateUserDto extends PartialType(CreateUserDto){}