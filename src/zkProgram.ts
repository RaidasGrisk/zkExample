import { Field, method, Experimental, verify } from 'o1js';

const MyProgram = Experimental.ZkProgram({
  methods: {
    // check if the answer satisfies: (2+7)*4
    checkAnswer: {
      privateInputs: [Field],
      method(answer: Field) {
        answer.assertEquals(Field(2).add(Field(7)).mul(4))
      },
    },
  },
});

// compile the program
const { verificationKey } = await MyProgram.compile();

// produce proof (run this on the client side and share proof only)
const answer = Field(36);
const proof = await MyProgram.checkAnswer(answer);

// verify proof
const proofValid = await verify(proof.toJSON(), verificationKey);

console.log(
  `verification key: ${verificationKey} \n\n`,
  `proof: ${JSON.stringify(proof.toJSON())} \n\n`,
  `verified successfully: ${proofValid}`
);

export { MyProgram };
