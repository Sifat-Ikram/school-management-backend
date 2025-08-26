import { IsString, IsInt, IsOptional } from "class-validator";

export class CreateStudentDto {
  @IsString() name: string;
  @IsInt() age: number;
  @IsOptional() @IsInt() class_id?: number;
}
