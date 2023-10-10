# Install required packages

1. Install Packages

- 1.1 Type `./install.sh` in your command line and press enter.
- 1.2 Then verify installed packages from package.json and install.sh

2. After Installation | Frontend

- 2.1 Type `npx g @nx/angular:app app-name` in your commandline, and press enter
- 2.2 Have a look at the generated code

3. After Installation | Backend

- 3.1 Type `npx g @nx/nest:app app-name` in your commandline, and press enter
- 3.2 Have a look at the generated code

4. After generation | Run

   - 4.1 Type `npx nx serve angular-app-name` in your commandline, and press enter
   - 4.2 Type `npx nx serve nestjs-app-name` in your commandline, and press enter
   - 4.3 Open your browser and visit `localhost:4200` and `localhost:3000/api`
   - 4.4 Update some code in backend and frontend and observe the changes
   - 4.5 After observation, type `git add .` in your commandline and press enter
   - 4.6 Then, type `git commit -m'Observation complete'` in your commandline and press enter
   - 4.7 Then, type `git checkout main` and press enter.

5. Q & A | Any problem so far
   - 5.1 if you could not run the apps, please drop me a message at `info@aemrebas.com`
