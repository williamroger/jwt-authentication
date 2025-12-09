import { hash } from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  constructor(private readonly salt: number) {}

  async execute({ name, email, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await prisma.account.findUnique({ where: { email } });

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, this.salt);

    await prisma.account.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });
  }
}
