// export class TMapper implements Mapper<TEntity, TModel> {
//   toPersistence(entity: TEntity): TModel {
//     const clone = entity.getProps();
//     const record: TModel = {
//       id: clone.id.toString(),
//       createdAt: clone.createdAt,
//       updatedAt: clone.updatedAt,
//     };
//     return parse(TSchema, record);
//   }
//   toDomain(record: TModel): TEntity {
//     const entity = new TEntity({
//       id: new UniqueEntityID(record.id),
//       createdAt: record.createdAt,
//       updatedAt: record.createdAt,
//       props: {},
//     });
//     return entity;
//   }
//   toResponse() {}
// }
