import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from 'uuid';

/*

THIS IS FOR REFERENCE

import { v4 } from 'uuid';

export abstract class BaseEntity {

  @PrimaryKey()
  uuid: string = v4();

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

}
*/

// Tables are created from migrations based on how the schema is described for each entity --> here we type cast 
// the title and updatedAt date to 'text' and 'timestamp' respectively


@Entity()
export class Post {

  @Property({type: 'text'})
  title!: string;

  @PrimaryKey()
  uuid: string = v4();

  @Property()
  createdAt: Date = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();


//   @ManyToOne(() => Author)
//   author!: Author;

//   @ManyToOne(() => Publisher, { wrappedReference: true, nullable: true })
//   publisher?: IdentifiedReference<Publisher>;

//   @ManyToMany({ entity: 'BookTag', fixedOrder: true })
//   tags = new Collection<BookTag>(this);

}