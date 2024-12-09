const fs = require("fs");
const Papa = require("papaparse");

function getPeopleData() {
  const filePath = "./people.csv";
  const file = fs.readFileSync(filePath, "utf8");

  Papa.parse(file, {
    header: true,
    complete: (results: any) => {
      const data = results.data?.map((person: any) => {
        if (!person.works) return;
        try {
          const workList = person.works.split(",");
          const workIds = workList.map(
            (link: string) => link.split("-").reverse()[0]?.split("/").reverse()[0]?.split("?")[0]
          );
          
          const classes = person.classes?.split(",");

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
        } catch (e) {
          console.log("🚀 ~ getPeopleData ~ e", e);
          console.log(person);
        }
      });
      // console.log("🚀 ~ getPeopleData ~ data:", JSON.stringify(data, null, 2));

      // save data to people.json
      fs.writeFileSync("./people.json", JSON.stringify(data, null, 2));
      const path = "../client/pages/people/_components/people.json";
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
    },
  });
}

getPeopleData();
