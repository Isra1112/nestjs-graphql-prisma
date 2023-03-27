import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ max: 99, min: 18 }),
        }
    });
    const user2 = await prisma.user.create({
        data: {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ max: 99, min: 18 }),
        }
    });
    const user3 = await prisma.user.create({
        data: {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ max: 99, min: 18 }),
        }
    });
    const post = await prisma.post.create({
        data: {
            title: faker.lorem.sentence(5),
            text: faker.lorem.sentence(6),
            isPublished: true,
            user: {
                connect: {
                    id: user.id,
                },
            },
        }
    });
    const post2 = await prisma.post.create({
        data: {
            title: faker.lorem.sentence(5),
            text: faker.lorem.sentence(6),
            isPublished: true,
            user: {
                connect: {
                    id: user2.id,
                },
            },
        }
    });
    const comment = await prisma.comment.create({
        data: {
            text: faker.lorem.sentence(),
            post: {
                connect: {
                    id: post.id,
                },
            },
            author: {
                connect: {
                    id: user3.id,
                },
            },
            // comment: {
            //     connect: {
            //         id: undefined,
            //     }
            // }
        }
    });
    const comment2 = await prisma.comment.create({
        data: {
            text: faker.lorem.sentence(),
            post: {
                connect: {
                    id: post.id,
                },
            },
            author: {
                connect: {
                    id: user3.id,
                },
            },
            comment: {
                connect: {
                    id: comment.id,
                }
            }
        }
    });
    const comment3 = await prisma.comment.create({
        data: {
            text: faker.lorem.sentence(),
            post: {
                connect: {
                    id: post.id,
                },
            },
            author: {
                connect: {
                    id: user2.id,
                },
            },
            comment: {
                connect: {
                    id: comment.id,
                }
            }
        }
    });

}

main()
    .then(() => {
        console.log('done');
        process.exit(0);
    }
    )
    .catch((e) => {
        console.error(e);
        process.exit(1);
    }
    )
    .finally(async () => {
        await prisma.$disconnect();
    }
    );