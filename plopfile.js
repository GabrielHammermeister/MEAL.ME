export default function (plop) {
  plop.setGenerator("page", {
    description: "application page setup",
    prompts: [
      {
        type: "input",
        name: "name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/{{pascalCase name}}Page.index.tsx",
        templateFile: "plop-templates/pages/page.index.hbs",
      },
    ],
  });
}
