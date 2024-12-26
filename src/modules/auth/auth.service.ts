import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Hardcoded admin for now; replace with database integration in the future
  private admins = [
    {
      id: 1,
      email: 'zeeshan@gmail.com', // Default admin email
      password: 'admin123', // Default admin password
      role: 'admin',
    },
  ];

  /**
   * Login logic for admins
   * @param loginDto - Contains email and password
   * @returns JWT access token
   */
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    // Find the admin by email and password
    const admin = this.admins.find((a) => a.email === email && a.password === password);

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Prepare payload for the JWT token
    const payload = { id: admin.id, email: admin.email, role: admin.role };

    // Sign the JWT token
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
