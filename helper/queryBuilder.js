function updateDynamic(table, cols, where) {
  // Setup static beginning of query
  var query = ["UPDATE"];
  query.push(table);
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push("WHERE " + where[0] + " = " + where[1]);

  // Return a complete query string
  return query.join(" ");
}

function updateDynamicQueryWithValue(table, cols, where) {
  // Setup static beginning of query
  var query = ["UPDATE"];
  query.push(table);
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];

  for (const key of Object.keys(cols)) {
    console.log(key, cols[key]);
    set.push(key + "='" + cols[key] + "'");
  }
  //   cols.forEach(function (col, i) {
  //     set.push(key + " = ($" + (i + 1) + ")");
  //   });
  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push("WHERE " + where[0] + " = " + where[1]);

  // Return a complete query string
  return query.join(" ");
}

module.exports = { updateDynamic, updateDynamicQueryWithValue };
