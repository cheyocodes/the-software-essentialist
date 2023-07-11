# Code-First

> This is where you'll write your code-first implementation of the User Story from DDDForum. You can [see the assignment page for more details](https://www.essentialist.dev/products/the-software-essentialist/categories/2153149734/posts/2168948146).


# Database Structure 
#### users 
- id (auto incremented)
- email (unique)
- username (unique)
- firstName
- lastName
- password (this should be assigned at random)
- *All fields are required*

### Run Docker Compose Locally 
```sh
docker compose up 
```

### Create database using prisma schema 
```
npx prisma migrate dev
```

### Open Prisma Studio 
```
npx prisma studio
```

