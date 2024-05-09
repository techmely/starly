import 'package:dartz/dartz.dart';

class Failure<L, R> extends Either<L, R> {
  final L _l;
  const Failure(this._l);
  L get value => _l;
  @override
  B fold<B>(B ifLeft(L l), B ifRight(R r)) => ifLeft(_l);
  @override
  bool operator ==(other) => other is Failure && other._l == _l;
  @override
  int get hashCode => _l.hashCode;
}

class OKE<L, R> extends Either<L, R> {
  final R _r;
  const OKE(this._r);
  R get value => _r;
  @override
  B fold<B>(B ifLeft(L l), B ifRight(R r)) => ifRight(_r);
  @override
  bool operator ==(other) => other is OKE && other._r == _r;
  @override
  int get hashCode => _r.hashCode;
}

Either<L, R> OK<L, R>(R r) => new OKE(r);
Either<L, R> failure<L, R>(L l) => new Failure(l);
