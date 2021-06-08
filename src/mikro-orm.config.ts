import { Post } from "./entities/Post"
import { MikroORM } from "@mikro-orm/core";
import path from "path"

export default {
    // https://mikro-orm.io/docs/migrations/   (all other options for migrations within the mikro orm config for init are default)
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    
    entities: [Post],
    dbName: 'rank_dem',
    type: 'postgresql',
    debug: process.env.NODE_ENV !== 'production',
    user: 'mastersimulator',
   // password: ''
} as Parameters<typeof MikroORM.init>[0]