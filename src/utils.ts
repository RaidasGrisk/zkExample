import { Field, SelfProof, Provable, verify } from 'o1js';
import { MyProgram } from './zkProgram.js';
import fs from 'fs';

// type sanity checks
console.log(MyProgram);
MyProgram.publicOutputType satisfies Provable<void>;

console.log('program digest', MyProgram.digest());

console.log('compiling MyProgram...');
let { verificationKey } = await MyProgram.compile();
console.log('verification key', verificationKey);

console.log('proving base case...');
let proof = await MyProgram.checkAnswer(Field(36));
console.log(proof.toJSON())

console.log('verify...');
let ok = await verify(proof.toJSON(), verificationKey);
console.log('ok?', ok);

// write to files
fs.writeFile('verificationKey.json', JSON.stringify({'verificationKey': verificationKey}), (error: any) => {
  if (error) {
    console.error(error);
    throw error;
  }
  console.log('done');
});

fs.writeFile('proof.json', JSON.stringify(proof.toJSON()), (error: any) => {
  if (error) {
    console.error(error);
    throw error;
  }
  console.log('done');
});
