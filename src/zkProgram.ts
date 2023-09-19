import { Field, method, Experimental } from 'o1js';

let MyProgram = Experimental.ZkProgram({
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

export { MyProgram };
