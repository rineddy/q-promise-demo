import Q from "q";

export enum UsedPromise {
   Default = 1,
   AsQ = 2,
   Q = 3
}

function start(y: number): Promise<number> {
   return Promise.resolve(y);
}

function startQ(y: number): Q.Promise<number> {
   return Q.resolve(y);
}

Q.all([
   Q.when(console.log('%c Promise.Default ', 'background: #222; color: #bada55; padding:5px;')),
   Q.when().delay(100).then(_ => test(5, 'o:')),
   Q.when().delay(200).then(_ => test(6, '-:')),
   Q.when().delay(300).then(_ => test(7, '+:'))
])
   .delay(300).then(_ => Q.all([
      Q.when(console.log('%c Promise.AsQ ', 'background: #222; color: #bada55; padding:5px;')),
      Q.when().delay(100).then(_ => test(5, 'o:', UsedPromise.AsQ)),
      Q.when().delay(200).then(_ => test(6, '-:', UsedPromise.AsQ)),
      Q.when().delay(300).then(_ => test(7, '+:', UsedPromise.AsQ))
   ]))
   .delay(300).then(_ => Q.all([
      Q.when(console.log('%c Promise.Q ', 'background: #222; color: #bada55; padding:5px;')),
      Q.when().delay(100).then(_ => test(5, 'o:', UsedPromise.Q)),
      Q.when().delay(200).then(_ => test(6, '-:', UsedPromise.Q)),
      Q.when().delay(300).then(_ => test(7, '+:', UsedPromise.Q))
   ]));

//Q.all([start(7), Q(start(7)).delay(1000), startQ(7).delay(2000)]).then((promiseResults: any) => console.log(promiseResults))

export function test(a: number, prefix: string, withPromise: UsedPromise = UsedPromise.Default) {
   switch (withPromise) {
      case UsedPromise.Q:
         startQ(a)
            .then(x => ++x)
            .then(x => {
               console.log(`${prefix} ${x}`);
               if (x == 6) { throw Error(`err: ${x}`); }
               if (x == 7) { Q.reject(`reject: ${x}`); }
               return Q.resolve(x);
            })
            .then(x => console.info(`${prefix} => result: ${x}\n`))
            .fail((e: Error) => console.error(`${prefix} => catch: ${e.message || e}`));
         break;
      case UsedPromise.AsQ:
         Q(start(a))
            .then(x => ++x)
            .then(x => {
               console.log(`${prefix} ${x}`);
               if (x == 6) { throw Error(`err: ${x}`); }
               if (x == 7) { Q.reject(`reject: ${x}`); }
               return Q.resolve(x);
            })
            .then(x => console.info(`${prefix} => result: ${x}\n`))
            .fail((e: Error) => console.error(`${prefix} => catch: ${e.message || e}`));
         break;
      default:
         start(a)
            .then(x => ++x)
            .then(x => {
               console.log(`${prefix} ${x}`);
               if (x == 6) { throw Error(`err: ${x}`); }
               if (x == 7) { return Promise.reject(`reject: ${x}`); }
               return Promise.resolve(x);
            })
            .then(x => console.info(`${prefix} => result: ${x}\n`))
            .catch((e: Error) => console.error(`${prefix} => catch: ${e.message || e}`));
         break;
   }
}



//});
/**/


