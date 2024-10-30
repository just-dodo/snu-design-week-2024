const fs = require("fs");
const Papa = require("papaparse");

function getPeopleData() {
  const filePath = "./people.csv";
  const file = fs.readFileSync(filePath, "utf8");

  Papa.parse(file, {
    header: true,
    complete: (results: any) => {
      console.log("🚀 ~ Papa.parse ~ results:", results.data);

      const data = results.data.map((person: any) => {
        const workIds = person.works
          .split(",")
          .map((link: string) => link.split("-")[1].split("?")[0]);
        const classes = person.classes.split(",");

        const works = workIds.map((id: string, index: number) => {
          return {
            id,
            class: classes[index],
          };
        });

        return {
          name: person.name,
          englishName: person.englishName,
          type: person.type,
          works,
        };
      });
      console.log("🚀 ~ getPeopleData ~ data:", JSON.stringify(data, null, 2));

      // save data to people.json
      fs.writeFileSync("./people.json", JSON.stringify(data, null, 2));
      const path = "../client/pages/people/_components/people.json";
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
    },
  });
}

getPeopleData();
