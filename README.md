# Current deployed version

[Link](https://devs-team-5.github.io/phone-catalog-frontend/)

# Workflow

For adding new feature

1. be sure that you are in `main` branch localy. If not - `git switch main`
2. update repo `git pull origin main`
3. create your personal branch `git checkout -b {branch_name}`
   ex: `git checkout -b feat/PC-2-api-fetch`
4. implement your task
5. run `git add .`
6. run `git commit -m "{commit_name}"`
   ex: `git commit -m "feat(PC-2): implement api fetch"`
7. run `git pull origin main`
8. run `git push origin {branch_name}`

9. go to GitHub repo
10. Find tab `Pull requests` and press `New pull request`.

11. choose branches:

- base: main.
- compare: `{branch_name}` ex: `feat/PC-2-api-fetch`
- Give a name to PR ex: `feat(PC-2): implement api fetch`

6. add description :

- Що зроблено?
- Чи є залежності від інших PR?
- Чи потрібні додаткові перевірки?
- Чи є щось, на що варто звернути увагу при код-рев’ю?

7. Add reviewers(or just Dimononon).

8. Press "Create pull request".
