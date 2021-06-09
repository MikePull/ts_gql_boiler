// add links to documentation references

// (Description of adding dependencies for scripts ran w/ [ npm ] and [ yarn ] needed to automate a development, testing and live environments using Typescript)

// Basic node server file w/ Typescript syntax using the [ ts-node ] dependency 
// and using the 'tsconfig.json' file upon compile time for Typescript preferences that can be made from scratch or
// generated using the [ npx ] library tsconfig.json [ npx tsconfig.json ]

// Make sure [ ts-node < server source file name > ] is added to the package.json file as a script to start the server w/ 
// 'ts-node' assigned as the [ npm start ] script (ts-node is however slow to run in production, which is having a build step using nodemon and tsc is better)

// Relatively the yarn watch command runs a build command under the hood continously to compile
// the chosen typescript main server file into a (minified)javascript file and spits this file out into the same folder under a '/dist' sub-folder
// using the [ tsc -w ] command (typescript w/ watch flag) which is usually assigned as a labeled npm script command in the 'package.json' file
// --> Make sure to keep the 'index' in a 'src' folder from root for the 'ts-node' compiler to find upon running the watch command

// [ nodemon ] is a dependency used as tool that watches changes as well and starts the server after each build process.
// [ nodemon --exec ts-node <path to src file> ] will watch uncompiled typescript files; see [ nodemon --help ] for more


// TLDR: [ yarn start ] : [ ts-node src/index.ts ] will compile typecsript and run node
//       [ yarn dev ]   : [ nodemon --exec ts-node src/index.ts ] does the same thing but watches the file for changes

//////////////////////////////////////////////
// Quick referesher of ORMs for in general 

// ORMs or "Object Relation Mapping" packages provide common functions and interfaces to for a 
// 'virtual object database' which allows for queries to be applied to database connections 
// (usually through a 'context' or an enitity manager object). 

// In this boilerplate I'm using MikroORM 

// MikroORMs "cli", "core" and "migrations" packages should be bundled or available upon installation
// separately for your respective ORM, in this case MikroORM is being used w/ a PostgresQL Client 
// (make sure path to mikr-orm config is in the "package.json" file)
// https://mikro-orm.io/docs/installation

/*
    Postgresql can be installed on your respective OS; on MacOs using homebrew: [ brew install postgresql && brew serices start postgresql ]
    both [ psql ] and other general database commands become subsequently available after. 

    [ createdb < database name >] then check to see if it is made using the list command: 
    [ psql -l ] There you should see the user to use for connecting to the database if not already set
    see [ psql --help ] to see more options

    The migration command can be used to create the tables to persist to initially and can be deleted in case the 
    schemas for any entity changes in development. 

    A migration is automatically created tables from generated raw SQL commands which uses the schemas specified using 
    an ORM of choice. 
    https://mikro-orm.io/docs/migrations/

    [ npx mikro-orm migration:create ] to run a migration based on your "entities" by each column: { "name" <property> <type> <nullable> }
    Instead of using the CLI to run a migration you can use the API given by MikroORM to run it in the code before persist and flush:
    
    instance.getMigrator().up()

 */

import { MikroORM } from '@mikro-orm/core';
import{ Post } from "./entities/Post"
import initConfig from "./mikro-orm.config"

const main = async () => {
    console.log("initializing MikroORM...") // Returns a Promise so needs to be wrapped in a async/await closure
    
    const orm = await MikroORM.init(initConfig);
    // Connecting to database via config

    // Creating tables from running migrations which automatically generates SQL
     await orm.getMigrator().up();

    //  console.log(initConfig.migrations)
    // https://mikro-orm.io/docs/entity-schema/
    const post = orm.em.create(Post, {title: 'This is the first Post'})
    //const post2 = orm.em.create(Post, {title: 'This is the second Post'})

    await orm.em.persistAndFlush(post)
   // await orm.em.persistAndFlush(post2)
    console.log("-----------------sql 2---------------------");
    // await orm.em.nativeInsert(Post, {title: "first post 2 "})
    const posts = await orm.em.find(Post, {})
    console.log(posts)
};

main().catch((err) => {
    console.error(err)
})
