const express = require("express");
const mongoose = require("mongoose");
const app = express();
//configuration - enable express to parse incoming incoming json data
app.use(express.json()); //built in middleware

const port = 3055;

app.use((req, res, next) => {
  console.log(`${req.method}-${req.url}-${req.method} ${new Date()}`);
  next();
}); //application level middleware

//Establish a connection to database
mongoose
  .connect("mongodb://localhost:27017/dec2021")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error connecting to db", err);
  });

//Create a task schema

const Schema = mongoose.Schema;

const taskSchema = new Schema([
  {
    title: {
      type: String,
      required: [true],
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
]);

const Task = mongoose.model("task", taskSchema);

app.get("/", (req, res) => {
  res.end("welcome to the website");
});

app.get("/api/error", (req, res) => {
  throw new Error("not authorized");
});

app.get("/api/tasks", (req, res) => {
  //  express job
  Task.find() //mongoose job
    .then((tasks) => {
      res.json(tasks); //express job
    })
    .catch((err) => {
      {
        res.json(err);
      }
    });
});

app.post("/api/tasks", (req, res) => {
  const body = req.body;
  const task = new Task(body);
  console.log(`${req.method} ${req.url} ${req.ips}`);
  task
    .save()
    //it will take the object inserted to the data-base
    .then((task) => {
      res.json(task);
      console.log("post-req", task);
    })
    .catch((err) => {
      res.json(err);
    });
});
//find by id
app.get("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  Task.findById(id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});
//to update the record
app.put("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Task.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Error handling middlewares
app.use((err, req, res, next) => {
  console.log("not authorized ");
  res.send(err.message);
});

app.listen(port, () => {
  console.log("server is runnig on port", port);
});
