import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto, ErrorResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'Registration successful',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Registration failed',
    type: ErrorResponseDto,
  })
  async register(@Body() registerDto: RegisterDto) {
    const token = await this.authService.register(
      registerDto.email,
      registerDto.password,
    );
    return { status: 'success', token };
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Login failed',
    type: ErrorResponseDto,
  })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    return { status: 'success', token };
  }
}
