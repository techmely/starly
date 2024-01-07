// export class Entity extends AggregateRoot<T> {
//   static create(createProps: CreateTProps) {
//     const id = new UniqueEntityID();
//     const x = new Entity({ id, props });
//     x.addEvent(
//       new XCreatedDomainEvent({
//         aggregateId: id,
//         ...props,
//       }),
//     );
//     return x;
//   }

//   validate(): void {
//     throw new Error("Method not implemented.");
//   }
// }
