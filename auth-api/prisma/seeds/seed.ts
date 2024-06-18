import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main () {
    const logger = new Logger('Seed');

    const hashedPassword = await argon2.hash('sa123456');

    const superAdminRole = await prisma.rol.create({
        data: {
            Description: 'SuperAdmin',
        }
    });

    const superAdminUser = await prisma.user.create({
        data: {
            Username: 'SuperAdmin',
            Password: hashedPassword,
            Email: 'user_seed_123@gmail.com',
            Name: 'User Seed',
            RoleId: superAdminRole.Id
        }
    });

    logger.log('Super Admin user and role created: ', superAdminUser);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })