# typgraphql-prisma

## Tasks: Queries and Mutations

``` JSON
query {
  getTasks(ownerId: 7) {
    id
    title
    status
  }
}

query {
  getCompleteTasks(ownerId: 7) {
    title
    status
  }
}

query {
  getIncompleteTasks(ownerId: 7) {
    title
    status
  }
}

mutation {
  createTask(data: { title: "Task 3" ownerId: 7 }) {
    title
  }
}


mutation {
  toggleTaskStatus(data: { id: 7 ownerId: 7}) {
    title
    status
  }
}
```

## Users: Queries and Mutations

``` JSON
query {
  getUsers {
    id
    name
    email
    tasks {
      title
    }
  }
}

query {
  getOneUser(id: 7) {
    name
  }
}

mutation {
  createUser(data: { email: "test433@test.com" password: "Asdf123!" name: "Andrew Brower" }) {
    email
    name
  }
}

mutation {
  deleteUser(email: "test43@test.com") {
    email
  }
}
```
