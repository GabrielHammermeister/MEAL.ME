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
  plop.setGenerator("component", {
    description: "component generation",
    prompts: [
      {
        type: "input",
        name: "name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.index.tsx",
        templateFile: "plop-templates/components/component.index.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.styles.css",
        templateFile: "plop-templates/components/component.styles.hbs",
      },
    ],
  });
}
