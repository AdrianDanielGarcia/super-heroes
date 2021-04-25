import { Observable } from 'rxjs/internal/Observable';

export const deepEqual = (object1: any, object2: any) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

const isObject = (object) => {
  return object != null && typeof object === 'object';
}

export const distinctUntilDeepChanged = <T>() => (source: Observable<T>) =>
  new Observable<T>(subscriber => {
    let acc: T;

    source.subscribe({
      next: value => {
        if (!acc || !deepEqual(acc, value)) {
          acc = value;
          subscriber.next(acc);
        }
      },
      complete: () => subscriber.complete(),
      error: error => subscriber.error(error)
    });
  });
