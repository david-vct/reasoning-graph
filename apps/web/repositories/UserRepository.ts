import bcrypt from 'bcryptjs';
import { connectDB } from '../lib/mongodb';
import { User as UserModel } from '../models/User';
import type { User } from '@reasoning-graph/types';

export class UserRepository {
  /**
   * Find user by email including passwordHash field
   */
  static async findByEmail(email: string): Promise<(User & { passwordHash?: string }) | null> {
    await connectDB();
    const result = await UserModel.findOne({ email }).select('+passwordHash').lean();
    if (!result) return null;

    return {
      id: result._id.toString(),
      email: result.email,
      name: result.name,
      passwordHash: result.passwordHash,
      createdAt: result.createdAt,
      graphQuota: result.graphQuota,
      preferences: result.preferences,
    } as User & { passwordHash?: string };
  }

  /**
   * Create new user with hashed password
   */
  static async create(data: { email: string; name: string; password: string }): Promise<User> {
    await connectDB();
    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await UserModel.create({
      email: data.email,
      name: data.name,
      passwordHash,
    });

    // Return user without passwordHash
    const userObject = user.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...userWithoutPassword } = userObject;
    return userWithoutPassword as User;
  }

  /**
   * Verify user password and return user without passwordHash
   */
  static async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user || !user.passwordHash) return null;

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return null;

    // Return user without passwordHash
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
}
