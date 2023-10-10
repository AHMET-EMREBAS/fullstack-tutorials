# Configure App and Library Folders (nx.json)

After you generate backend and frontend applications, they will be generated in the root folder.
We want to generate apps under apps folder and libraries under libs folder

## Configure Apps and Libraries folder.

- 1.1 Open `nx.json` file.
- 1.2 Then add the following properties in it.

```
"workspaceLayout": {
    "projectNameAndRootFormat": "derived",
    "appsDir": "apps",
    "libsDir": "libs",
}
```

- 1.3 Then generate new backend and frontend application using the following commands.

  ```
  npx nx g @nx/angular:app client

  npx nx g @nx/nest:app api

  npx nx g @nx/nest:lib core --publishable --importPath=@techbir/core

  npx nx g @nx/angular:lib material --publishable --importPaht=@techbir/material

  npx nx g @nx/js:lib utils --publishable --importPath=@techbir/utils

  npx nx g @nx/js:lib common --publishable --importPath=@techbir/common

  ```

- 1.4 Verify the application are generated under defined folders in `nx.json`.

- 1.5 The project structure should look like this

  - apps
    - client
    - api
  - libs
    - core
    - common
    - material

- 1.6 Then run the applications

  ```
  npx nx serve client

  npx nx serve api
  ```
