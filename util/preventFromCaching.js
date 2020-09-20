module.exports = (res) => {
  // Display the fresh file everytime back button has been press
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
};
