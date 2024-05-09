import 'package:dartz/dartz.dart';

class Fail<L, R> extends Either<L, R> {
  final L _l;
  const Fail(this._l);
  L get value => _l;
  @override
  B fold<B>(B ifLeft(L l), B ifRight(R r)) => ifLeft(_l);
  @override
  bool operator ==(other) => other is Fail && other._l == _l;
  @override
  int get hashCode => _l.hashCode;
}

class OK<L, R> extends Either<L, R> {
  final R _r;
  const OK(this._r);
  R get value => _r;
  @override
  B fold<B>(B ifLeft(L l), B ifRight(R r)) => ifRight(_r);
  @override
  bool operator ==(other) => other is OK && other._r == _r;
  @override
  int get hashCode => _r.hashCode;
}

Either<L, R> passCase<L, R>(R r) => new OK(r);
Either<L, R> failCase<L, R>(L l) => new Fail(l);
