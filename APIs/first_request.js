const request = require("request");

request(
  "https://jsonplaceholder.typicode.com/users/4", //this is the callback function could use a promise
  (err, resp, body) => {
    if (err) {
      console.log("Something went wrong");

      console.error("error:", err);
    } else {
      // Print the error if one occurred
      console.log("statusCode:", resp && resp.statusCode); // Print the response status code if a response was receivedData

      const parsedData = JSON.parse(body);
      console.log(`${parsedData["name"]} lives in ${parsedData.address.city}`);
    }
  }
);
