import 'package:hive/hive.dart';

import '../../../../features/authentication/domain/use-cases/auth_value_objects.dart';
import '../domain/entities/account.dart';

@HiveType(typeId: 0)
class AccountEntity extends HiveObject {
  @HiveField(0)
  final String id;
  @HiveField(1)
  final String email;
  @HiveField(2)
  final String username;
  @HiveField(3)
  final String image;

  AccountEntity(this.id, this.email, this.username, this.image);

  Account toDomain() {
    return Account(
      id: id,
      username: Username(username),
      email: EmailAddress(email),
      image: image,
    );
  }

  factory AccountEntity.fromDomain(Account account) {
    return AccountEntity(
      account.id,
      account.email.getOrCrash(),
      account.username.getOrCrash(),
      account.image,
    );
  }
}
