import IsmStack from "./IsmStack";
import IsmApiStack from './IsmApiStack';

export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x"
  });

  const ismStack = new IsmStack(app, "ism-stack");

  new IsmApiStack(app, 'ism-api', {
    table: ismStack.ismTable
  });

  // Add more stacks
}
