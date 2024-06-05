import fs from "fs";

export const storeData = (data: any, path: string) => {
  try {
    // check if the file exists
    if (fs.existsSync(path)) {
      // read the file and parse the data
      const file = fs.readFileSync(path, "utf8");
      const currentData = JSON.parse(file);
      currentData.push(data);
      // merge the data
      data = currentData;
    }
    // write the data to the file
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

export const retrieveData = (path: string) => {
  try {
    // check if the file exists
    if (fs.existsSync(path)) {
      // read the file and parse the data
      const file = fs.readFileSync(path, "utf8");
      return JSON.parse(file);
    }
  } catch (err) {
    console.error(err);
  }
  return {};
};
