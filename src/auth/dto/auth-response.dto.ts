import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Status of the request',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: 'JWT token for the authenticated user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Status of the request',
    example: 'error',
  })
  status: string;

  @ApiProperty({
    description: 'Error message',
    example: 'Registration failed',
  })
  message: string;
}
