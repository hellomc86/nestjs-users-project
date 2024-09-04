import { Controller, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Reset users with problems and return count of users with problems" })
  @ApiResponse({ status: 200, type: Object })  
  @Put('reset-problems')
  async resetProblemsFlag() {
    const result = await this.usersService.resetProblemsFlag();
    
    return result;
  }
}
