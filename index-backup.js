const express = require("express");
const app = express();
app.use(express.json()); //This will enable express to read incoming json data
const port = 3041;

//Reqest handler
//app.httpMethod(url,callback)

const customers = [
  { id: 1, name: "jhon" },
  { id: 2, name: "Bourne" },
];

app.get("/", (req, res) => {
  res.send("welcome to the website");
});
//Read
app.get("/customers", (req, res) => {
  res.json(customers);
});

app.get("/customers/:id", (req, res) => {
  const id1 = req.params.id;
  console.log(id1);
  const customerss = customers.find((cust) => cust.id == id1);

  console.log("customers", customerss);
  if (customerss) {
    res.json(customerss);
  } else {
    res.json({});
    //   let arr = [];
    //   //   }
    //   for (i = 0; i < customers.length; i++) {
    //     if (customers[i].id == id1) {
    //       console.log("ids", id1);
    //       arr.push(customers[i].id, customers[i].name);
    //     }
    //     // } else if (customers[i].id !== id1) {
    //     //   arr = [];
    //     //   arr.push(customers[i].id, customers[i].name);
    //     // }
    //   }
    //   if (arr.length !== 0) {
    //     res.json(arr);
    //   } else if (arr.length === 0) {
    //     res.json({});
    //   }
  }
  // Create
});
app.post("/customers", (req, res) => {
  const body = req.body;
  res.json(body);
});
// Update
app.put("/customers/:id", (req, res) => {
  const id = req.params.id;
  res.send(`put req sent to server to update ${id}`);
});
// Delete
app.delete("/customers/:id", (req, res) => {
  const id = req.params.id;
  res.send(`delete req sent to server to delete  ${id}`);
});

app.listen(port, () => {
  console.log("server is running on port");
});
